/* CampusCart frontend demo. Data and actions are intentionally client-side. */
const AI_CFG = { proxyUrl: "", anonKey: "" };

const categories = [
  { id: "books", name: "Books", icon: "📚" },
  { id: "electronics", name: "Electronics", icon: "🎧" },
  { id: "calculators", name: "Calculators", icon: "🧮" },
  { id: "hostel", name: "Hostel", icon: "🪴" },
  { id: "stationery", name: "Stationery", icon: "✏️" },
  { id: "cycles", name: "Cycles", icon: "🚲" },
  { id: "fashion", name: "Fashion", icon: "🧥" },
  { id: "sports", name: "Sports", icon: "🏸" }
];

const demoListings = [
  { id: "cc101", title: "Engineering Mathematics Vol. 1", category: "books", mode: "sell", price: 280, originalPrice: 540, condition: "Very good", emoji: "📘", seller: "Aarav Mehta", initials: "AM", campus: "North Campus", rating: "4.9", description: "Clean copy with a few helpful notes in the margins. Great for first-year engineering maths; no missing pages." },
  { id: "cc102", title: "Sony WH-CH520 Headphones", category: "electronics", mode: "sell", price: 1850, originalPrice: 3990, condition: "Like new", emoji: "🎧", seller: "Isha Kapoor", initials: "IK", campus: "South Campus", rating: "5.0", description: "Wireless headphones with great battery life. Used for one semester, includes original charging cable." },
  { id: "cc103", title: "Casio FX-991EX Calculator", category: "calculators", mode: "sell", price: 950, originalPrice: 1600, condition: "Very good", emoji: "🧮", seller: "Rohan Das", initials: "RD", campus: "North Campus", rating: "4.8", description: "All functions work perfectly. Ideal for engineering and science courses. Pickup near the library." },
  { id: "cc104", title: "Study desk lamp", category: "hostel", mode: "sell", price: 350, originalPrice: 699, condition: "Good", emoji: "💡", seller: "Diya Nair", initials: "DN", campus: "West Hostel", rating: "4.7", description: "Warm and cool light modes, flexible neck and USB powered. A handy addition to any hostel desk." },
  { id: "cc105", title: "Atomic Habits — James Clear", category: "books", mode: "sell", price: 220, originalPrice: 499, condition: "Good", emoji: "📗", seller: "Kabir Shah", initials: "KS", campus: "North Campus", rating: "4.9", description: "Paperback in good condition. A couple of underlines, otherwise very neat." },
  { id: "cc106", title: "Campus bicycle · 7 speed", category: "cycles", mode: "sell", price: 4200, originalPrice: 8500, condition: "Good", emoji: "🚲", seller: "Mira Sen", initials: "MS", campus: "East Campus", rating: "4.8", description: "Recently serviced hybrid bicycle with working lights and a rear carrier. Test ride welcome." },
  { id: "cc107", title: "IKEA bedside table", category: "hostel", mode: "sell", price: 700, originalPrice: 1299, condition: "Good", emoji: "🪑", seller: "Neel Verma", initials: "NV", campus: "Maple Hostel", rating: "4.6", description: "Compact bedside table, sturdy and easy to assemble. Moving out sale; pickup this week." },
  { id: "cc108", title: "Badminton racquet · Yonex", category: "sports", mode: "sell", price: 800, originalPrice: 1600, condition: "Very good", emoji: "🏸", seller: "Tara Joseph", initials: "TJ", campus: "Sports Complex", rating: "5.0", description: "Lightweight racquet with fresh grip and cover. Perfect for casual and intermediate play." },
  { id: "cc109", title: "Introduction to Algorithms", category: "books", mode: "sell", price: 650, originalPrice: 1200, condition: "Good", emoji: "📕", seller: "Arjun Rao", initials: "AR", campus: "North Campus", rating: "4.8", description: "The classic algorithms textbook, third edition. Some highlighting in the sorting chapter." },
  { id: "cc110", title: "Bluetooth speaker · JBL Go", category: "electronics", mode: "sell", price: 1100, originalPrice: 2499, condition: "Very good", emoji: "🔊", seller: "Ananya Bose", initials: "AB", campus: "South Campus", rating: "4.9", description: "Small, portable and surprisingly loud. Holds charge well and pairs quickly." },
  { id: "cc111", title: "TI-30XS scientific calculator", category: "calculators", mode: "sell", price: 600, originalPrice: 1100, condition: "Good", emoji: "🧮", seller: "Yash Malhotra", initials: "YM", campus: "East Campus", rating: "4.7", description: "MultiView scientific calculator. Fresh battery and protective slide cover included." },
  { id: "cc112", title: "Mini table fan · 3 speed", category: "hostel", mode: "sell", price: 450, originalPrice: 850, condition: "Good", emoji: "🌀", seller: "Sana Khan", initials: "SK", campus: "Cedar Hostel", rating: "4.8", description: "Quiet, compact desk fan with three speeds. Clean and ready for your room." },
  { id: "cc113", title: "Lab coat · size M", category: "fashion", mode: "sell", price: 300, originalPrice: 650, condition: "Very good", emoji: "🥼", seller: "Priya Menon", initials: "PM", campus: "North Campus", rating: "4.9", description: "Freshly washed, hardly used white lab coat. Two pockets and comfortable fit." },
  { id: "cc114", title: "Graph notebooks · pack of 4", category: "stationery", mode: "sell", price: 120, originalPrice: 220, condition: "New", emoji: "📓", seller: "Dev Patel", initials: "DP", campus: "South Campus", rating: "4.7", description: "Four unused graph notebooks, 100 pages each. Bought extra for the semester." },
  { id: "cc115", title: "Cricket kit · pads & gloves", category: "sports", mode: "sell", price: 1600, originalPrice: 3200, condition: "Good", emoji: "🏏", seller: "Vikram Sethi", initials: "VS", campus: "Sports Complex", rating: "4.8", description: "Junior/intermediate kit with pads, gloves and kit bag. Great for hostel practice." },
  { id: "cc116", title: "Denim jacket · size S", category: "fashion", mode: "exchange", price: 0, originalPrice: 0, condition: "Very good", emoji: "🧥", seller: "Leah D'Souza", initials: "LD", campus: "West Campus", rating: "4.9", description: "Classic blue denim jacket, looking to exchange for a size M hoodie or a good book." },
  { id: "cc117", title: "Portable projector · weekend", category: "electronics", mode: "rent", price: 350, originalPrice: 0, condition: "Like new", emoji: "📽️", seller: "Omkar Kulkarni", initials: "OK", campus: "North Campus", rating: "4.9", description: "Compact 1080p projector, HDMI and remote included. ₹350 per day; ideal for movie nights and presentations." },
  { id: "cc118", title: "Electric iron", category: "hostel", mode: "rent", price: 90, originalPrice: 0, condition: "Good", emoji: "👔", seller: "Nidhi Arora", initials: "NA", campus: "Maple Hostel", rating: "4.8", description: "Reliable steam iron with heat settings. Rental is ₹90 per day; collect from Maple Hostel reception." },
  { id: "cc119", title: "Microeconomics · exchange", category: "books", mode: "exchange", price: 0, originalPrice: 0, condition: "Good", emoji: "📙", seller: "Siddharth Jain", initials: "SJ", campus: "South Campus", rating: "4.7", description: "Introductory microeconomics text. Happy to trade for a statistics textbook or another economics title." },
  { id: "cc120", title: "Instant camera · Instax Mini", category: "electronics", mode: "rent", price: 250, originalPrice: 0, condition: "Very good", emoji: "📸", seller: "Aditi Roy", initials: "AR", campus: "East Campus", rating: "5.0", description: "Instax Mini camera available for ₹250 per day. Film is available at cost; return it in its case." },
  { id: "cc121", title: "Guitar · acoustic, 3 days", category: "sports", mode: "rent", price: 180, originalPrice: 0, condition: "Good", emoji: "🎸", seller: "Rehan Ali", initials: "RA", campus: "West Hostel", rating: "4.9", description: "Comfortable acoustic guitar with gig bag and tuner. ₹180 per day, 3-day minimum." },
  { id: "cc122", title: "Chemistry lab goggles · pair", category: "stationery", mode: "sell", price: 90, originalPrice: 180, condition: "New", emoji: "🥽", seller: "Meera Iyer", initials: "MI", campus: "North Campus", rating: "4.8", description: "Brand new sealed lab goggles. Comfortable over glasses and meets standard lab requirements." },
  { id: "cc123", title: "Yoga mat · exchange", category: "sports", mode: "exchange", price: 0, originalPrice: 0, condition: "Good", emoji: "🧘", seller: "Kavya Pillai", initials: "KP", campus: "Cedar Hostel", rating: "4.8", description: "Lightweight non-slip yoga mat, looking to swap for a set of resistance bands or sports gear." },
  { id: "cc124", title: "Laundry basket & hangers", category: "hostel", mode: "sell", price: 180, originalPrice: 380, condition: "Good", emoji: "🧺", seller: "Aditya Ghosh", initials: "AG", campus: "Maple Hostel", rating: "4.7", description: "One sturdy laundry basket plus 8 hangers. Room essentials bundle; pickup from Maple Hostel." }
];

