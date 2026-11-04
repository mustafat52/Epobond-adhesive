// TODO: replace with client data. storeUrl = link to the client's store page ("#" = not listed yet).
export const SITE = { name: "Epobond for Chemicals", address: "6 October City, Giza, Egypt", tagline: "Technical data, applications and directions for every adhesive and sealant, before you buy.", phone: "+00 000 000 0000", email: "info@example.com" };
export type Spec = [string, string];
export type Product = { slug: string; model: string; name: string; line: string; summary: string; specs: Spec[]; notes: string[]; sections: [string, string[]][]; storeUrl: string; segment: string; images: string[]; draft?: boolean };
export const LINES = [
  { id: "fast", segment: "industrial", name: "EPOBOND-Fast", tag: "Instant adhesives", color: "#3b6cff", desc: "Cyanoacrylate instant adhesives for fast, high-strength bonding. Choose by viscosity, gap-filling ability and the materials you are bonding." },
  { id: "lock", segment: "industrial", name: "EPOBOND-Lock", tag: "Threadlockers and retaining compounds", color: "#d4453f", desc: "Anaerobic threadlockers and retaining compounds that cure when confined in the absence of air on close-fitting metal parts." },
  { id: "seal", segment: "industrial", name: "EPOBOND-Seal", tag: "Thread sealants and gasketing", color: "#e08a2e", desc: "Anaerobic thread sealants and gasketing compounds that seal metal joints against leakage." },
  { id: "epoxy", segment: "household", name: "EPOBOND Epoxy", tag: "Epoxy adhesives", color: "#0e8f8a", retail: true, desc: "Two-part epoxy adhesives for metal repair, structural bonding and clear, strong everyday bonds." },
  { id: "putty", segment: "household", name: "EPOBOND Epoxy Putty", tag: "Epoxy putty", color: "#2f8f5b", retail: true, desc: "Mouldable epoxy putty for filling, sealing and repairing, including pipe leaks and damp surfaces." },
  { id: "glue", segment: "household", name: "Super Glue, Wood and Leather", tag: "Super glue, wood, leather and AB glue", color: "#d13f7a", retail: true, desc: "Cyanoacrylate super glues, wood and MDF bonding, leather and shoe adhesive, and two-part AB glue for everyday repairs." },
  { id: "fix", segment: "industrial", name: "EPOBOND-Fix", tag: "UV adhesives", color: "#8a63ff", desc: "UV-curing adhesive for glass to glass and glass to metal bonding." },
];
export const SEGMENTS = [
  { id: "household", name: "Household", desc: "Epoxy, super glue, epoxy putty and everyday repair adhesives for the home and workshop." },
  { id: "industrial", name: "Industrial", desc: "Technical adhesives, threadlockers, retaining compounds, sealants and gasketing, each with a full technical datasheet." },
];
export const lineOf = (id: string) => LINES.find((l) => l.id === id)!;
export function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
export const spec = (p: Product, re: RegExp) => {
  const r = p.specs.find(([k]) => re.test(k)); if (!r) return "-";
  const u = r[0].match(/\((secs|mins|hrs|hours|mm|°C)\)/); return u ? `${r[1]} ${u[1]}` : r[1];
};
