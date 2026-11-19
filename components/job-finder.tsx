"use client";
import Link from "next/link";
import { useState } from "react";
import ProductPhoto from "./product-photo";
import { useLang } from "./lang-provider";
import { CardItem, SITE } from "@/lib/products";
import { countProducts } from "@/lib/i18n";

// "Tell us the job": pick a job on the left, the matching products appear on the right.
// The job-to-product matches come from the applications printed in the EPOBOND catalogue; the technical team should review them.
const JOBS: { id: string; models: string[] }[] = [
  { id: "household", models: ["Epoxy Rapid", "1010", "SGCC", "AB Glue", "ECC", "1011", "SGC3", "STR"] },
  { id: "metal", models: ["5251", "2020", "5555", "EMSS", "EX-1421", "EX-1475", "SQB", "6650"] },
  { id: "pipes", models: ["EPW", "EW5C", "EW24C", "6650", "TS-1565", "TS-1577", "TS-1542"] },
  { id: "wood", models: ["MDF 400 ml", "MDF 200 ml", "CX-401", "CX-495", "Epoxy Rapid"] },
  { id: "leather", models: ["CollaFix 10 gm", "CollaFix 25 gm", "CX-401", "CX-495", "CX-406"] },
  { id: "bolts", models: ["TL-1222", "TL-1243", "TL-1270", "TL-1272", "TL-1290"] },
  { id: "bearings", models: ["BR-1638", "BR-1648", "BR-1641"] },
  { id: "threads", models: ["TS-1542", "TS-1565", "TS-1577"] },
  { id: "flanges", models: ["GA-1518", "GA-1510", "GA-1574"] },
  { id: "glass", models: ["UV-5253", "1010", "1011", "Epoxy Rapid"] },
  { id: "plastics", models: ["CX-406", "CX-480", "CX-401", "CX-495"] },
  { id: "instant", models: ["CX-415", "CX-480", "CX-401"] },
];

export default function JobFinder({ items }: { items: CardItem[] }) {
  const { lang, t, href } = useLang(); const f = t.finder;
  const [id, setId] = useState(JOBS[0].id);
  const job = JOBS.find((j) => j.id === id)!;
  const title = f.jobs[id][1];
  const matched = job.models.map((m) => items.find((p) => p.model === m)).filter((p): p is CardItem => !!p);
  const shown = matched.slice(0, 4);
  const lines = [...new Set(matched.map((p) => p.line))];
  const [before, after] = f.forTpl.split("{count}");
  const more = matched.length - shown.length;
  return (
    <section data-reveal className="mx-auto max-w-6xl px-6 pt-16 md:pt-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-golddk">{f.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:text-7xl">{f.titleA} <span className="text-golddk">{f.titleB}</span></h2>
          <p className="mt-5 max-w-md leading-relaxed text-mist">{f.p}</p>
        </div>
        <Link href={href("/products")} className="group inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:brightness-110">{f.browse} <span className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1"><span className="arr">&rarr;</span></span></Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl text-ivory shadow-2xl md:mt-14" style={{ background: "radial-gradient(70% 90% at 100% 0%, rgba(143,29,29,.6) 0%, transparent 65%), #17191c" }}>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="min-w-0 p-6 sm:p-9 md:border-e md:border-white/10">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ivory/70"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px]">01</span>{f.label}</p>
            <div className="no-scrollbar mt-6 grid auto-cols-max grid-flow-col grid-rows-3 gap-2.5 overflow-x-auto pb-2 md:flex md:flex-wrap md:overflow-visible md:pb-0" role="group" aria-label={f.group}>
              {JOBS.map((j) => (
                <button key={j.id} type="button" onClick={() => setId(j.id)} aria-pressed={j.id === id} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${j.id === id ? "border-white bg-white font-semibold text-[#17191c]" : "border-white/20 bg-white/5 text-ivory/85 hover:border-gold hover:bg-white/10"}`}>{f.jobs[j.id][0]}</button>
              ))}
            </div>
            <p className="mt-8 text-sm text-ivory/60">{f.support} <a href={`tel:${SITE.techPhone}`} dir="ltr" className="inline-block font-semibold text-ivory underline-offset-4 hover:text-gold hover:underline">{SITE.techPhone}</a>.</p>
          </div>

          <div className="min-w-0 border-t border-white/10 p-6 sm:p-9 md:border-t-0">
            <p className="font-display text-2xl leading-tight text-ivory/85 sm:text-3xl">{before}<span className="font-bold text-white">{countProducts(lang, matched.length)}</span>{after.replace("{title}", title)}</p>
            <div key={job.id} className="mt-6 grid gap-3 sm:grid-cols-2 md:min-h-[17rem]">
              {shown.map((p, i) => (
                <Link key={p.slug} href={href(`/products/${p.slug}`)} className="fade-up group flex items-center gap-4 rounded-2xl bg-white p-3 text-[#17191c] transition hover:-translate-y-1 hover:shadow-xl" style={{ animationDelay: `${i * 60}ms` }}>
                  <span className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-xl bg-[#f1efea] p-1.5"><ProductPhoto p={p} small className="h-full w-full object-contain" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl font-bold leading-none sm:text-2xl">{p.model}</span>
                    <span className="mt-1.5 line-clamp-2 block text-xs leading-snug text-[#5b5f66]">{p.name}</span>
                  </span>
                  <span className="self-start text-sm text-[#d6262b] transition group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden><span className="arr">↗</span></span>
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {more > 0 && <span className="self-center pe-1 text-xs text-ivory/55">{lang === "ar" ? `و${more}` : `+${more}`} {f.moreIn}</span>}
              {lines.map((l) => <Link key={l} href={href(l === "household" ? "/products?segment=household" : `/products?line=${l}`)} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold transition hover:border-gold hover:bg-white/10">{t.lines[l as "fast"].name} <span className="arr" aria-hidden>&rarr;</span></Link>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