const storage = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem("campuscart-" + key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem("campuscart-" + key, JSON.stringify(value)); } catch (error) { console.warn("Could not save CampusCart demo data.", error); } }
};
let listings = [...demoListings, ...storage.get("addedListings", [])];
let wishlist = storage.get("wishlist", []);
let requests = storage.get("requests", []);
let currentPage = "home";
let activeCategory = "all";
let activeMode = "all";
let searchQuery = "";
let toastTimer;
const chatHistory = [{
  role: "assistant",
  content: "Hi Sam! 👋 What are you looking for today? Give me a category, a budget, or a campus-life problem to solve."
}];

const app = document.getElementById("app");
const modalRoot = document.getElementById("modal-root");
const money = (value) => value === 0 ? "Exchange" : "₹" + Number(value).toLocaleString("en-IN");
const categoryName = (id) => categories.find((category) => category.id === id)?.name || id;
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const findListing = (id) => listings.find((item) => item.id === id);

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function updateWishlistCount() {
  document.getElementById("wishlist-count").textContent = wishlist.length;
}

function changePage(page) {
  currentPage = page;
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.page === page));
  document.querySelector(".main-nav").classList.remove("open");
  renderPage();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cardTemplate(item) {
  const saved = wishlist.includes(item.id);
  const modeLabel = item.mode === "sell" ? "Buy" : item.mode === "rent" ? "Rent" : "Exchange";
  const categoryClass = `image-${item.category}`;
  const priceSuffix = item.mode === "rent" ? "<small> / day</small>" : "";
  return `<article class="product-card">
    <div class="product-image ${categoryClass}" data-action="detail" data-id="${escapeHTML(item.id)}" role="button" tabindex="0" aria-label="View ${escapeHTML(item.title)}">
      <span class="product-emoji" aria-hidden="true">${item.emoji}</span>
      <div class="product-labels"><span class="pill ${item.mode}">${modeLabel}</span>${item.condition === "New" ? '<span class="pill">New</span>' : ""}</div>
      <button class="heart-toggle ${saved ? "saved" : ""}" data-action="wishlist" data-id="${escapeHTML(item.id)}" aria-label="${saved ? "Remove from" : "Add to"} wishlist">${saved ? "♥" : "♡"}</button>
    </div>
    <div class="product-info">
      <div class="product-category">${escapeHTML(categoryName(item.category))} · ${escapeHTML(item.condition)}</div>
      <h3 class="product-title" data-action="detail" data-id="${escapeHTML(item.id)}">${escapeHTML(item.title)}</h3>
      <div class="product-meta"><div class="product-price">${money(item.price)}${priceSuffix}</div><span class="rating">★ ${escapeHTML(item.rating)}</span></div>
      <div class="product-campus">⌖ ${escapeHTML(item.campus)}</div>
      <div class="seller-line"><span class="seller-avatar">${escapeHTML(item.initials)}</span><span>${escapeHTML(item.seller)}</span><span class="rating">★ ${escapeHTML(item.rating)}</span></div>
    </div>
  </article>`;
}

