"use client";
import Link from "next/link";
import { useState } from "react";
import ProductPhoto from "./product-photo";
import { Product, lineOf, spec } from "@/lib/products";

// Technical index: a rigid list of models with their key specs. Hover or focus a row and the specimen plate on the right
// shows that product with its readouts, like a lab or parts catalogue. No cards, no chips, no spinning shapes.
const COLS: Record<string, [string, RegExp][]> = {
  industrial: [["Type", /chemical type|product type/i], ["Fixture", /fixture/i], ["Full cure", /full cure/i]],
  household: [["Type", /^type/i], ["Pack", /^pack/i], ["Best for", /best for/i]],
};
export default function ProductIndex({ items, kind }: { items: Product[]; kind: "industrial" | "household" }) {
  const [i, setI] = useState(0);
  const p = items[Math.min(i, items.length - 1)], L = lineOf(p.line), cols = COLS[kind];
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-5">
      <ol className="border-b border-ink/15 lg:col-span-3">
        {items.map((it, k) => (
          <li key={it.slug} onMouseEnter={() => setI(k)} onFocus={() => setI(k)}>
            <Link href={`/products/${it.slug}`} className={`group relative flex items-center gap-4 border-t border-ink/15 py-4 pl-5 pr-3 transition-colors ${k === i ? "bg-ink/5" : ""}`}>
              <span aria-hidden className={`absolute left-0 top-0 h-full w-1 origin-top bg-gold transition-transform duration-300 ${k === i ? "scale-y-100" : "scale-y-0"}`} />
              <span className="w-7 text-sm tabular-nums text-mist">{pad(k + 1)}</span>
              <span className="h-14 w-14 shrink-0 overflow-hidden rounded bg-white lg:hidden"><ProductPhoto p={it} className="h-full w-full" /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-3xl font-bold leading-none">{it.model}</span>
                <span className="mt-1 block truncate text-sm text-mist">{it.name}</span>
              </span>
              {cols.map(([c, re]) => (
                <span key={c} className="hidden w-28 shrink-0 md:block">
                  <span className="block text-[10px] uppercase tracking-wider text-mist">{c}</span>
                  <span className="block truncate text-sm font-medium">{spec(it, re)}</span>
                </span>
              ))}
              <span className="text-xl text-golddk transition group-hover:translate-x-1">&rarr;</span>
            </Link>
          </li>
        ))}
      </ol>
      <aside className="hidden lg:col-span-2 lg:block">
        <div className="sticky top-28">
          <div key={p.slug} className="bracket relative overflow-hidden text-ivory" style={{ background: "radial-gradient(80% 60% at 50% 0%, rgba(214,38,43,.28), transparent 70%), linear-gradient(180deg, #25282d, #14161a)" }}>
            <span className="scan-line" aria-hidden />
            <div className="flex items-center justify-between px-5 pt-4 text-[11px] uppercase tracking-[0.2em] text-ivory/60"><span>{L.name}</span><span>Specimen {pad(Math.min(i, items.length - 1) + 1)} / {pad(items.length)}</span></div>
            <div className="px-8 pt-4">
              <div className="float-soft mx-auto h-60 w-60 rounded bg-white p-2 shadow-2xl"><ProductPhoto p={p} eager className="h-full w-full" /></div>
              <div className="shadow-pulse mx-auto mt-3 h-3 w-40 rounded-[50%] bg-black/50 blur-md" />
            </div>
            <div className="px-6 pb-6 pt-4">
              <h2 className="font-display text-5xl font-bold leading-none">{p.model}</h2>
              <p className="mt-1 text-ivory/70">{p.name}</p>
              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
                {p.specs.slice(0, 6).map(([k, v], n) => <div key={n} className="border-t border-white/15 pt-2"><dt className="text-[10px] uppercase tracking-wider text-ivory/50">{k.replace(/ \(.*\)/, "")}</dt><dd className="font-display text-xl font-semibold leading-tight">{v}</dd></div>)}
              </dl>
              <Link href={`/products/${p.slug}`} className="mt-6 inline-block rounded-sm bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:brightness-110">Open datasheet &rarr;</Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
