import arData from "@/data/products-ar.json";
import { CardItem, Product, toCardItem } from "./products";
import { Lang } from "./i18n";
// Arabic product text lives in data/products-ar.json (generated from the catalogue, see PRODUCTS-AR notes).
// Each Arabic block stores a fingerprint of the English text it was translated from. If someone edits the English in the admin panel,
// the fingerprint no longer matches and that block shows the English again instead of a stale translation.
type Ar = { name?: string; summary?: string; facts?: [string, string][]; h?: { name?: string; summary?: string; body?: string }; specs?: [string, string][]; notes?: string[]; sections?: [string, string[]][] };
const AR = arData as unknown as Record<string, Ar>;
export const fp = (s: string) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };
const bodyKey = (p: Product) => fp(JSON.stringify([p.specs, p.notes, p.sections]));
export function localizeProduct(p: Product, lang: Lang): Product {
  if (lang !== "ar") return p;
  const a = AR[p.slug]; if (!a) return p;
  const nameOk = a.name && a.h?.name === fp(p.name), sumOk = a.summary && a.h?.summary === fp(p.summary), bodyOk = a.h?.body === bodyKey(p);
  return { ...p, name: nameOk ? a.name! : p.name, summary: sumOk ? a.summary! : p.summary, specs: bodyOk && a.specs ? a.specs : p.specs, notes: bodyOk && a.notes ? a.notes : p.notes, sections: bodyOk && a.sections ? a.sections : p.sections };
}
/** Card/finder item in the page language. */
export function cardItem(p: Product, lang: Lang): CardItem {
  const base = toCardItem(p);
  if (lang !== "ar") return base;
  const q = localizeProduct(p, "ar"), a = AR[p.slug];
  return { ...base, name: q.name, summary: q.summary, facts: a?.h?.body === bodyKey(p) && a.facts ? a.facts : [] };
}