function listingGrid(items, className = "listings-grid") {
  if (!items.length) return `<div class="empty-state"><div class="empty-emoji">🌱</div><h3>No listings just yet</h3><p>Try changing your filters or list something for your campus.</p><button class="button button-outline" data-page="explore">Browse all items</button></div>`;
  return `<div class="${className}">${items.map(cardTemplate).join("")}</div>`;
}

function homePage() {
  const featured = listings.filter((item) => item.mode !== "exchange").slice(0, 4);
  return `<section class="hero"><div class="hero-inner">
    <div class="hero-copy"><span class="eyebrow">The student marketplace</span><h1>Good finds.<br>Great <em>campus</em> energy.</h1><p>Buy, sell, rent or swap the things that make student life better. All from people right here on your campus.</p>
      <div class="hero-buttons"><button class="button button-primary" data-page="explore">Explore marketplace <span>→</span></button><button class="button button-outline" data-page="sell">＋ List an item</button></div>
      <div class="hero-proof"><div class="proof-avatars"><span>A</span><span>I</span><span>R</span><span>M</span></div><span><strong>2,400+ students</strong> finding their next good thing</span></div>
    </div>
    <div class="hero-art" aria-label="Illustration of student marketplace finds"><div class="hero-note">Campus finds<strong>from ₹90</strong></div><div class="hero-product laptop">💻</div><div class="hero-product books">📚</div><div class="hero-product headphones">🎧</div><div class="float-card">Just listed <strong>Casio FX-991EX · ₹950</strong></div></div>
  </div></section>
  <div class="trust-row"><div class="trust-inner"><strong>Campus life, a little lighter.</strong><span class="trust-pill"><span class="trust-icon">✓</span> Student community</span><span class="trust-pill"><span class="trust-icon">↻</span> Give things a second life</span><span class="trust-pill"><span class="trust-icon">⌖</span> Meet on campus</span><span class="trust-pill"><span class="trust-icon">♡</span> Better on your budget</span></div></div>
  <section class="section"><div class="container"><div class="section-heading"><div><span class="eyebrow">A little bit of everything</span><h2>Find your campus essential</h2><p>Good stuff from students who get it.</p></div><button class="text-link" data-page="explore">All categories →</button></div>
    <div class="category-grid">${categories.map((category) => `<button class="category-card" data-action="category" data-category="${category.id}"><span class="category-icon">${category.icon}</span><strong>${category.name}</strong><small>${listings.filter((item) => item.category === category.id).length} finds</small></button>`).join("")}</div>
  </div></section>
  <section class="section compact" style="background:#fffefa"><div class="container"><div class="section-heading"><div><span class="eyebrow">Fresh on campus</span><h2>Good things, just listed</h2><p>Real finds, from people just around the corner.</p></div><button class="text-link" data-page="explore">See everything →</button></div>${listingGrid(featured)}</div></section>
  <section class="section how-section"><div class="container"><div class="section-heading"><div><span class="eyebrow">As easy as campus life</span><h2>Good things go around.</h2><p>From a quick find to a new campus favorite, it takes just a few steps.</p></div></div><div class="steps-grid"><article class="step-card"><div class="step-number">01</div><h3>Find your thing</h3><p>Search student listings or ask our AI assistant to help track down the right fit.</p></article><article class="step-card"><div class="step-number">02</div><h3>Connect on campus</h3><p>Send a request and arrange a safe, convenient campus meetup with the student seller.</p></article><article class="step-card"><div class="step-number">03</div><h3>Pass it along</h3><p>When you're done, list it for someone else. Great campus finds deserve another go.</p></article></div></div></section>
  <section class="section compact"><div class="container"><div class="cta-band"><div><h2>Have something someone else needs?</h2><p>List it in a minute. Find it a new home on campus.</p></div><button class="button button-light" data-page="sell">Sell an item <span>→</span></button></div></div></section>`;
}

