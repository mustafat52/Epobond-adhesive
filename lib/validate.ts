import { LINES, Spec } from "./products";
export type ProductInput = { model: string; name: string; line: string; summary: string; storeUrl: string; draft: boolean; images: string[]; specs: Spec[]; notes: string[]; sections: [string, string[]][] };
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const arr = (v: unknown) => (Array.isArray(v) ? v : []);
// Checks and cleans what the admin form sends. Throws an Error with a message a non-technical person can act on.
export function parseProduct(body: any): ProductInput {
  const model = str(body?.model), name = str(body?.name), line = str(body?.line);
  if (!model) throw new Error("Please enter the model or product code.");
  if (!name) throw new Error("Please enter the product name.");
  if (!LINES.some((l) => l.id === line)) throw new Error("Please choose a product line.");
  const storeUrl = str(body?.storeUrl) || "#";
  if (storeUrl !== "#" && !/^https?:\/\//i.test(storeUrl)) throw new Error("The store link must start with https://");
  const images = arr(body?.images).map(str).filter(Boolean).slice(0, 12);
  if (images.some((u) => !(u.startsWith("/") || /^https:\/\//i.test(u)))) throw new Error("One of the photos has an invalid address.");
  const specs: Spec[] = arr(body?.specs).map((r) => [str(r?.[0]), str(r?.[1])] as Spec).filter(([k, v]) => k || v).slice(0, 80);
  if (specs.some(([k, v]) => !k || !v)) throw new Error("Each property needs both a name and a value. Fill in or remove the incomplete rows.");
  const notes = arr(body?.notes).map(str).filter(Boolean).slice(0, 40);
  const sections = arr(body?.sections).map((s) => [str(s?.[0]), arr(s?.[1]).map(str).filter(Boolean)] as [string, string[]]).filter(([t, b]) => t || b.length).slice(0, 40);
  if (sections.some(([t]) => !t)) throw new Error("Each detail section needs a title.");
  return { model: model.slice(0, 60), name: name.slice(0, 160), line, summary: str(body?.summary).slice(0, 5000), storeUrl, draft: Boolean(body?.draft), images, specs, notes, sections };
}
