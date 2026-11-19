import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import seed from "@/data/seed-products.json";
import { Product, lineOf, slugify } from "./products";
import { ProductInput } from "./validate";

// All product data lives in Supabase. If Supabase is not connected yet, the site shows the starting catalogue (read-only).
type Row = { slug: string; model: string; name: string; line: string; summary: string; store_url: string; draft: boolean; images: string[]; specs: [string, string][]; notes: string[]; sections: [string, string[]][]; sort_order: number };
export const dbReady = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
let client: SupabaseClient | null = null;
function sb() {
  if (!client) client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false }, global: { fetch: (u, o) => fetch(u, { ...o, cache: "no-store" }) } });
  return client;
}
const segOf = (line: string) => lineOf(line).segment;
const fromRow = (r: Row): Product => ({ slug: r.slug, model: r.model, name: r.name, line: lineOf(r.line).id, summary: r.summary ?? "", storeUrl: r.store_url || "#", draft: r.draft, images: r.images ?? [], specs: r.specs ?? [], notes: r.notes ?? [], sections: r.sections ?? [], segment: segOf(r.line) });
const seedList = (): Product[] => (seed as any[]).map((p) => ({ ...p, line: lineOf(p.line).id, segment: segOf(p.line) }));
const toRow = (i: ProductInput) => ({ model: i.model, name: i.name, line: i.line, summary: i.summary, store_url: i.storeUrl || "#", draft: i.draft, images: i.images, specs: i.specs, notes: i.notes, sections: i.sections });
const need = () => { if (!dbReady()) throw new Error("Supabase is not connected yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local and restart the site."); };

export type AdminList = { products: Product[]; status: "ok" | "unconfigured" | "error"; message?: string };
// Fresh, uncached list for the admin panel.
export async function adminList(): Promise<AdminList> {
  if (!dbReady()) return { products: seedList(), status: "unconfigured" };
  const { data, error } = await sb().from("products").select("*").order("sort_order").order("created_at");
  if (error) return { products: seedList(), status: "error", message: error.message };
  return { products: (data as Row[]).map(fromRow), status: "ok" };
}
// Cached list for the public site. It refreshes whenever the admin saves.
export const getProducts = unstable_cache(async () => (await adminList()).products, ["products-v1"], { tags: ["products"], revalidate: 600 });

export async function createProduct(input: ProductInput): Promise<Product> {
  need(); const db = sb();
  const { data: ex, error: e1 } = await db.from("products").select("slug,sort_order");
  if (e1) throw new Error(e1.message);
  const taken = new Set((ex ?? []).map((r) => r.slug)); const base = slugify(input.model) || "product"; let slug = base, n = 2;
  while (taken.has(slug)) slug = `${base}-${n++}`;
  const sort = Math.max(-1, ...(ex ?? []).map((r) => r.sort_order as number)) + 1;
  const { data, error } = await db.from("products").insert({ slug, ...toRow(input), sort_order: sort }).select().single();
  if (error) throw new Error(error.message);
  return fromRow(data as Row);
}
export async function updateProduct(slug: string, input: ProductInput): Promise<Product> {
  need();
  const { data, error } = await sb().from("products").update({ ...toRow(input), updated_at: new Date().toISOString() }).eq("slug", slug).select().single();
  if (error) throw new Error(error.message);
  return fromRow(data as Row);
}
export async function deleteProduct(slug: string) { need(); const { error } = await sb().from("products").delete().eq("slug", slug); if (error) throw new Error(error.message); }
export async function uploadImage(buf: Buffer, ext: string, type: string): Promise<string> {
  need(); const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await sb().storage.from("product-images").upload(name, buf, { contentType: type, cacheControl: "31536000" });
  if (error) throw new Error(error.message);
  return sb().storage.from("product-images").getPublicUrl(name).data.publicUrl;
}