function explorePage(rentalsOnly = false) {
  const heading = rentalsOnly ? "Rentals" : "Explore marketplace";
  const sub = rentalsOnly ? "Borrow what you need, for just as long as you need it." : "A good find is closer than you think. Browse what students are sharing.";
  return `<section class="page-hero"><div class="container"><span class="eyebrow">${rentalsOnly ? "Borrow & return" : "Browse campus finds"}</span><h1>${heading}</h1><p>${sub}</p></div></section>
    <div class="container market-layout">
      <aside class="filter-panel"><div class="filter-heading"><strong>Filters</strong><button data-action="clear-filters">Clear all</button></div>
        <div class="filter-group"><h3>Category</h3><div class="filter-option"><label><input type="radio" name="category" value="all" ${activeCategory === "all" ? "checked" : ""}> All categories</label></div>${categories.map((category) => `<div class="filter-option"><label><input type="radio" name="category" value="${category.id}" ${activeCategory === category.id ? "checked" : ""}> ${category.name}</label><small>${listings.filter((item) => item.category === category.id).length}</small></div>`).join("")}</div>
        <div class="filter-group"><h3>Price range (₹)</h3><div class="price-inputs"><input id="min-price" type="number" min="0" placeholder="Min" value="${escapeHTML(document.getElementById("min-price")?.value || "")}"><input id="max-price" type="number" min="0" placeholder="Max" value="${escapeHTML(document.getElementById("max-price")?.value || "")}"></div></div>
      </aside>
      <section class="market-content"><form class="search-bar" id="search-form"><span class="search-icon">⌕</span><input id="market-search" type="search" placeholder="Search books, calculators, hostel finds..." value="${escapeHTML(searchQuery)}"><button class="button button-primary" type="submit">Search</button></form>
        <div class="market-toolbar"><span id="results-count"></span><div class="mode-tabs">${(rentalsOnly ? ["rent"] : ["all", "sell", "rent", "exchange"]).map((mode) => `<button class="mode-tab ${activeMode === mode || (rentalsOnly && mode === "rent") ? "active" : ""}" data-action="mode" data-mode="${mode}">${mode === "all" ? "All items" : mode[0].toUpperCase() + mode.slice(1)}</button>`).join("")}</div></div>
        <div id="market-results"></div>
      </section>
    </div>`;
}

function sellPage() {
  return `<section class="page-hero"><div class="container"><span class="eyebrow">Pass it along</span><h1>Make someone's campus day.</h1><p>List your item for sale, rent it out, or find a good swap.</p></div></section>
  <div class="container"><div class="form-intro"><span class="eyebrow">Create a listing</span><h1>What are you sharing?</h1><p>Tell your campus a little about it. All exchanges happen directly between students.</p></div>
    <form class="form-card" id="sell-form"><div class="form-grid">
      <div class="field full"><label for="item-title">Item name *</label><input id="item-title" name="title" required maxlength="70" placeholder="e.g. Casio scientific calculator"></div>
      <div class="field"><label for="item-category">Category *</label><select id="item-category" name="category" required><option value="">Choose a category</option>${categories.map((cat) => `<option value="${cat.id}">${cat.name}</option>`).join("")}</select></div>
      <div class="field"><label for="item-mode">How would you like to share it? *</label><select id="item-mode" name="mode" required><option value="sell">Sell</option><option value="rent">Rent</option><option value="exchange">Exchange</option></select></div>
      <div class="field" id="price-field"><label for="item-price">Price in ₹ *</label><input id="item-price" name="price" type="number" min="1" placeholder="e.g. 500"></div>
      <div class="field"><label for="item-condition">Condition *</label><select id="item-condition" name="condition" required><option>Like new</option><option>Very good</option><option>Good</option><option>Fair</option><option>New</option></select></div>
      <div class="field"><label for="item-campus">Campus / pickup spot *</label><input id="item-campus" name="campus" required placeholder="e.g. North Campus"></div>
      <div class="field"><label for="item-name">Your first name *</label><input id="item-name" name="seller" required placeholder="e.g. Sam"></div>
      <div class="field full"><label for="item-description">Description *</label><textarea id="item-description" name="description" required maxlength="400" placeholder="Share the details a fellow student would want to know..."></textarea></div>
      <div class="field full"><label for="item-emoji">Choose an item icon</label><select id="item-emoji" name="emoji"><option>📦</option><option>📚</option><option>🎧</option><option>🧮</option><option>💡</option><option>🚲</option><option>🏸</option><option>🪴</option><option>📓</option><option>👕</option></select></div>
    </div><div class="form-actions"><span class="form-hint">Demo listings stay in this browser. Meet in a public campus spot and arrange payment directly with the other student.</span><button class="button button-primary" type="submit">Publish listing <span>→</span></button></div></form></div>`;
}

