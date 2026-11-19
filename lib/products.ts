// TODO: replace with client data. storeUrl = link to the client's store page ("#" = not listed yet).
export const SITE = { name: "Epobond for Chemicals", address: "Cairo, Egypt", tagline: "Technical data, applications and directions for every adhesive and sealant, before you buy.", phone: "16369", techPhone: "01066626617", email: "info@example.com" };
export type Spec = [string, string];
export type Product = { slug: string; model: string; name: string; line: string; summary: string; specs: Spec[]; notes: string[]; sections: [string, string[]][]; storeUrl: string; segment: string; images: string[]; draft?: boolean };
export const LINES = [
  // Household has no sub-categories: one line that holds every household product.
  { id: "household", segment: "household", name: "Household", tag: "Epoxy, putty, super glue and everyday repair adhesives", color: "#d6262b", retail: true, desc: "Epoxy, epoxy putty, plumber's putty, super glue, MultiBond, CollaFix and A/B glue for the home and workshop." },
  { id: "fast", segment: "industrial", name: "EPOBOND-Fast", tag: "Instant adhesives", color: "#3b6cff", desc: "Cyanoacrylate instant adhesives for fast, high-strength bonding. Choose by viscosity, gap-filling ability and the materials you are bonding." },
  { id: "lock", segment: "industrial", name: "EPOBOND-Lock", tag: "Threadlockers, retaining compounds and pipe thread sealant", color: "#d4453f", desc: "Anaerobic threadlockers, retaining compounds and pipe thread sealant that cure when confined in the absence of air on close-fitting metal parts." },
  { id: "seal", segment: "industrial", name: "EPOBOND-Seal", tag: "Thread sealants and gasketing", color: "#e08a2e", desc: "Anaerobic thread sealants and form-in-place gasketing compounds that seal metal joints against leakage." },
  { id: "fix", segment: "industrial", name: "EPOBOND-Fix", tag: "UV adhesives", color: "#8a63ff", desc: "UV-curing adhesive for glass to glass and glass to metal bonding." },
];
export const SEGMENTS = [
  { id: "household", name: "Household", desc: "Epoxy, super glue, epoxy putty and everyday repair adhesives for the home and workshop." },
  { id: "industrial", name: "Industrial", desc: "Instant adhesives, threadlockers, retaining compounds, thread sealants, gasketing and UV adhesives, each with a full technical datasheet." },
];
// Old line ids (epoxy, putty, glue) from the earlier three-way household split now all mean "household".
export const lineOf = (id: string) => LINES.find((l) => l.id === id) ?? LINES[0];
export function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
export const spec = (p: Product, re: RegExp) => {
  const r = p.specs.find(([k]) => re.test(k)); if (!r) return "-";
  const u = r[0].match(/\((secs|mins|hrs|hours|mm|°C)\)/); return u ? `${r[1]} ${u[1]}` : r[1];
};

// The slim product shape used by cards and finders (no full datasheet, so the browser receives less data).
export type CardItem = Pick<Product, "slug" | "model" | "name" | "line" | "summary" | "images"> & { facts: [string, string][] };
const CARD_FACTS: [string, RegExp][] = [["Type", /chemical type|product type|^type/i], ["Fixture", /fixture/i], ["Setting", /setting/i], ["Pack", /^pack/i]];
export const toCardItem = (p: Product): CardItem => ({
  slug: p.slug, model: p.model, name: p.name, line: p.line, summary: p.summary, images: p.images,
  // long pack descriptions stay on the product page
  facts: CARD_FACTS.map(([k, re]) => [k, spec(p, re)] as [string, string]).filter(([, v]) => v !== "-" && v.length <= 24).slice(0, 2),
});