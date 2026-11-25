# CampusCart × Groq — backend setup guide

## What this is
`supabase/functions/groq-chat/index.ts` is a small server-side function (Supabase Edge Function).
The browser never sees your Groq key: it sends the chat to this function, the function adds
`GROQ_API_KEY` from a server-side secret, calls Groq, and returns the reply. The CampusCart page runs the
actual listing search itself (a "search_listings" tool), so the AI only recommends items that really exist.

## Honest status
| Item | Status |
|---|---|
| Edge Function code | Written, 17 unit tests pass (validation, CORS, rate limit, error mapping, key never returned) using a mocked Groq |
| Real call to Groq | **NOT tested** — my sandbox cannot reach api.groq.com. Test it yourself with step 4 below |
| Deployed to your Supabase | **Not done** — I have no access to your account. Steps 1–3 below |
| Frontend client (tool loop, errors, fallbacks) | Built and tested against a mock backend |
| Works inside the Claude artifact | **No** — see "Important limitation" |

## Important limitation
A page published as a Claude artifact is not allowed to call other servers (browser security policy), so the
published artifact cannot reach this function. It keeps using its built-in AI. To use Groq the site must be
hosted as a normal website (Vercel / Netlify / GitHub Pages / Supabase Storage), and because the artifact stores
data in the artifact database and logs users in through Claude, a hosted copy also needs its own database and
login (Supabase tables + Supabase Auth). That migration is a separate job.

## Steps

### 0. Rotate your key
The key you pasted in chat is exposed. In the Groq console delete it and create a new one. Use only the new one below.

### 1. Install and link
```bash
npm i -g supabase          # or: npx supabase ...
supabase login
cd backend                 # the folder containing supabase/functions/groq-chat
supabase link --project-ref YOUR_PROJECT_REF     # Project Settings → General → Reference ID
```

### 2. Add the secret (environment variable)
```bash
supabase secrets set GROQ_API_KEY=gsk_YOUR_NEW_KEY
supabase secrets set ALLOWED_ORIGINS=https://your-site.example     # your hosted site's origin (no trailing slash)
# optional: supabase secrets set GROQ_MODEL=llama-3.3-70b-versatile
```
Or in the dashboard: Edge Functions → Secrets → add `GROQ_API_KEY`. Never put the key in index.html, git, or a `.env` you commit.

### 3. Deploy
```bash
supabase functions deploy groq-chat
```
Leave JWT verification on (the default): callers must send your project's public anon key.

### 4. Test it (this is the first real Groq test)
```bash
curl -s https://YOUR_PROJECT_REF.supabase.co/functions/v1/groq-chat \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Find me a calculator under 700"}]}'
```
Expected: JSON with `message.tool_calls` containing `search_listings` (the model asking the page to search).
Errors: `not_configured` = secret missing; `bad_api_key` = key rejected; 401 = missing anon key.
Local testing: put `GROQ_API_KEY=...` in `backend/supabase/.env.local` (gitignored), run
`supabase functions serve groq-chat --env-file supabase/.env.local`.

### 5. Connect the frontend
In the hosted copy of `index.html` find:
```js
const AI_CFG={proxyUrl:'',anonKey:''};
```
and set
```js
const AI_CFG={proxyUrl:'https://YOUR_PROJECT_REF.supabase.co/functions/v1/groq-chat',anonKey:'YOUR_SUPABASE_ANON_KEY'};
```
The anon key is public by design. The Groq key must never appear here. The chat header then reads
"Powered by Groq · secure backend". If the backend is down the chat falls back to keyword search and says so.

## Security notes
- System prompt and tool definition live on the server; clients cannot send a `system` message or their own tools.
- Input limits: ≤24 messages, ≤6,000 characters each, ≤40 KB body; best-effort 20 requests/min per IP
  (per function instance — add Supabase/Upstash rate limiting for real traffic).
- Set `ALLOWED_ORIGINS` to your real site before sharing publicly; watch your Groq usage limits.
