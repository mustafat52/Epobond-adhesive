// Loads the starting catalogue (data/seed-products.json) into Supabase.
//   npm run seed             adds new products and overwrites existing ones that have the same slug
//   npm run seed -- --prune  also deletes products that are NOT in the seed file (use once when moving to the new catalogue)
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
if (process.argv.includes("--prune")) {
  const keep = new Set(rows.map((r) => r.slug));
  const { data, error: e2 } = await sb.from("products").select("slug");
  if (e2) { console.error("Prune failed:", e2.message); process.exit(1); }
  const stale = (data ?? []).map((r) => r.slug).filter((s) => !keep.has(s));
  if (stale.length) {
    const { error: e3 } = await sb.from("products").delete().in("slug", stale);
    if (e3) { console.error("Prune failed:", e3.message); process.exit(1); }
  }
  console.log(`Removed ${stale.length} products not in the catalogue: ${stale.join(", ") || "none"}`);
}
