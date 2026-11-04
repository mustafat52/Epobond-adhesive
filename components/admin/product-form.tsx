"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LINES, SEGMENTS } from "@/lib/products";
import { card, danger, ghost, hint, input, label, primary } from "./ui";

type Init = { slug?: string; model: string; name: string; line: string; summary: string; storeUrl: string; draft: boolean; images: string[]; specs: [string, string][]; notes: string[]; sections: [string, string[]][] };
type SpecRow = { k: string; u: string; v: string };
type SecRow = { title: string; body: string };
const splitLabel = (s: string) => { const m = s.match(/^(.*?)\s*\((.*)\)$/); return m ? { k: m[1], u: m[2] } : { k: s, u: "" }; };
const move = <T,>(a: T[], i: number, d: number) => { const j = i + d; if (j < 0 || j >= a.length) return a; const c = [...a]; [c[i], c[j]] = [c[j], c[i]]; return c; };
const SPEC_NAMES = ["Chemical type", "Appearance", "Specific gravity", "Viscosity", "Fixture time", "Full cure", "Flash point", "Shelf life", "Max gap fill", "Temperature range, continuous", "Tensile strength", "Shear strength", "Breakaway torque", "Prevail torque", "Type", "Pack", "Setting time", "Best for"];
const UNITS = ["cPs", "mm", "mins", "secs", "hrs", "hours", "months", "°C", "N/mm²", "N/m", "MPa"];
const SECTION_TITLES = ["Typical applications", "Typical uses", "Curing performance", "Directions for use", "How to use", "Cure speed vs. substrate", "Typical environmental resistance", "Chemical / solvent resistance", "Limitations", "Storage", "Storage and safety"];

// Shrinks a photo to 1000px and converts it to WebP in the browser before upload, so pages stay fast.
async function toWebp(file: File, max = 1000): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const s = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas"); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("Could not read that photo."))), "image/webp", 0.88));
}
const Section = ({ n, title, help, children }: { n: number; title: string; help?: string; children: React.ReactNode }) => (
  <section className={card}><div className="mb-4 flex items-start gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d6262b] text-sm font-bold text-white">{n}</span><div><h2 className="text-lg font-bold">{title}</h2>{help && <p className="text-sm text-neutral-500">{help}</p>}</div></div>{children}</section>
);

