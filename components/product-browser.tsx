"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProductPhoto from "./product-photo";
import { useLang } from "./lang-provider";
import { CardItem } from "@/lib/products";
import { foundLine } from "@/lib/i18n";

// Products page: category sidebar (All products / Household / Industrial > four lines), search, sort and the product grid.
// Categories are real links (?segment=… / ?line=…) so every view has a shareable URL; search and sort run instantly in the browser.
export type { CardItem };
type Props = {
  items: CardItem[]; title: string; desc: string;
  active: { segment?: string; line?: string };
  counts: { all: number; household: number; industrial: number };
  lines: { id: string; name: string; color: string; count: number }[];
};
const row = (on: boolean) => `flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${on ? "bg-gold text-white" : "text-ink hover:bg-ink/5"}`;
const subRow = (on: boolean) => `flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition ${on ? "bg-gold/10 font-semibold text-ink" : "text-mist hover:bg-ink/5 hover:text-ink"}`;

export default function ProductBrowser({ items, title, desc, active, counts, lines }: Props) {
  const { lang, t, href } = useLang(); const b = t.browse;
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const [panel, setPanel] = useState(false); // phones: categories panel
  const [indOpen, setIndOpen] = useState(active.segment === "industrial");
  useEffect(() => { if (active.segment === "industrial") setIndOpen(true); setPanel(false); }, [active.segment, active.line]);

  const shown = useMemo(() => {
    const toks = q.toLowerCase().split(/\s+/).filter(Boolean);
    let r = items.filter((p) => { const hay = `${p.model} ${p.name} ${p.summary} ${t.lines[p.line as "fast"].name}`.toLowerCase(); return toks.every((t) => hay.includes(t)); });
    if (sort === "az") r = [...r].sort((a, b) => a.name.localeCompare(b.name, lang));
    if (sort === "za") r = [...r].sort((a, b) => b.name.localeCompare(a.name, lang));
    if (sort === "model") r = [...r].sort((a, b) => a.model.localeCompare(b.model, undefined, { numeric: true }));
    return r;
  }, [items, q, sort, lang, t]);
  const calm = shown.length > 12; // long grids skip the floating animation to keep scrolling smooth
  const allOn = !active.segment && !active.line;
  const indOn = active.segment === "industrial" && !active.line;

  const search = (
    <div className="relative">
      <svg className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-mist" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder={b.placeholder} aria-label={b.search} className="w-full rounded-lg border border-ink/20 bg-paper/60 py-2.5 ps-10 pe-3 text-sm text-ink placeholder:text-mist focus:border-gold focus:outline-none" />
    </div>
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-golddk">{foundLine(lang, shown.length)}</p>
          <h1 className="font-display text-5xl font-bold leading-none sm:text-6xl md:text-7xl">{title}</h1>
        </div>
        <label className="flex items-center gap-2 text-sm text-mist">
          <span className="hidden sm:inline">{b.sortBy}</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-ink/20 bg-deep px-3 py-2.5 text-sm font-semibold text-ink focus:border-gold focus:outline-none">
            {b.sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
      </div>
      <p className="mt-4 max-w-2xl text-mist">{desc}</p>

      <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
          {/* search: its own card on desktop, a slim bar plus Categories button on phones */}
          <div className="flex gap-2 lg:block lg:rounded-2xl lg:border lg:border-ink/15 lg:bg-deep/70 lg:p-5">
            <h2 className="mb-3 hidden font-display text-2xl font-bold lg:block">{b.search}</h2>
            <div className="flex-1">{search}</div>
            <button type="button" onClick={() => setPanel((v) => !v)} aria-expanded={panel} className="flex shrink-0 items-center gap-2 rounded-lg border border-ink/20 bg-deep px-4 text-sm font-semibold text-ink lg:hidden">
              {b.categories}
              <svg width="12" height="12" viewBox="0 0 10 10" className={`transition ${panel ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M2 3.5l3 3 3-3" /></svg>
            </button>
          </div>

          <nav aria-label={b.categoriesNav} className={`${panel ? "block" : "hidden"} mt-3 rounded-2xl border border-ink/15 bg-deep/70 p-3 lg:mt-4 lg:block`}>
            <h2 className="px-3 pb-2 pt-2 font-display text-2xl font-bold">{b.categories}</h2>
            <Link href={href("/products")} className={row(allOn)}>{t.seg.all.name} <span className="text-xs opacity-70">{counts.all}</span></Link>
            <Link href={href("/products?segment=household")} className={`mt-1 ${row(active.segment === "household")}`}>{t.seg.household.name} <span className="text-xs opacity-70">{counts.household}</span></Link>
            <div className="relative mt-1">
              <Link href={href("/products?segment=industrial")} className={`${row(indOn)} pe-14`}>{t.seg.industrial.name} <span className="text-xs opacity-70">{counts.industrial}</span></Link>
              <button type="button" onClick={() => setIndOpen((v) => !v)} aria-expanded={indOpen} aria-label={indOpen ? b.hideLines : b.showLines} className={`absolute end-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg transition ${indOn ? "text-white hover:bg-white/15" : "text-mist hover:bg-ink/10 hover:text-ink"}`}>
                <svg width="12" height="12" viewBox="0 0 10 10" className={`transition ${indOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M2 3.5l3 3 3-3" /></svg>
              </button>
            </div>
            {indOpen && (
              <ul className="ms-4 mt-1 space-y-0.5 border-s border-ink/15 ps-2">
                <li><Link href={href("/products?segment=industrial")} className={subRow(indOn)}>{b.allIndustrial} <span className="text-xs opacity-70">{counts.industrial}</span></Link></li>
                {lines.map((l) => (
                  <li key={l.id}><Link href={href(`/products?line=${l.id}`)} className={subRow(active.line === l.id)}><span className="flex items-center gap-2.5"><span className="h-2 w-2 shrink-0 rounded-full" style={{ background: l.color }} />{t.lines[l.id as "fast"].name}</span><span className="text-xs opacity-70">{l.count}</span></Link></li>
                ))}
              </ul>
            )}
          </nav>
        </aside>

        <div className="min-w-0">
          {shown.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink/25 px-6 py-14 text-center">
              <p className="font-display text-3xl font-bold">{b.noMatch} “{q}”</p>
              <p className="mt-2 text-sm text-mist">{b.noMatchHint}</p>
              <button type="button" onClick={() => setQ("")} className="mt-6 rounded-sm bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:brightness-110">{b.clear}</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-14">
              {shown.map((p, i) => (
                <Link key={p.slug} href={href(`/products/${p.slug}`)} className="fade-up group relative block" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
                  <span aria-hidden className="pointer-events-none absolute -top-3 start-0 end-0 select-none overflow-hidden whitespace-nowrap font-display text-[2.6rem] font-bold leading-none text-transparent transition-colors duration-500 group-hover:text-gold/15 md:text-[4.2rem]" style={{ WebkitTextStroke: "1.5px rgb(var(--ink) / .18)" }}>{p.model}</span>
                  <div className="relative h-40 pt-3 sm:h-48 md:h-52">
                    <div className={`${calm ? "" : "float-md"} h-full`} style={{ animationDelay: `-${(i * 1.3) % 5}s` }}>
                      <ProductPhoto p={p} small eager={i < 4} className="h-full w-full transition duration-500 md:drop-shadow-[0_20px_20px_rgba(0,0,0,.35)] md:group-hover:scale-105" />
                    </div>
                  </div>
                  <div className="relative mt-3 flex items-end justify-between gap-2 border-t border-ink/25 pt-3">
                    <div className="min-w-0"><p className="font-display text-2xl font-bold leading-none md:text-3xl">{p.model}</p><p className="mt-1 line-clamp-2 text-xs text-mist md:text-sm">{p.name}</p></div>
                    <span className="mb-1 text-xl text-golddk transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1"><span className="arr">&rarr;</span></span>
                  </div>
                  {p.facts.length > 0 && <div className="mt-2.5 hidden flex-wrap gap-x-5 gap-y-1 text-xs md:flex">{p.facts.map(([k, v]) => <span key={k}><span className="uppercase tracking-wider text-mist">{b.facts[k] ?? k} </span><span className="font-semibold" dir={/^[<>≤≥~+\-\d]/.test(v) ? "ltr" : undefined}>{v}</span></span>)}</div>}
                  <span aria-hidden className="absolute -bottom-3 start-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
