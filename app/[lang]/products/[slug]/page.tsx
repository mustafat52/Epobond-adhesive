import { notFound } from "next/navigation";
import Link from "next/link";
import Gallery from "@/components/gallery";
import BuyButton from "@/components/buy-button";
import DownloadButton from "@/components/download-button";
import DetailNav from "@/components/detail-nav";
import SegmentShell from "@/components/segment-shell";
import ProductPhoto from "@/components/product-photo";
import { lineOf, slugify } from "@/lib/products";
import { getProducts } from "@/lib/store";
import { localizeProduct } from "@/lib/localize";
import { LOCALES, Lang, href } from "@/lib/i18n";
import { dict } from "@/lib/dict";
export const dynamicParams = true;
export const generateStaticParams = async () => { const ps = await getProducts(); return LOCALES.flatMap((lang) => ps.map((p) => ({ lang, slug: p.slug }))); };
export const generateMetadata = async ({ params }: { params: { lang: string; slug: string } }) => {
  const p = (await getProducts()).find((x) => x.slug === params.slug); if (!p) return {};
  const q = localizeProduct(p, params.lang as Lang); return { title: q.model, description: q.summary.slice(0, 155) };
};
const split = (k: string): [string, string] => { const m = k.match(/^(.*?)\s*\((.*)\)$/); return m ? [m[1], m[2]] : [k, ""]; };
const Section = ({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-32 border-t-2 border-ink/80 pt-5 lg:scroll-mt-28 lg:pt-6">
    <div className="flex items-baseline gap-4"><span className="font-display text-xl font-bold text-golddk">{String(n).padStart(2, "0")}</span><h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2></div>
    <div className="mt-6">{children}</div>
  </section>
);
// What kind of section it is is decided from the English title, so the layout works the same in every language.
const kindOf = (t: string) => (/curing performance/i.test(t) ? "curing" : /directions|how to use/i.test(t) ? "steps" : /applications|uses/i.test(t) ? "list" : "text");
const body = (kind: string, items: string[]) => {
  if (kind === "curing") return <dl className="max-w-2xl">{items.map((x, i) => { const m = x.match(/^(.*?)\s+((?:[<>~≤≥]|\d).*)$/); return m ? <div key={i} className="flex justify-between gap-6 border-b border-ink/15 py-2.5 text-sm"><dt className="text-mist">{m[1]}</dt><dd className="font-semibold" dir="ltr">{m[2]}</dd></div> : <p key={i} className="mb-1 mt-4 text-sm font-semibold">{x}</p>; })}</dl>;
  if (kind === "steps") return <ol className="max-w-3xl space-y-5">{items.map((x, i) => <li key={i} className="flex gap-5"><span className="font-display text-4xl font-bold leading-none text-golddk">{i + 1}</span><p className="pt-1 leading-relaxed text-mist">{x}</p></li>)}</ol>;
  if (kind === "list") return <ul className="max-w-3xl space-y-3">{items.map((x, i) => <li key={i} className="flex gap-3 leading-relaxed text-mist"><span className="mt-2.5 h-2 w-2 shrink-0 bg-gold" />{x}</li>)}</ul>;
  return <div className="max-w-3xl">{items.map((x, i) => x.length < 40 && !/[.:]$/.test(x) ? <h3 key={i} className="mb-2 mt-6 font-display text-2xl font-bold">{x}</h3> : <p key={i} className="mb-4 leading-relaxed text-mist">{x}</p>)}</div>;
};
// Values that start with a digit or comparison sign (<, ≤ ...) are kept left-to-right so Arabic text rules do not mirror the signs.
const vdir = (v: string) => (/^[<>≤≥~+\-\d]/.test(v) ? "ltr" : undefined);
const GLANCE = [/fixture|setting/i, /full cure/i, /temperature range, continuous/i, /tensile|breakaway|shear|viscosity|pack/i];
export default async function ProductPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Lang; const t = dict[lang]; const L = (x: string) => href(lang, x);
  const PRODUCTS = await getProducts();
  const p = PRODUCTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const q = localizeProduct(p, lang); // same shape as p, text in the page language
  const line = lineOf(p.line); const lineName = t.lines[p.line as "fast"].name;
  const related = PRODUCTS.filter((x) => x.line === p.line && x.slug !== p.slug).slice(0, 4).map((x) => localizeProduct(x, lang));
  // Pick the at-a-glance figures from the English labels, then show them in the page language (same positions).
  let glanceIdx = GLANCE.map((re) => p.specs.findIndex(([k]) => re.test(k))).filter((i) => i >= 0);
  if (glanceIdx.length < 3) glanceIdx = p.specs.slice(0, 4).map((_, i) => i);
  const glance = glanceIdx.map((i) => { const [k, v] = q.specs[i]; return [k, v.replace(/\s*\(.*\)$/, "")] as [string, string]; }); // "(typical 110)" is shown in the table, not in this short summary
  const ids = p.sections.map(([title]) => slugify(title));
  const nav: [string, string][] = [["overview", t.product.overview], ["properties", t.product.properties], ...q.sections.map(([title], i) => [ids[i], title] as [string, string])];
  return (
    <SegmentShell segment={p.segment}>
      <article className="mx-auto max-w-6xl px-6 py-8 md:py-14">
        <p className="text-sm text-mist"><a href={L("/products")} className="hover:text-ink">{t.product.all}</a> / <a href={L(`/products?segment=${p.segment}`)} className="hover:text-ink">{t.seg[p.segment as "household"].name}</a>{p.segment === "industrial" && <> / <a href={L(`/products?line=${line.id}`)} className="hover:text-ink">{lineName}</a></>}</p>
        <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
          <Gallery p={p} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-golddk">{lineName}</p>
            <h1 className="mt-2 break-words text-start font-display text-5xl font-bold leading-[0.9] sm:text-7xl md:text-9xl rtl:text-end" dir="ltr">{p.model}</h1>
            <p className="mt-3 text-xl text-mist sm:mt-4 sm:text-2xl">{q.name}</p>
            <div className="mt-6 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap"><BuyButton url={p.storeUrl} model={p.model} /><DownloadButton p={p} /></div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:mt-24 lg:grid-cols-[210px_1fr] lg:gap-12">
          <DetailNav items={nav} />
          <div className="min-w-0 space-y-12 md:space-y-16">
            <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {glance.map(([k, v]) => { const [lab, unit] = split(k); return <div key={k} className="border-s-4 border-gold ps-4"><dt className="text-xs uppercase tracking-wider text-mist">{lab}</dt><dd className="mt-1 font-display text-3xl font-bold leading-none"><span dir={vdir(v)}>{v}</span>{unit && <span dir="auto" className="ms-1 inline-block text-sm font-medium text-mist">{unit}</span>}</dd></div>; })}
            </dl>
            <Section n={1} id="overview" title={t.product.overview}><p className="max-w-3xl text-lg leading-relaxed text-mist">{q.summary}</p></Section>
            <Section n={2} id="properties" title={t.product.properties}>
              <div className="overflow-x-auto"><table className="w-full text-start text-sm">
                <thead><tr className="border-b-2 border-ink/30 text-xs uppercase tracking-wider text-mist"><th className="px-4 py-3 text-start font-semibold">{t.product.property}</th><th className="px-4 py-3 text-start font-semibold">{t.product.value}</th><th className="hidden px-4 py-3 text-start font-semibold sm:table-cell">{t.product.unit}</th></tr></thead>
                <tbody>{q.specs.map(([k, v], i) => { const [lab, unit] = split(k); return <tr key={i} className={i % 2 ? "bg-ink/[0.04]" : ""}><td className="px-3 py-3 text-mist sm:px-4">{lab}</td><td className="px-3 py-3 font-semibold sm:px-4"><span dir={vdir(v)}>{v}</span>{unit && <span dir="auto" className="ms-1 inline-block text-xs font-normal text-mist sm:hidden">{unit}</span>}</td><td className="hidden px-4 py-3 text-mist sm:table-cell"><span dir="auto" className="inline-block">{unit}</span></td></tr>; })}</tbody>
              </table></div>
              {q.notes.length > 0 && <div className="mt-6"><p className="text-xs font-semibold uppercase tracking-wider text-mist">{t.product.tests}</p><ol className="mt-2 list-decimal space-y-1 ps-5 text-xs text-mist">{q.notes.map((n, i) => <li key={i}>{n}</li>)}</ol></div>}
            </Section>
            {q.sections.map(([title, items], i) => <Section key={ids[i]} n={i + 3} id={ids[i]} title={title}>{body(kindOf(p.sections[i][0]), items)}</Section>)}
            {related.length > 0 && (
              <section className="border-t-2 border-ink/80 pt-6">
                <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.product.moreFrom} {p.segment === "household" ? t.seg.household.name : lineName}</h2>
                <ul className="mt-6 border-b border-ink/15">{related.map((r) => <li key={r.slug}><Link href={L(`/products/${r.slug}`)} className="group flex items-center gap-5 border-t border-ink/15 py-3"><span className="h-16 w-16 shrink-0"><ProductPhoto p={r} small className="h-full w-full" /></span><span className="flex-1"><span className="block text-start font-display text-2xl font-bold leading-none rtl:text-end" dir="ltr">{r.model}</span><span className="text-sm text-mist">{r.name}</span></span><span className="text-golddk transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1"><span className="arr">&rarr;</span></span></Link></li>)}</ul>
              </section>
            )}
          </div>
        </div>
      </article>
    </SegmentShell>
  );
}
