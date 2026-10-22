import Link from "next/link";
import ProductPhoto from "./product-photo";
import { PRODUCTS } from "@/lib/products";

// Hero scene: the Epobond mark in the middle, two rings of products orbiting it like a molecule.
// Pure CSS animation. Satellites counter-rotate so every product stays upright.
const find = (m: string) => PRODUCTS.find((p) => p.model === m)!;
const RINGS = [
  { r: 160, secs: 38, reverse: false, items: ["CX-406", "TL-1243", "UV-5253", "1010"], dots: [70, 215] },
  { r: 262, secs: 64, reverse: true, items: ["BR-1638", "SGC3", "6650", "TS-1542", "CX-415"], dots: [20, 135, 250] },
];
export default function HeroOrbit() {
  return (
    <div className="relative flex h-[372px] justify-center sm:h-[520px] lg:h-[620px]">
      <div className="relative h-[620px] w-[620px] shrink-0 origin-top scale-[.6] sm:scale-[.84] lg:scale-100">
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(214,38,43,.38), transparent 65%)" }} />
        {RINGS.map((ring) => (
          <div key={ring.r} aria-hidden={false} className={`${ring.reverse ? "orbit-rev" : "orbit"} absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/25`}
            style={{ width: ring.r * 2, height: ring.r * 2, marginLeft: -ring.r, marginTop: -ring.r, animationDuration: `${ring.secs}s` }}>
            {ring.dots.map((a) => <span key={a} aria-hidden className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_12px_#d6262b]" style={{ transform: `rotate(${a}deg) translateY(-${ring.r}px) translate(-50%, -50%)` }} />)}
            {ring.items.map((m, i) => {
              const p = find(m), a = (i * 360) / ring.items.length + (ring.reverse ? 30 : 0);
              return (
                <div key={m} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateY(-${ring.r}px)` }}>
                  <div style={{ transform: `rotate(${-a}deg)` }}>
                    <div className={ring.reverse ? "orbit" : "orbit-rev"} style={{ animationDuration: `${ring.secs}s` }}>
                      <Link href={`/products/${p.slug}`} aria-label={`${p.model} ${p.name}`} className="group relative -ml-[40px] -mt-[40px] block h-[80px] w-[80px] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,.35)] transition hover:scale-110">
                        <span className="block h-full w-full overflow-hidden rounded-full p-1"><ProductPhoto p={p} eager className="h-full w-full scale-110" /></span>
                        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-0.5 text-[11px] text-ivory opacity-0 transition group-hover:opacity-100">{p.model}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <Link href="/about" aria-label="About Epobond" className="pulse-ring absolute left-1/2 top-1/2 -ml-[118px] -mt-[118px] flex h-[236px] w-[236px] items-center justify-center rounded-full bg-white">
          <img src="/logo-mark.png" alt="Epobond" draggable={false} className="float-soft w-[66%]" />
        </Link>
      </div>
    </div>
  );
}
