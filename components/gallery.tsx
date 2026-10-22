"use client";
import { useState } from "react";
import Bottle from "./bottle";
import Tilt from "./tilt";
import { Product, lineOf } from "@/lib/products";
// Product photo standing straight on the page background, with a soft light behind it and a shadow underneath.
export default function Gallery({ p }: { p: Product }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <Tilt className="relative">
        <div className="relative flex justify-center pb-12 pt-6">
          <div aria-hidden className="absolute inset-x-4 bottom-10 top-4 rounded-full" style={{ background: "radial-gradient(closest-side, rgb(var(--gold) / .22), transparent 72%)" }} />
          <div className="float-soft relative">
            {p.images.length
              ? <img src={p.images[i]} alt={`${p.model} ${p.name}`} className="h-[480px] w-full max-w-[460px] object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,.4)]" />
              : <Bottle color={lineOf(p.line).color} label={p.model} className="h-96" />}
          </div>
          <div className="shadow-pulse absolute bottom-8 left-1/2 h-4 w-60 rounded-[50%] bg-black/30 blur-md" style={{ marginLeft: -120 }} />
        </div>
      </Tilt>
      {p.images.length > 1 && <div className="flex gap-3">{p.images.map((s, k) => <button key={s} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} className={`h-16 w-16 rounded-lg border bg-ink/5 p-1 ${k === i ? "border-gold" : "border-ink/15"}`}><img src={s} alt="" className="h-full w-full object-contain" /></button>)}</div>}
    </div>
  );
}