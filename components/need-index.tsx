"use client";
import Link from "next/link";
import { useState } from "react";
import ProductPhoto from "./product-photo";
import { PRODUCTS, lineOf } from "@/lib/products";

// "What are you bonding?" as an editorial index: hover or focus a job and the matching product appears on the right.
const NEEDS = [
  { title: "Bonding plastics and rubber", desc: "Low viscosity cyanoacrylate for high-speed, high-strength bonding of plastics and rubbers.", href: "/products/cx-406", model: "CX-406" },
  { title: "Locking bolts and fittings", desc: "Threadlockers and retaining compounds for metal parts.", href: "/products?line=lock", model: "TL-1243" },
  { title: "Sealing threads and flanges", desc: "Thread sealants and gasketing compounds for leak-free metal joints.", href: "/products?line=seal", model: "TS-1542" },
  { title: "Glass to glass or metal", desc: "UV-curing adhesive for bonding glass.", href: "/products?line=fix", model: "UV-5253" },
  { title: "Fixing pipe leaks", desc: "Epoxy putty that can harden even in damp conditions.", href: "/products?line=putty", model: "EPW" },
  { title: "Wood, MDF and leather", desc: "MultiBond for wood and MDF, and CollaFix for leather and shoes.", href: "/products?line=glue", model: "CollaFix 10 gm" },
];
export default function NeedIndex() {
  const [i, setI] = useState(0);
  const p = PRODUCTS.find((x) => x.model === NEEDS[i].model)!, L = lineOf(p.line);
  return (
    <section data-reveal className="mx-auto max-w-6xl px-6 pt-24">
      <div className="grid gap-14 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">What are you bonding?</h2>
          <p className="mt-3 max-w-md text-mist">Start from the job and we will point you to the right range.</p>
          <ul className="mt-10 border-b border-ink/15">
            {NEEDS.map((n, k) => (
              <li key={n.title} onMouseEnter={() => setI(k)} onFocus={() => setI(k)}>
                <Link href={n.href} className="group flex items-start gap-5 border-t border-ink/15 py-6 transition-all duration-300 hover:pl-3">
                  <span className={`mt-2 w-6 text-sm tabular-nums transition ${k === i ? "text-golddk" : "text-ink/35"}`}>0{k + 1}</span>
                  <span className="flex-1">
                    <span className={`block font-display text-3xl font-semibold transition md:text-4xl ${k === i ? "text-ink" : "text-ink/55"}`}>{n.title}</span>
                    <span className="mt-1.5 block max-w-md text-sm leading-relaxed text-mist">{n.desc}</span>
                  </span>
                  <span className={`mt-3 text-xl text-golddk transition duration-300 ${k === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:col-span-2 lg:block">
          <div className="sticky top-28">
            <div key={i} className="page-in relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-xl">
              <div className="float-soft h-full w-full p-6"><ProductPhoto p={p} eager className="h-full w-full" /></div>
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-white via-white/90 to-transparent p-5 pt-12">
                <div><p className="font-display text-2xl font-semibold">{p.model}</p><p className="text-xs text-mist">{p.name}</p></div>
                <span className="flex items-center gap-2 text-xs text-mist"><span className="h-2 w-2 rounded-full" style={{ background: L.color }} />{L.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