function dashboardPage() {
  const myListings = listings.filter((item) => item.createdByMe);
  return `<div class="container"><div class="panel-heading"><div><span class="eyebrow">Your campus corner</span><h1>Hey, Sam 👋</h1><p>Here's what's happening with your campus activity.</p></div><button class="button button-primary" data-page="sell">＋ New listing</button></div>
    <div class="dashboard-layout"><nav class="side-menu"><button class="active">▦ &nbsp; Overview</button><button data-page="explore">⌕ &nbsp; My requests</button><button data-page="wishlist">♡ &nbsp; Wishlist</button><button data-page="sell">＋ &nbsp; My listings</button></nav>
      <div><div class="stats-grid"><div class="stat-card"><span>Active listings</span><strong>${myListings.length}</strong></div><div class="stat-card"><span>Requests sent</span><strong>${requests.length}</strong></div><div class="stat-card"><span>Saved finds</span><strong>${wishlist.length}</strong></div></div>
      <div class="dashboard-card"><h2>Recent activity</h2>${requests.length ? requests.slice().reverse().slice(0, 5).map((request) => `<div class="request-row"><div><strong>${escapeHTML(request.title)}</strong><small>${escapeHTML(request.type)} request · ${escapeHTML(request.date)}</small></div><span class="status pending">Awaiting reply</span></div>`).join("") : `<div class="empty-state" style="padding:30px"><div class="empty-emoji">🛍️</div><h3>You're all caught up</h3><p>Send a request on a listing and it will show up here.</p><button class="button button-outline" data-page="explore">Find something good</button></div>`}</div>
      <div class="dashboard-card"><h2>Your listings</h2>${myListings.length ? myListings.map((item) => `<div class="request-row"><div><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(categoryName(item.category))} · ${money(item.price)}</small></div><span class="status">Active</span></div>`).join("") : `<p class="muted" style="font-size:11px;margin:0">No listings yet — pass something along to your campus.</p>`}</div></div>
    </div></div>`;
}

function wishlistPage() {
  const saved = wishlist.map(findListing).filter(Boolean);
  return `<section class="page-hero"><div class="container"><span class="eyebrow">Keep the good ones close</span><h1>Your wishlist</h1><p>${saved.length ? `${saved.length} campus ${saved.length === 1 ? "find" : "finds"} saved for later.` : "Save the things you like and come back when you're ready."}</p></div></section><section class="section compact"><div class="container">${saved.length ? listingGrid(saved) : `<div class="empty-state"><div class="empty-emoji">♡</div><h3>Your wishlist is waiting</h3><p>Tap the heart on a listing to save it here.</p><button class="button button-primary" data-page="explore">Explore listings</button></div>`}</div></section>`;
}

function assistantPage() {
  return `<div class="container assistant-layout"><section class="assistant-copy"><span class="eyebrow">A little help goes a long way</span><h1>Your campus<br>shopping sidekick.</h1><p>Tell me what you're looking for, your budget, or what you'd like to swap. I'll find the closest matches from real campus listings.</p><div class="assistant-benefits"><span>Recommendations from actual listings</span><span>Search by budget, category or need</span><span>Helpful ideas for renting and swapping</span></div><p style="font-size:10px;margin-top:24px">Demo mode uses local campus data. No payment or chat service is connected by default.</p></section>
    <section class="chat-panel"><div class="chat-header"><span class="bot-avatar">✦</span><div><strong>CampusCart assistant</strong><small>${AI_CFG.proxyUrl ? "AI endpoint configured · checked when you send" : "Local listing search · AI service not configured"}</small></div></div>
      <div class="chat-messages" id="chat-messages"><div class="chat-message">Hi Sam! 👋 What are you looking for today? Give me a category, a budget, or even just a campus-life problem to solve.</div></div>
      <div class="chat-suggestions"><button class="suggestion" data-prompt="Find a calculator under ₹1000">Calculator under ₹1,000</button><button class="suggestion" data-prompt="What can I rent for a movie night?">Movie night rentals</button><button class="suggestion" data-prompt="Show me books under ₹500">Books under ₹500</button></div>
      <form class="chat-form" id="chat-form"><input id="chat-input" placeholder="Ask me to find something..." autocomplete="off" required><button class="button button-primary" aria-label="Send message" type="submit">Send ↗</button></form>
    </section></div>`;
}

function adminPage() {
  return `<div class="container"><div class="panel-heading"><div><span class="eyebrow">Demo tools</span><h1>Marketplace overview</h1><p>A small admin view of the local demo marketplace.</p></div><span class="status">Demo panel</span></div>
    <div class="admin-banner">This panel is for demonstration only. Listings and requests are stored in this browser; no real user accounts or moderation backend is connected.</div>
    <div class="stats-grid"><div class="stat-card"><span>Total listings</span><strong>${listings.length}</strong></div><div class="stat-card"><span>Open requests</span><strong>${requests.length}</strong></div><div class="stat-card"><span>Saved listings</span><strong>${wishlist.length}</strong></div></div>
    <div class="dashboard-card"><h2>Recent listings</h2><div class="admin-table"><div class="admin-table-head"><span>Listing</span><span>Type</span><span>Price</span><span>Status</span></div>${listings.slice(-8).reverse().map((item) => `<div class="admin-row"><span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.seller)} · ${escapeHTML(categoryName(item.category))}</small></span><span>${item.mode[0].toUpperCase() + item.mode.slice(1)}</span><span>${money(item.price)}</span><span><span class="status">Active</span></span></div>`).join("")}</div></div>
    <div class="dashboard-card"><h2>Recent requests</h2>${requests.length ? requests.slice().reverse().slice(0, 8).map((request) => `<div class="request-row"><div><strong>${escapeHTML(request.title)}</strong><small>${escapeHTML(request.type)} · ${escapeHTML(request.date)}</small></div><span class="status pending">Awaiting reply</span></div>`).join("") : `<p class="muted" style="font-size:11px;margin:0">No requests yet. Try a buy, rent or exchange request.</p>`}</div>
  </div>`;
}

function renderPage() {
  const pages = { home: homePage, explore: () => explorePage(false), rentals: () => explorePage(true), sell: sellPage, dashboard: dashboardPage, wishlist: wishlistPage, assistant: assistantPage, admin: adminPage };
  app.innerHTML = (pages[currentPage] || homePage)();
  if (currentPage === "explore" || currentPage === "rentals") {
    if (currentPage === "rentals") activeMode = "rent";
    renderMarketResults();
    bindMarket();
  }
  if (currentPage === "sell") bindSellForm();
  if (currentPage === "assistant") bindChat();
  updateWishlistCount();
}

function renderMarketResults() {
  const resultsNode = document.getElementById("market-results");
  if (!resultsNode) return;
  const min = Number(document.getElementById("min-price")?.value || 0);
  const max = Number(document.getElementById("max-price")?.value || Infinity);
  const results = listings.filter((item) => {
    const text = `${item.title} ${item.category} ${item.description} ${item.campus}`.toLowerCase();
    return (activeCategory === "all" || item.category === activeCategory)
      && (activeMode === "all" || item.mode === activeMode)
      && (!searchQuery || text.includes(searchQuery.toLowerCase()))
      && (item.price === 0 || item.price >= min)
      && (item.price === 0 || item.price <= max);
  });
  document.getElementById("results-count").textContent = `${results.length} ${results.length === 1 ? "find" : "finds"} on your campus`;
  resultsNode.innerHTML = results.length ? `<div class="listings-grid market-grid">${results.map(cardTemplate).join("")}</div>` : `<div class="empty-state"><div class="empty-emoji">🔎</div><h3>Nothing in this filter (yet)</h3><p>Try a different search or clear a filter to see more campus finds.</p></div>`;
}

function bindMarket() {
  const searchForm = document.getElementById("search-form");
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    searchQuery = document.getElementById("market-search").value.trim();
    renderMarketResults();
  });
  document.querySelectorAll('input[name="category"]').forEach((input) => input.addEventListener("change", () => { activeCategory = input.value; renderMarketResults(); }));
  ["min-price", "max-price"].forEach((id) => document.getElementById(id)?.addEventListener("input", renderMarketResults));
}

function bindSellForm() {
  const form = document.getElementById("sell-form");
  const mode = document.getElementById("item-mode");
  const priceField = document.getElementById("price-field");
  const priceInput = document.getElementById("item-price");
  function updatePriceField() {
    const isExchange = mode.value === "exchange";
    priceField.style.display = isExchange ? "none" : "flex";
    priceInput.required = !isExchange;
  }
  mode.addEventListener("change", updatePriceField);
  updatePriceField();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const seller = String(values.get("seller")).trim();
    const item = {
      id: "mine-" + Date.now(),
      title: String(values.get("title")).trim(),
      category: values.get("category"),
      mode: values.get("mode"),
      price: values.get("mode") === "exchange" ? 0 : Number(values.get("price")),
      originalPrice: 0,
      condition: values.get("condition"),
      emoji: values.get("emoji"),
      seller,
      initials: seller.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
      campus: String(values.get("campus")).trim(),
      rating: "New",
      description: String(values.get("description")).trim(),
      createdByMe: true
    };
    listings.push(item);
    const added = storage.get("addedListings", []);
    added.push(item);
    storage.set("addedListings", added);
    showToast("Your listing is live on this device!");
    changePage("dashboard");
  });
}

function toggleWishlist(id) {
  const detailIsOpen = Boolean(modalRoot.querySelector(".detail-modal"));
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter((savedId) => savedId !== id);
    showToast("Removed from your wishlist");
  } else {
    wishlist.push(id);
    showToast("Saved to your wishlist");
  }
  storage.set("wishlist", wishlist);
  updateWishlistCount();
  renderPage();
  if (detailIsOpen) openDetail(id);
}

function openDetail(id) {
  const item = findListing(id);
  if (!item) return;
  const modeText = item.mode === "sell" ? "Buy this find" : item.mode === "rent" ? "Request a rental" : "Ask to exchange";
  modalRoot.innerHTML = `<div class="detail-modal" role="dialog" aria-modal="true" aria-label="${escapeHTML(item.title)}"><div class="detail-card"><button class="detail-close" data-action="close-modal" aria-label="Close">×</button><div class="detail-art image-${item.category}">${item.emoji}</div><div class="detail-body"><span class="eyebrow">${escapeHTML(categoryName(item.category))} · ${escapeHTML(item.condition)}</span><h2>${escapeHTML(item.title)}</h2><div class="detail-price">${money(item.price)}${item.mode === "rent" ? '<small style="font:500 11px DM Sans;color:#829087"> / day</small>' : ""}</div><p>${escapeHTML(item.description)}</p><p>Pickup: ${escapeHTML(item.campus)}<br>Listed by ${escapeHTML(item.seller)}</p><div class="detail-seller"><span class="seller-avatar">${escapeHTML(item.initials)}</span><span>${escapeHTML(item.seller)}<br><span style="color:#bb8b37">★ ${escapeHTML(item.rating)}</span> · Student community member</span></div><div class="detail-actions"><button class="button button-primary" data-action="request" data-id="${escapeHTML(item.id)}">${modeText} <span>→</span></button><button class="button button-outline" data-action="wishlist" data-id="${escapeHTML(item.id)}">${wishlist.includes(item.id) ? "♥ Saved" : "♡ Save"}</button></div></div></div></div>`;
}

function submitRequest(item, extra = "") {
  const request = { id: "req-" + Date.now(), listingId: item.id, title: item.title, type: item.mode === "sell" ? "Buy" : item.mode === "rent" ? "Rent" : "Exchange", date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }), extra };
  requests.push(request);
  storage.set("requests", requests);
  modalRoot.innerHTML = "";
  showToast(`${request.type} request sent to ${item.seller}!`);
}

function requestItem(id) {
  const item = findListing(id);
  if (!item) return;
  if (item.mode === "rent") {
    const days = window.prompt("How many days would you like to rent it for?", "2");
    if (days === null) return;
    const count = Number(days);
    if (!Number.isInteger(count) || count < 1 || count > 90) { showToast("Enter a rental length from 1 to 90 days."); return; }
    submitRequest(item, `${count} day${count === 1 ? "" : "s"} · ${money(item.price * count)}`);
  } else if (item.mode === "exchange") {
    const offer = window.prompt("What would you like to offer in exchange?");
    if (!offer?.trim()) { if (offer !== null) showToast("Add a short description of your exchange offer."); return; }
    submitRequest(item, offer.trim());
  } else {
    submitRequest(item);
  }
}

function bindChat() {
  const messages = document.getElementById("chat-messages");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  if (!messages || !form || !input) return;
  renderChatHistory(messages);
  document.querySelectorAll(".suggestion").forEach((button) => button.addEventListener("click", () => sendChat(button.dataset.prompt)));
  bindChatForm(form, input, messages);
}

function renderChatHistory(messages) {
  messages.innerHTML = chatHistory.map((entry) => `<div class="chat-message ${entry.role === "user" ? "user" : ""}">${entry.content}</div>`).join("");
  messages.scrollTop = messages.scrollHeight;
}

function bindChatForm(form, input, messages) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendChat(input.value, input, messages);
  });
}

async function sendChat(raw, input, messages) {
  const question = raw.trim();
  if (!question) return;
  input.value = "";
  chatHistory.push({ role: "user", content: escapeHTML(question) });
  renderChatHistory(messages);
  const pending = document.createElement("div");
  pending.className = "chat-message";
  pending.textContent = AI_CFG.proxyUrl ? "Checking the configured AI service…" : "Searching local campus listings…";
  messages.appendChild(pending);
  messages.scrollTop = messages.scrollHeight;
  input.disabled = true;
  let reply;
  try {
    reply = AI_CFG.proxyUrl ? await askConfiguredAssistant(question) : localAssistantReply(question);
  } catch (error) {
    console.error("CampusCart assistant request failed.", error);
    reply = `I couldn't reach the configured AI service. Here are local listing matches instead: ${localAssistantReply(question)}`;
  } finally {
    input.disabled = false;
  }
  pending.remove();
  chatHistory.push({ role: "assistant", content: reply });
  renderChatHistory(messages);
  input.focus();
}

