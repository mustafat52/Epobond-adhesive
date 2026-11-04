import Link from "next/link";
import ProductPhoto from "./product-photo";
import { Product, spec } from "@/lib/products";

// Product wall: big cut-out products standing on the page background, no boxes.
// Phones get a compact two-column wall; tablets and desktops get the large editorial version.
const KEYS: [string, RegExp][] = [["Type", /chemical type|product type|^type/i], ["Fixture", /fixture/i], ["Setting", /setting/i], ["Pack", /^pack/i]];
export default function ProductWall({ items }: { items: Product[] }) {
  return (
    <div data-stagger className="mt-10 grid grid-cols-2 gap-x-4 gap-y-14 md:mt-14 md:gap-x-10 md:gap-y-24 lg:grid-cols-3">
      {items.map((p, i) => {
        const facts = KEYS.map(([k, re]) => [k, spec(p, re)] as [string, string]).filter(([, v]) => v !== "-").slice(0, 2);
        return (
          <Link key={p.slug} href={`/products/${p.slug}`} className={`group relative block ${i % 3 === 1 ? "lg:mt-20" : ""}`}>
            <span aria-hidden className="pointer-events-none absolute -top-4 left-0 right-0 select-none overflow-hidden whitespace-nowrap font-display text-[3.4rem] font-bold leading-none text-transparent transition-colors duration-500 group-hover:text-gold/15 md:-top-7 md:text-[6.5rem]" style={{ WebkitTextStroke: "1.5px rgb(var(--ink) / .18)" }}>{p.model}</span>
            <div className="relative h-44 pt-3 sm:h-56 md:h-80 md:pt-4">
              <div className="float-md h-full" style={{ animationDelay: `-${(i * 1.3) % 5}s` }}>
                <ProductPhoto p={p} small eager={i < 4} className="h-full w-full transition duration-500 md:drop-shadow-[0_26px_26px_rgba(0,0,0,.38)] md:group-hover:scale-105" />
              </div>
            </div>
            <div className="relative mt-4 flex items-end justify-between gap-2 border-t border-ink/25 pt-3 md:mt-5 md:gap-4">
              <div className="min-w-0"><p className="font-display text-2xl font-bold leading-none md:text-4xl">{p.model}</p><p className="mt-1 line-clamp-2 text-xs text-mist md:truncate md:text-sm">{p.name}</p></div>
              <span className="mb-1 text-xl text-golddk transition group-hover:translate-x-1 md:text-2xl">&rarr;</span>
            </div>
            <div className="mt-3 hidden flex-wrap gap-x-6 gap-y-1 text-xs md:flex">{facts.map(([k, v]) => <span key={k}><span className="uppercase tracking-wider text-mist">{k} </span><span className="font-semibold">{v}</span></span>)}</div>
            <span aria-hidden className="absolute -bottom-3 left-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
          </Link>
        );
      })}
    </div>
  );
}