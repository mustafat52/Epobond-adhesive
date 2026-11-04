"use client";
import { useState } from "react";
import Bottle from "./bottle";
import Tilt from "./tilt";
import { Product, lineOf } from "@/lib/products";
// Product photo standing on the page background, with a soft light behind it and a shadow underneath. Sized for phones first.
export default function Gallery({ p }: { p: Product }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <Tilt className="relative">
        <div className="relative flex justify-center pb-10 pt-2 md:pb-12 md:pt-6">
          <div aria-hidden className="absolute inset-x-4 bottom-8 top-2 rounded-full md:bottom-10 md:top-4" style={{ background: "radial-gradient(closest-side, rgb(var(--gold) / .22), transparent 72%)" }} />
          <div className="float-soft relative">
            {p.images.length
              ? <img src={p.images[i]} alt={`${p.model} ${p.name}`} className="h-[300px] w-full max-w-[460px] object-contain sm:h-[420px] md:h-[480px] md:drop-shadow-[0_30px_30px_rgba(0,0,0,.4)]" />
              : <Bottle color={lineOf(p.line).color} label={p.model} className="h-72 md:h-96" />}
          </div>
          <div className="absolute bottom-5 left-0 right-0 flex justify-center md:bottom-8"><div className="shadow-pulse h-4 w-44 rounded-[50%] bg-black/30 blur-sm md:w-60 md:blur-md" /></div>
        </div>
      </Tilt>
      {p.images.length > 1 && <div className="flex gap-3">{p.images.map((s, k) => <button key={s} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} className={`h-14 w-14 rounded-lg border bg-ink/5 p-1 md:h-16 md:w-16 ${k === i ? "border-gold" : "border-ink/15"}`}><img src={s.replace("/products/", "/products/sm/")} alt="" className="h-full w-full object-contain" /></button>)}</div>}
    </div>
  );
}