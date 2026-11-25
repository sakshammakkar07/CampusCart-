// CampusCart — secure Groq proxy (Supabase Edge Function, Deno runtime)
//
// The browser sends chat messages here; THIS function adds the secret GROQ_API_KEY (an environment
// variable that never leaves the server), calls Groq, and returns the model's reply.
// The frontend runs the actual listing search (search_listings tool) against the CampusCart data.
//
// Secrets / env (set with `supabase secrets set`, never in code):
//   GROQ_API_KEY      required   your Groq key
//   GROQ_MODEL        optional   default: llama-3.3-70b-versatile
//   ALLOWED_ORIGINS   optional   comma-separated site origins allowed by CORS, e.g. https://campuscart.vercel.app
//                                (default "*" for quick testing — restrict it before sharing the site)

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MAX_BODY_BYTES = 40_000;
const MAX_MESSAGES = 24;
const MAX_CONTENT_CHARS = 6_000;
const RATE_LIMIT = 20;          // requests per IP per minute (best-effort, per function instance)

// The system prompt and tool definition live on the SERVER so a caller cannot change the AI's rules
// or inject arbitrary tools through the API.
const SYSTEM_PROMPT = `You are CampusCart Assistant inside a college student marketplace (prices in INR ₹).
RULES:
1. For ANY request to find, recommend or check products, prices, availability, rentals or exchanges you MUST call search_listings first. It is your only source of listing data.
2. Convert the user's words into a short keyword query (e.g. "data structures"). Pass max_price for budgets, category when clear, and mode when they want to buy ("sell"), "rent" or "exchange". For broad budget requests search each need separately and add totals only from returned prices.
3. NEVER invent listings, prices, sellers or availability. Mention only returned items, with exactly the returned prices.
4. Write each recommended listing's id as [[id]] right after its name; the app turns these into cards.
5. If nothing matches, say so honestly and suggest alternatives (higher budget, broader keywords, another category, Rentals).
6. Buy = send a request at the listed price and pay the seller in person; Rent = choose weeks, price is per week; Exchange = describe your item to swap. There are no online payments.
7. Pages: Home, Explore Marketplace, Sell an Item, Rentals, AI Assistant, Wishlist, My Dashboard.
8. Be concise and friendly. No markdown headings.`;

const TOOLS = [{
  type: "function",
  function: {
    name: "search_listings",
    description: "Search the real CampusCart marketplace for active listings.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: 'keywords, e.g. "calculator" or "data structures"; may be empty' },
        category: { type: "string", enum: ["books", "electronics", "calculators", "hostel", "stationery", "cycles", "fashion", "sports"] },
        max_price: { type: "number" },
        min_price: { type: "number" },
        mode: { type: "string", enum: ["sell", "rent", "exchange"] },
        limit: { type: "number" },
      },
    },
  },
}];

type Env = (k: string) => string | undefined;
const hits = new Map<string, number[]>();

function cors(origin: string | null, env: Env) {
  const allowed = (env("ALLOWED_ORIGINS") ?? "*").split(",").map((s) => s.trim()).filter(Boolean);
  const ok = allowed.includes("*") || (origin !== null && allowed.includes(origin));
  return {
    "Access-Control-Allow-Origin": allowed.includes("*") ? "*" : ok ? origin! : allowed[0] ?? "",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}
const json = (o: unknown, status: number, h: Record<string, string>) =>
  new Response(JSON.stringify(o), { status, headers: { ...h, "Content-Type": "application/json" } });

function limited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > RATE_LIMIT;
}

function clean(messages: unknown): { role: string; content: string; tool_call_id?: string; tool_calls?: unknown }[] | null {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return null;
  const out = [];
  for (const m of messages) {
    if (!m || typeof m !== "object") return null;
    const role = (m as any).role;
    if (!["user", "assistant", "tool"].includes(role)) return null;   // callers can NOT send "system"
    const content = String((m as any).content ?? "").slice(0, MAX_CONTENT_CHARS);
    const item: any = { role, content };
    if (role === "tool") {
      if (typeof (m as any).tool_call_id !== "string") return null;
      item.tool_call_id = (m as any).tool_call_id.slice(0, 80);
    }
    if (role === "assistant" && Array.isArray((m as any).tool_calls)) {
      item.tool_calls = (m as any).tool_calls.slice(0, 4).map((t: any) => ({
        id: String(t?.id ?? "").slice(0, 80), type: "function",
        function: { name: String(t?.function?.name ?? "").slice(0, 40), arguments: String(t?.function?.arguments ?? "{}").slice(0, 2000) },
      }));
    }
    out.push(item);
  }
  if (out[0].role !== "user") return null;
  return out;
}

export async function handler(req: Request, env: Env, fetchFn: typeof fetch = fetch): Promise<Response> {
  const h = cors(req.headers.get("origin"), env);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405, h);

  const key = env("GROQ_API_KEY");
  if (!key) return json({ error: "not_configured", message: "GROQ_API_KEY is not set on the server." }, 503, h);

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return json({ error: "rate_limited", message: "Too many requests. Please wait a minute." }, 429, h);

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: "too_large" }, 413, h);
  let body: any;
  try { body = JSON.parse(raw); } catch { return json({ error: "bad_json" }, 400, h); }
  const messages = clean(body?.messages);
  if (!messages) return json({ error: "bad_messages", message: "messages must start with a user turn." }, 400, h);
  const context = typeof body?.context === "string" ? body.context.slice(0, 500) : "";

  let upstream: Response;
  try {
    upstream = await fetchFn(GROQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: env("GROQ_MODEL") ?? "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: SYSTEM_PROMPT + (context ? `\n${context}` : "") }, ...messages],
        tools: TOOLS,
        tool_choice: "auto",
        temperature: 0.2,
        max_tokens: 700,
      }),
    });
  } catch {
    return json({ error: "upstream_unreachable", message: "Could not reach Groq." }, 502, h);
  }

  if (!upstream.ok) {
    // Never forward Groq's raw error body (could echo request details); map to safe codes.
    const code = upstream.status === 429 ? "rate_limited" : upstream.status === 401 || upstream.status === 403 ? "bad_api_key" : "upstream_error";
    console.error("Groq error status", upstream.status);
    return json({ error: code, message: code === "bad_api_key" ? "The server's Groq key was rejected." : "The AI service returned an error." }, upstream.status === 429 ? 429 : 502, h);
  }
  const data = await upstream.json();
  const msg = data?.choices?.[0]?.message;
  if (!msg) return json({ error: "empty_response" }, 502, h);
  return json({ message: { role: "assistant", content: msg.content ?? "", tool_calls: msg.tool_calls ?? undefined } }, 200, h);
}

// Deno / Supabase entrypoint (skipped when imported by tests)
const D = (globalThis as any).Deno;
if (D?.serve) D.serve((req: Request) => handler(req, (k) => D.env.get(k)));