function localAssistantReply(question) {
  const lower = question.toLowerCase();
  const maxMatch = lower.match(/(?:under|below|within|max(?:imum)?(?: budget)?|₹)\s*₹?\s*([\d,]+)/i);
  const max = maxMatch ? Number(maxMatch[1].replace(/,/g, "")) : Infinity;
  const requestedMode = /\b(rent|rental|borrow)\b/.test(lower) ? "rent" : /\b(exchange|swap|trade)\b/.test(lower) ? "exchange" : "all";
  const category = categories.find((item) => lower.includes(item.id) || lower.includes(item.name.toLowerCase()));
  const terms = lower.replace(/[₹,]/g, " ").replace(/\b(?:under|below|within|max|maximum|budget|find|show|me|some|a|an|the|for|please|rent|rental|borrow|exchange|swap|trade|what|can|i|get|good|things?)\b/g, " ").replace(/\d+/g, " ").trim().split(/\s+/).filter((word) => word.length > 2);
  let matches = listings.filter((item) => (requestedMode === "all" || item.mode === requestedMode) && (item.price === 0 || item.price <= max) && (!category || item.category === category.id));
  if (terms.length) {
    const searchMatches = matches.filter((item) => terms.some((term) => `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(term)));
    if (searchMatches.length) matches = searchMatches;
  }
  matches = matches.slice(0, 3);
  if (!matches.length) return "I couldn't spot an exact match in the current listings. Try a broader category or a higher budget, or browse Explore to see everything.";
  const intro = requestedMode === "rent" ? "Local rental matches" : requestedMode === "exchange" ? "Local exchange matches" : "Local listing matches";
  const cards = matches.map((item) => `<div style="background:#fff;border:1px solid #e5eae2;border-radius:8px;padding:8px;margin-top:7px"><strong>${escapeHTML(item.title)}</strong><br><span style="color:#55735a">${money(item.price)}${item.mode === "rent" ? " / day" : ""}</span> · ${escapeHTML(item.campus)}<br><button class="text-link" style="padding:5px 0" data-action="detail" data-id="${escapeHTML(item.id)}">View listing →</button></div>`).join("");
  return `${intro}:<br>${cards}<small style="display:block;margin-top:8px;color:#89938b">Meet on campus and arrange payment directly with the student.</small>`;
}

async function askConfiguredAssistant(question) {
  if (!AI_CFG.anonKey) throw new Error("AI anon key is not configured.");
  const messages = [{ role: "user", content: question }];
  const send = async () => {
    const response = await fetch(AI_CFG.proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": AI_CFG.anonKey, "Authorization": `Bearer ${AI_CFG.anonKey}` },
      body: JSON.stringify({ messages })
    });
    if (!response.ok) throw new Error(`AI service returned ${response.status}`);
    return (await response.json()).message;
  };
  let message = await send();
  const allMatches = [];
  if (message?.tool_calls?.length) {
    messages.push({ role: "assistant", content: message.content || "", tool_calls: message.tool_calls });
    for (const call of message.tool_calls) {
      let args = {};
      try { args = JSON.parse(call.function?.arguments || "{}"); } catch (error) { console.warn("Could not parse assistant search filters.", error); }
      const results = call.function?.name === "search_listings" ? searchForAssistant(args) : [];
      allMatches.push(...results);
      messages.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(results) });
    }
    message = await send();
  }
  const content = escapeHTML(message?.content || "I couldn't find a matching listing this time.")
    .replace(/\[\[([^\]]+)\]\]/g, (_, id) => {
      const item = findListing(id);
      return item ? `<button class="text-link" style="padding:2px 0" data-action="detail" data-id="${escapeHTML(item.id)}">${escapeHTML(item.title)}</button>` : "";
    });
  const cards = [...new Map(allMatches.map((item) => [item.id, item])).values()].slice(0, 3);
  return `${content}${cards.length ? cards.map((item) => `<div style="background:#fff;border:1px solid #e5eae2;border-radius:8px;padding:8px;margin-top:7px"><strong>${escapeHTML(item.title)}</strong><br><span style="color:#55735a">${money(item.price)}${item.mode === "rent" ? " / day" : ""}</span> · ${escapeHTML(item.campus)}<br><button class="text-link" style="padding:5px 0" data-action="detail" data-id="${escapeHTML(item.id)}">View listing →</button></div>`).join("") : ""}`;
}

function searchForAssistant(args) {
  const query = String(args.query || "").toLowerCase();
  return listings.filter((item) => (!args.category || item.category === args.category) && (!args.mode || item.mode === args.mode) && (args.max_price == null || item.price === 0 || item.price <= args.max_price) && (args.min_price == null || item.price >= args.min_price) && (!query || `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(query))).slice(0, Number(args.limit) || 5);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-page], [data-action]");
  if (!target) {
    if (event.target.classList.contains("detail-modal")) modalRoot.innerHTML = "";
    return;
  }
  if (target.dataset.page) {
    event.preventDefault();
    const page = target.dataset.page;
    if (page === "explore") { activeMode = "all"; activeCategory = "all"; searchQuery = ""; }
    if (page === "rentals") { activeMode = "rent"; activeCategory = "all"; searchQuery = ""; }
    changePage(page);
    return;
  }
  const { action, id } = target.dataset;
  if (action === "detail") openDetail(id);
  if (action === "wishlist") toggleWishlist(id);
  if (action === "request") requestItem(id);
  if (action === "close-modal") modalRoot.innerHTML = "";
  if (action === "category") {
    activeCategory = target.dataset.category;
    activeMode = "all";
    searchQuery = "";
    changePage("explore");
    const radio = document.querySelector(`input[name="category"][value="${activeCategory}"]`);
    if (radio) radio.checked = true;
    renderMarketResults();
  }
  if (action === "mode") {
    activeMode = target.dataset.mode;
    if (activeMode === "rent") currentPage = "rentals";
    else if (currentPage === "rentals") currentPage = "explore";
    renderPage();
  }
  if (action === "clear-filters") {
    activeCategory = "all"; activeMode = currentPage === "rentals" ? "rent" : "all"; searchQuery = "";
    renderPage();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") modalRoot.innerHTML = "";
  const target = event.target.closest('[data-action="detail"]');
  if (target && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openDetail(target.dataset.id); }
});

