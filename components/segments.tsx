import Link from "next/link";
import ProductPhoto from "./product-photo";
import { LINES, PRODUCTS, SEGMENTS } from "@/lib/products";

// Two-panel segment chooser. The panel under the cursor widens; lines are a ruled index, not boxes.
const STACK: Record<string, string[]> = { household: ["5251", "1010", "SGC3"], industrial: ["CX-406", "TL-1243", "UV-5253"] };
export default function Segments() {
  return (
    <section data-reveal className="mx-auto max-w-6xl px-6 pt-24">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">Choose your segment</h2>
      <div className="mt-8 flex flex-col overflow-hidden rounded-[2rem] border border-ink/15 md:min-h-[560px] md:flex-row">
        {SEGMENTS.map((sg, i) => {
          const dark = i === 1, rule = dark ? "border-white/15" : "border-ink/15", soft = dark ? "text-ivory/60" : "text-mist", accent = dark ? "text-gold" : "text-golddk";
          const lines = LINES.filter((l) => l.segment === sg.id);
          return (
            <div key={sg.id} className={`group relative flex flex-col p-8 transition-[flex-grow] duration-700 ease-out md:flex-1 md:p-11 md:hover:grow-[1.35] ${dark ? "text-ivory" : "bg-deep text-ink"} ${i === 0 ? `border-b md:border-b-0 md:border-r ${rule}` : ""}`}
              style={dark ? { background: "radial-gradient(80% 70% at 85% 0%, #8f1d1d 0%, #17191c 60%, #0e0f11 100%)" } : undefined}>
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-7xl font-semibold leading-none" style={{ color: "transparent", WebkitTextStroke: `1px ${dark ? "rgba(246,241,230,.45)" : "rgba(18,38,36,.35)"}` }}>0{i + 1}</span>
                <div className="flex -space-x-4">
                  {STACK[sg.id].map((m) => { const p = PRODUCTS.find((x) => x.model === m)!; return <span key={m} className={`h-16 w-16 overflow-hidden rounded-full bg-black/10 p-1 shadow-lg ring-2 transition duration-500 group-hover:-translate-y-1 ${dark ? "ring-teal" : "ring-deep"}`}><ProductPhoto p={p} className="h-full w-full scale-110" /></span>; })}
                </div>
              </div>
              <h3 className="mt-10 font-display text-5xl font-semibold md:text-6xl">{sg.name}</h3>
              <p className={`mt-3 max-w-md leading-relaxed ${soft}`}>{sg.desc}</p>
              <ul className="mt-8">
                {lines.map((l) => (
                  <li key={l.id}>
                    <Link href={`/products?line=${l.id}`} className={`group/row flex items-baseline gap-3 border-t py-3.5 transition-all hover:pl-2 ${rule}`}>
                      <span className="h-2.5 w-2.5 shrink-0 translate-y-px rounded-full" style={{ background: l.color }} />
                      <span className="font-display text-xl font-semibold">{l.name}</span>
                      <span className={`hidden flex-1 truncate text-sm lg:inline ${soft}`}>{l.tag}</span>
                      <span className={`ml-auto shrink-0 text-xs ${soft}`}>{PRODUCTS.filter((p) => p.line === l.id).length} products</span>
                      <span className={`w-4 -translate-x-2 opacity-0 transition group-hover/row:translate-x-0 group-hover/row:opacity-100 ${accent}`}>&rarr;</span>
                    </Link>
                  </li>
                ))}
                <li className={`border-t ${rule}`} />
              </ul>
              <div className="mt-auto pt-8">
                <Link href={`/products?segment=${sg.id}`} className={`inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-4 ${accent}`}>Browse {sg.name} <span>&rarr;</span></Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}