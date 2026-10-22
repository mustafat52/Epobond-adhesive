import { notFound } from "next/navigation";
import Link from "next/link";
import Gallery from "@/components/gallery";
import BuyButton from "@/components/buy-button";
import DownloadButton from "@/components/download-button";
import DetailNav from "@/components/detail-nav";
import SegmentShell from "@/components/segment-shell";
import ProductPhoto from "@/components/product-photo";
import { PRODUCTS, lineOf, slugify } from "@/lib/products";
export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));
export const generateMetadata = ({ params }: { params: { slug: string } }) => { const p = PRODUCTS.find((x) => x.slug === params.slug); return { title: p?.model, description: p?.summary.slice(0, 155) }; };
const split = (k: string): [string, string] => { const m = k.match(/^(.*?)\s*\((.*)\)$/); return m ? [m[1], m[2]] : [k, ""]; };
const Section = ({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-28 border-t-2 border-ink/80 pt-6">
    <div className="flex items-baseline gap-4"><span className="font-display text-xl font-bold text-golddk">{String(n).padStart(2, "0")}</span><h2 className="font-display text-4xl font-bold">{title}</h2></div>
    <div className="mt-6">{children}</div>
  </section>
);
const body = (t: string, items: string[]) => {
  if (/curing performance/i.test(t)) return <dl className="max-w-2xl">{items.map((x, i) => { const m = x.match(/^(.*?)\s+((?:[<>~≤≥]|\d).*)$/); return m ? <div key={i} className="flex justify-between gap-6 border-b border-ink/15 py-2.5 text-sm"><dt className="text-mist">{m[1]}</dt><dd className="font-semibold">{m[2]}</dd></div> : <p key={i} className="mb-1 mt-4 text-sm font-semibold">{x}</p>; })}</dl>;
  if (/directions|how to use/i.test(t)) return <ol className="max-w-3xl space-y-5">{items.map((x, i) => <li key={i} className="flex gap-5"><span className="font-display text-4xl font-bold leading-none text-golddk">{i + 1}</span><p className="pt-1 leading-relaxed text-mist">{x}</p></li>)}</ol>;
  if (/applications|uses/i.test(t)) return <ul className="max-w-3xl space-y-3">{items.map((x, i) => <li key={i} className="flex gap-3 leading-relaxed text-mist"><span className="mt-2.5 h-2 w-2 shrink-0 bg-gold" />{x}</li>)}</ul>;
  return <div className="max-w-3xl">{items.map((x, i) => x.length < 40 && !/[.:]$/.test(x) ? <h3 key={i} className="mb-2 mt-6 font-display text-2xl font-bold">{x}</h3> : <p key={i} className="mb-4 leading-relaxed text-mist">{x}</p>)}</div>;
};
const GLANCE = [/fixture|setting/i, /full cure/i, /temperature range, continuous/i, /tensile|breakaway|shear|viscosity|pack/i];
export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = PRODUCTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const line = lineOf(p.line);
  const related = PRODUCTS.filter((x) => x.line === p.line && x.slug !== p.slug).slice(0, 4);
  let glance = GLANCE.map((re) => p.specs.find(([k]) => re.test(k))).filter(Boolean) as [string, string][];
  if (glance.length < 3) glance = p.specs.slice(0, 4);
  const nav: [string, string][] = [["overview", "Overview"], ["properties", "Properties"], ...p.sections.map(([t]) => [slugify(t), t] as [string, string])];
  return (
    <SegmentShell segment={p.segment}>
      <article className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-sm text-mist"><a href={`/products?segment=${p.segment}`} className="capitalize hover:text-ink">{p.segment}</a> / <a href={`/products?line=${line.id}`} className="hover:text-ink">{line.name}</a></p>
        <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
          <Gallery p={p} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-golddk">{line.name}</p>
            <h1 className="mt-2 font-display text-7xl font-bold leading-[0.9] md:text-9xl">{p.model}</h1>
            <p className="mt-4 text-2xl text-mist">{p.name}</p>
            <div className="mt-8 flex flex-wrap gap-3"><BuyButton url={p.storeUrl} model={p.model} /><DownloadButton p={p} /></div>
          </div>
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-[210px_1fr]">
          <DetailNav items={nav} />
          <div className="min-w-0 space-y-16">
            <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {glance.map(([k, v]) => { const [lab, unit] = split(k); return <div key={k} className="border-l-4 border-gold pl-4"><dt className="text-xs uppercase tracking-wider text-mist">{lab}</dt><dd className="mt-1 font-display text-3xl font-bold leading-none">{v}{unit && <span className="ml-1 text-sm font-medium text-mist">{unit}</span>}</dd></div>; })}
            </dl>
            <Section n={1} id="overview" title="Overview"><p className="max-w-3xl text-lg leading-relaxed text-mist">{p.summary}</p></Section>
            <Section n={2} id="properties" title="Properties">
              <div className="overflow-x-auto"><table className="w-full text-left text-sm">
                <thead><tr className="border-b-2 border-ink/30 text-xs uppercase tracking-wider text-mist"><th className="px-4 py-3 font-semibold">Property</th><th className="px-4 py-3 font-semibold">Value</th><th className="px-4 py-3 font-semibold">Unit</th></tr></thead>
                <tbody>{p.specs.map(([k, v], i) => { const [lab, unit] = split(k); return <tr key={i} className={i % 2 ? "bg-ink/[0.04]" : ""}><td className="px-4 py-3 text-mist">{lab}</td><td className="px-4 py-3 font-semibold">{v}</td><td className="px-4 py-3 text-mist">{unit}</td></tr>; })}</tbody>
              </table></div>
              {p.notes.length > 0 && <div className="mt-6"><p className="text-xs font-semibold uppercase tracking-wider text-mist">Test methods and conditions</p><ol className="mt-2 list-decimal space-y-1 pl-5 text-xs text-mist">{p.notes.map((n, i) => <li key={i}>{n}</li>)}</ol></div>}
            </Section>
            {p.sections.map(([t, items], i) => <Section key={t} n={i + 3} id={slugify(t)} title={t}>{body(t, items)}</Section>)}
            {related.length > 0 && (
              <section className="border-t-2 border-ink/80 pt-6">
                <h2 className="font-display text-4xl font-bold">More from {line.name}</h2>
                <ul className="mt-6 border-b border-ink/15">{related.map((r) => <li key={r.slug}><Link href={`/products/${r.slug}`} className="group flex items-center gap-5 border-t border-ink/15 py-3"><span className="h-16 w-16 shrink-0"><ProductPhoto p={r} className="h-full w-full" /></span><span className="flex-1"><span className="block font-display text-2xl font-bold leading-none">{r.model}</span><span className="text-sm text-mist">{r.name}</span></span><span className="text-golddk transition group-hover:translate-x-1">&rarr;</span></Link></li>)}</ul>
              </section>
            )}
          </div>
        </div>
      </article>
    </SegmentShell>
  );
}