document.getElementById("mobile-menu").addEventListener("click", () => document.querySelector(".main-nav").classList.toggle("open"));
const floatingChatPanel = document.getElementById("floating-chat-panel");
const floatingChatLauncher = document.getElementById("floating-chat-launcher");
const floatingChatInput = document.getElementById("floating-chat-input");
const floatingChatMessages = document.getElementById("floating-chat-messages");
const floatingChatStatus = document.getElementById("floating-chat-status");
if (floatingChatStatus && AI_CFG.proxyUrl) floatingChatStatus.textContent = "AI endpoint configured · checked when you send";
renderChatHistory(floatingChatMessages);
bindChatForm(document.getElementById("floating-chat-form"), floatingChatInput, floatingChatMessages);
floatingChatLauncher.addEventListener("click", () => {
  const isOpening = floatingChatPanel.hidden;
  floatingChatPanel.hidden = !isOpening;
  floatingChatLauncher.setAttribute("aria-expanded", String(isOpening));
  if (isOpening) {
    renderChatHistory(floatingChatMessages);
    floatingChatInput.focus();
  }
});
document.getElementById("floating-chat-close").addEventListener("click", () => {
  floatingChatPanel.hidden = true;
  floatingChatLauncher.setAttribute("aria-expanded", "false");
  floatingChatLauncher.focus();
});
updateWishlistCount();
renderPage();