export default function ProductForm({ init, canSave }: { init?: Init; canSave: boolean }) {
  const router = useRouter();
  const editing = Boolean(init?.slug);
  const [f, setF] = useState({ model: init?.model ?? "", name: init?.name ?? "", line: init?.line ?? "", summary: init?.summary ?? "", storeUrl: init?.storeUrl && init.storeUrl !== "#" ? init.storeUrl : "", draft: init?.draft ?? false });
  const [images, setImages] = useState<string[]>(init?.images ?? []);
  const [specs, setSpecs] = useState<SpecRow[]>(init?.specs.length ? init.specs.map(([l, v]) => ({ ...splitLabel(l), v })) : [{ k: "", u: "", v: "" }]);
  const [notes, setNotes] = useState<string[]>(init?.notes ?? []);
  const [secs, setSecs] = useState<SecRow[]>(init?.sections.map(([t, b]) => ({ title: t, body: b.join("\n") })) ?? []);
  const [busy, setBusy] = useState(false), [upl, setUpl] = useState(false), [err, setErr] = useState("");
  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const fail = (m: string) => { setErr(m); window.scrollTo({ top: 0, behavior: "smooth" }); };

  async function addImages(files: FileList | null) {
    if (!files?.length) return; setUpl(true); setErr("");
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData(); fd.append("file", await toWebp(file), "photo.webp");
        const r = await fetch("/api/admin/upload", { method: "POST", body: fd }); const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || "Upload failed.");
        setImages((p) => [...p, j.url]);
      }
    } catch (e: any) { fail(e.message || "Upload failed."); }
    setUpl(false);
  }
  async function save() {
    setBusy(true); setErr("");
    const body = {
      ...f, images,
      specs: specs.filter((r) => r.k.trim() || r.v.trim()).map((r) => [r.u.trim() ? `${r.k.trim()} (${r.u.trim()})` : r.k.trim(), r.v.trim()]),
      notes, sections: secs.filter((s) => s.title.trim() || s.body.trim()).map((s) => [s.title.trim(), s.body.split("\n")]),
    };
    const r = await fetch(editing ? `/api/admin/products/${init!.slug}` : "/api/admin/products", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { setBusy(false); return fail(j.error || "Could not save."); }
    router.push(`/admin?msg=${editing ? "updated" : "created"}`); router.refresh();
  }
  async function remove() {
    if (!editing || !confirm(`Delete ${f.model}? This removes it from the website and cannot be undone.`)) return;
    setBusy(true); const r = await fetch(`/api/admin/products/${init!.slug}`, { method: "DELETE" });
    if (!r.ok) { setBusy(false); return fail((await r.json().catch(() => ({}))).error || "Could not delete."); }
    router.push("/admin?msg=deleted"); router.refresh();
  }
  const small = "rounded-md border border-neutral-300 bg-white px-2.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-30";

  return (
    <div className="pb-28">
      <Link href="/admin" className="text-sm font-semibold text-neutral-600 hover:text-neutral-900">&larr; All products</Link>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase">{editing ? `Edit ${init!.model}` : "Add a product"}</h1>
      <p className="mb-6 text-sm text-neutral-500">{editing ? "Change anything below, then press Save. The website updates straight away." : "Fill in the details below, then press Save. The product appears on the website straight away."}</p>
      {!canSave && <p className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">The database is not connected yet, so saving is switched off. Everything else works.</p>}
      {err && <p role="alert" className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800 ring-1 ring-red-200">{err}</p>}
      <datalist id="spec-names">{SPEC_NAMES.map((x) => <option key={x} value={x} />)}</datalist>
      <datalist id="spec-units">{UNITS.map((x) => <option key={x} value={x} />)}</datalist>
      <datalist id="sec-titles">{SECTION_TITLES.map((x) => <option key={x} value={x} />)}</datalist>

      <div className="space-y-5">
        <Section n={1} title="Basics" help="The name, product line and store link.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={label} htmlFor="model">Model or product code *</label><input id="model" value={f.model} onChange={(e) => set("model", e.target.value)} className={input} placeholder="e.g. CX-406" /></div>
            <div><label className={label} htmlFor="name">Product name *</label><input id="name" value={f.name} onChange={(e) => set("name", e.target.value)} className={input} placeholder="e.g. Low viscosity ethyl cyanoacrylate" /></div>
            <div><label className={label} htmlFor="line">Product line *</label>
              <select id="line" value={f.line} onChange={(e) => set("line", e.target.value)} className={input}><option value="">Choose a line...</option>{SEGMENTS.map((s) => <optgroup key={s.id} label={s.name}>{LINES.filter((l) => l.segment === s.id).map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}</optgroup>)}</select></div>
            <div><label className={label} htmlFor="store">Store link</label><input id="store" value={f.storeUrl} onChange={(e) => set("storeUrl", e.target.value)} className={input} placeholder="https://your-store.com/product" /><p className={hint}>Where the Buy button goes. Leave empty to show an Enquire button instead.</p></div>
          </div>
          <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm"><input type="checkbox" checked={f.draft} onChange={(e) => set("draft", e.target.checked)} className="h-4 w-4 accent-[#d6262b]" /><span><b>Mark as draft</b> <span className="text-neutral-500">(information still to be completed or checked)</span></span></label>
        </Section>

        <Section n={2} title="Photos" help="The first photo is the main one. A product on a transparent background looks best (PNG).">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((u, i) => (
              <div key={u} className="rounded-xl border border-neutral-200 p-2">
                <div className="relative flex aspect-square items-center justify-center rounded-lg bg-neutral-100">{i === 0 && <span className="absolute left-1.5 top-1.5 rounded bg-[#d6262b] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Main</span>}<img src={u.replace("/products/", "/products/sm/")} alt="" className="h-full w-full object-contain p-1" /></div>
                <div className="mt-2 flex gap-1.5">{i > 0 && <button onClick={() => setImages(move(images, i, -1))} className={`${small} flex-1`}>Make earlier</button>}<button onClick={() => setImages(images.filter((_, j) => j !== i))} className={`${small} flex-1 !text-red-700`}>Remove</button></div>
              </div>
            ))}
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-neutral-300 text-center text-sm font-semibold text-neutral-600 hover:border-[#d6262b] hover:text-[#d6262b]">
              <span className="text-3xl leading-none">+</span>{upl ? "Uploading..." : "Add photos"}
              <input type="file" accept="image/png,image/jpeg,image/webp" multiple className="hidden" disabled={upl || !canSave} onChange={(e) => { addImages(e.target.files); e.target.value = ""; }} />
            </label>
          </div>
        </Section>

        <Section n={3} title="Overview" help="A short description shown at the top of the product page and in the PDF datasheet.">
          <textarea value={f.summary} onChange={(e) => set("summary", e.target.value)} rows={4} className={input} placeholder="What the product is and what it is used for." />
        </Section>

        <Section n={4} title="Properties" help="The technical table on the product page. Example: Fixture time | 2 - 20 | secs.">
          <div className="hidden gap-2 px-1 pb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:grid sm:grid-cols-[1.4fr_1.4fr_0.7fr_auto]"><span>Property</span><span>Value</span><span>Unit</span><span className="w-[116px]" /></div>
          <div className="space-y-3 sm:space-y-2">
            {specs.map((r, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 rounded-xl bg-neutral-50 p-2 sm:grid-cols-[1.4fr_1.4fr_0.7fr_auto] sm:bg-transparent sm:p-0">
                <input list="spec-names" value={r.k} onChange={(e) => setSpecs(specs.map((x, j) => (j === i ? { ...x, k: e.target.value } : x)))} placeholder="Property" className={`${input} col-span-2 sm:col-span-1`} />
                <input value={r.v} onChange={(e) => setSpecs(specs.map((x, j) => (j === i ? { ...x, v: e.target.value } : x)))} placeholder="Value" className={input} />
                <input list="spec-units" value={r.u} onChange={(e) => setSpecs(specs.map((x, j) => (j === i ? { ...x, u: e.target.value } : x)))} placeholder="Unit" className={input} />
                <div className="col-span-2 flex gap-1.5 sm:col-span-1"><button disabled={i === 0} onClick={() => setSpecs(move(specs, i, -1))} className={small} aria-label="Move up">&uarr;</button><button disabled={i === specs.length - 1} onClick={() => setSpecs(move(specs, i, 1))} className={small} aria-label="Move down">&darr;</button><button onClick={() => setSpecs(specs.filter((_, j) => j !== i))} className={`${small} !text-red-700`} aria-label="Remove">&#10005;</button></div>
              </div>
            ))}
          </div>
          <button onClick={() => setSpecs([...specs, { k: "", u: "", v: "" }])} className={`${ghost} mt-3`}>+ Add property</button>
        </Section>

        <Section n={5} title="Test notes (optional)" help="Small print under the properties table, such as test methods.">
          <div className="space-y-2">{notes.map((n, i) => <div key={i} className="flex gap-2"><input value={n} onChange={(e) => setNotes(notes.map((x, j) => (j === i ? e.target.value : x)))} className={input} placeholder="e.g. ISO 6922" /><button onClick={() => setNotes(notes.filter((_, j) => j !== i))} className={`${small} !text-red-700`} aria-label="Remove">&#10005;</button></div>)}</div>
          <button onClick={() => setNotes([...notes, ""])} className={`${ghost} mt-3`}>+ Add note</button>
        </Section>

        <Section n={6} title="Detailed information (optional)" help="Extra sections such as applications, directions for use, storage. Write one paragraph or step per line.">
          <div className="space-y-4">
            {secs.map((s, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 p-3 sm:p-4">
                <div className="flex gap-2"><input list="sec-titles" value={s.title} onChange={(e) => setSecs(secs.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} placeholder="Section title" className={input} />
                  <button disabled={i === 0} onClick={() => setSecs(move(secs, i, -1))} className={small} aria-label="Move up">&uarr;</button><button disabled={i === secs.length - 1} onClick={() => setSecs(move(secs, i, 1))} className={small} aria-label="Move down">&darr;</button><button onClick={() => setSecs(secs.filter((_, j) => j !== i))} className={`${small} !text-red-700`} aria-label="Remove">&#10005;</button></div>
                <textarea value={s.body} onChange={(e) => setSecs(secs.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)))} rows={5} className={`${input} mt-2`} placeholder="One paragraph or step per line" />
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2"><button onClick={() => setSecs([...secs, { title: "", body: "" }])} className={ghost}>+ Add section</button>
            {["Typical applications", "Directions for use", "Storage"].filter((t) => !secs.some((s) => s.title === t)).map((t) => <button key={t} onClick={() => setSecs([...secs, { title: t, body: "" }])} className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-200">+ {t}</button>)}</div>
        </Section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex gap-2">{editing && <button onClick={remove} disabled={busy} className={danger}>Delete</button>}{editing && <a href={`/products/${init!.slug}`} target="_blank" rel="noopener noreferrer" className={`${ghost} hidden sm:inline-flex`}>View on website</a>}</div>
          <div className="flex gap-2"><Link href="/admin" className={ghost}>Cancel</Link><button onClick={save} disabled={busy || upl || !canSave} className={primary}>{busy ? "Saving..." : editing ? "Save changes" : "Add product"}</button></div>
        </div>
      </div>
    </div>
  );
}
