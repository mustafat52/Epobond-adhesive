import Link from "next/link";
import ProductPhoto from "./product-photo";
import { Product, lineOf, spec } from "@/lib/products";

// Product wall: big cut-out products standing straight on the page background, a giant outlined model number behind each,
// and no boxes. Rows are offset so the wall has rhythm.
const KEYS: [string, RegExp][] = [["Type", /chemical type|product type|^type/i], ["Fixture", /fixture/i], ["Setting", /setting/i], ["Pack", /^pack/i]];
export default function ProductWall({ items }: { items: Product[] }) {
  return (
    <div data-stagger className="mt-14 grid gap-x-10 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => {
        const facts = KEYS.map(([k, re]) => [k, spec(p, re)] as [string, string]).filter(([, v]) => v !== "-").slice(0, 2);
        return (
          <Link key={p.slug} href={`/products/${p.slug}`} className={`group relative block ${i % 3 === 1 ? "lg:mt-20" : ""}`}>
            <span aria-hidden className="pointer-events-none absolute -top-7 left-0 right-0 select-none overflow-hidden whitespace-nowrap font-display text-[6.5rem] font-bold leading-none text-transparent transition-colors duration-500 group-hover:text-gold/15" style={{ WebkitTextStroke: "1.5px rgb(var(--ink) / .18)" }}>{p.model}</span>
            <div className="relative h-80 pt-4">
              <div className="float-soft h-full" style={{ animationDelay: `-${(i * 1.3) % 5}s` }}>
                <ProductPhoto p={p} eager={i < 6} className="h-full w-full object-contain drop-shadow-[0_26px_26px_rgba(0,0,0,.38)] transition duration-500 group-hover:scale-105" />
              </div>
            </div>
            <div className="relative mt-5 flex items-end justify-between gap-4 border-t border-ink/25 pt-3">
              <div className="min-w-0"><p className="font-display text-4xl font-bold leading-none">{p.model}</p><p className="mt-1 truncate text-sm text-mist">{p.name}</p></div>
              <span className="mb-1 text-2xl text-golddk transition group-hover:translate-x-1">&rarr;</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs">{facts.map(([k, v]) => <span key={k}><span className="uppercase tracking-wider text-mist">{k} </span><span className="font-semibold">{v}</span></span>)}</div>
            <span aria-hidden className="absolute -bottom-3 left-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
          </Link>
        );
      })}
    </div>
  );
}