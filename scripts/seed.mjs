// Loads the 46 starting products into Supabase. Run once after creating the table:  npm run seed
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
if (!process.env.SUPABASE_URL && fs.existsSync(".env.local")) for (const l of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) { const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, ""); }
const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first."); process.exit(1); }
const sb = createClient(url, key, { auth: { persistSession: false } });
const rows = JSON.parse(fs.readFileSync("data/seed-products.json", "utf8")).map((p, i) => ({
  slug: p.slug, model: p.model, name: p.name, line: p.line, summary: p.summary, store_url: p.storeUrl || "#", draft: !!p.draft,
  images: p.images || [], specs: p.specs || [], notes: p.notes || [], sections: p.sections || [], sort_order: i,
}));
const { error } = await sb.from("products").upsert(rows, { onConflict: "slug" });
if (error) { console.error("Seed failed:", error.message); process.exit(1); }
console.log(`Seeded ${rows.length} products.`);
