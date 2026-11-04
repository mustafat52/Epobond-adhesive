"use client";
import Link from "next/link";
import { useState } from "react";
import ProductPhoto from "./product-photo";
import { Product, lineOf } from "@/lib/products";

// "What are you bonding?" as a finder: pick the job, see the range and the products that fit.
const JOBS = [
  { tab: "Plastics and rubber", title: "Bonding plastics and rubber", desc: "Low viscosity cyanoacrylate for high-speed, high-strength bonding of plastics and rubbers.", line: "fast", models: ["CX-406", "CX-415", "CX-480"] },
  { tab: "Bolts and fittings", title: "Locking bolts and fittings", desc: "Threadlockers and retaining compounds for metal parts.", line: "lock", models: ["TL-1222", "TL-1243", "BR-1638"] },
  { tab: "Threads and flanges", title: "Sealing threads and flanges", desc: "Thread sealants and gasketing compounds for leak-free metal joints.", line: "seal", models: ["TS-1542", "TS-1565", "GA-1510"] },
  { tab: "Glass", title: "Glass to glass or metal", desc: "UV-curing adhesive for bonding glass.", line: "fix", models: ["UV-5253", "UV-5200"] },
  { tab: "Pipe leaks", title: "Fixing pipe leaks", desc: "Epoxy putty that can harden even in damp conditions.", line: "putty", models: ["EPW", "6650"] },
  { tab: "Wood and leather", title: "Wood, MDF and leather", desc: "MultiBond for wood and MDF, and CollaFix for leather and shoes.", line: "glue", models: ["MDF 400 ml", "CollaFix 10 gm", "CollaFix 25 gm"] },
];
export default function NeedFinder({ products }: { products: Product[] }) {
  const [i, setI] = useState(0);
  const job = JOBS[i], L = lineOf(job.line);
  const prods = job.models.map((m) => products.find((p) => p.model === m)).filter((p): p is Product => !!p);
  return (
    <section data-reveal className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">What are you bonding?</h2>
      <p className="mt-3 max-w-md text-mist">Start from the job and we will point you to the right range.</p>
      <div role="tablist" className="no-scrollbar -mx-6 mt-8 flex snap-x gap-2 overflow-x-auto px-6 pb-1">
        {JOBS.map((j, k) => (
          <button key={j.tab} role="tab" aria-selected={k === i} onClick={() => setI(k)}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition ${k === i ? "border-gold bg-gold font-semibold text-white" : "border-ink/20 text-mist hover:border-gold hover:text-ink"}`}>{j.tab}</button>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-[2rem] text-ivory" style={{ background: "radial-gradient(70% 90% at 85% 10%, #8f1d1d 0%, #17191c 60%, #0e0f11 100%)" }}>
        <div key={i} className="page-in grid gap-8 p-6 sm:p-8 md:grid-cols-5 md:gap-10 md:p-12">
          <div className="flex flex-col md:col-span-2">
            <p className="flex items-center gap-2 text-sm text-gold"><span className="h-2 w-2 rounded-full" style={{ background: L.color }} />{L.name}</p>
            <h3 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">{job.title}</h3>
            <p className="mt-4 leading-relaxed text-ivory/70">{job.desc}</p>
            <Link href={`/products?line=${job.line}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-gold transition-all hover:gap-4">See all {L.name} <span>&rarr;</span></Link>
          </div>
          <div className="grid grid-cols-3 gap-4 md:col-span-3">
            {prods.map((p, k) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                <div className="float-md aspect-[3/4] overflow-hidden rounded-2xl p-1 md:drop-shadow-2xl transition duration-300 group-hover:-translate-y-1" style={{ animationDelay: `-${k * 1.4}s` }}>
                  {p.images[0]
                    ? <ProductPhoto p={p} small eager className="h-full w-full" />
                    : <div className="flex h-full flex-col items-center justify-center rounded-xl p-2 text-center" style={{ background: `${L.color}1f` }}><span className="h-2.5 w-2.5 rounded-full" style={{ background: L.color }} /><span className="mt-3 font-display text-lg font-semibold sm:text-xl leading-tight text-onwhite">{p.model}</span></div>}
                </div>
                <p className="mt-3 font-display text-lg font-semibold sm:text-xl">{p.model}</p>
                <p className="truncate text-xs text-ivory/60">{p.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
