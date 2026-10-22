import Link from "next/link";
import SegmentShell from "@/components/segment-shell";
import ProductWall from "@/components/product-wall";
import { LINES, PRODUCTS, SEGMENTS } from "@/lib/products";
export const metadata = { title: "Products" };
export default function Products({ searchParams }: { searchParams: { line?: string; segment?: string } }) {
  const L = LINES.find((l) => l.id === searchParams.line);
  const seg = SEGMENTS.find((s) => s.id === (L?.segment ?? searchParams.segment)) ?? SEGMENTS[1];
  const lines = LINES.filter((l) => l.segment === seg.id);
  const list = PRODUCTS.filter((p) => p.segment === seg.id && (!L || p.line === L.id));
  const tab = (on: boolean) => `border-b-2 pb-2 text-sm font-semibold uppercase tracking-wider transition ${on ? "border-gold text-ink" : "border-transparent text-mist hover:text-ink"}`;
  return (
    <SegmentShell segment={seg.id}>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-golddk">{list.length} products</p>
            <h1 className="font-display text-6xl font-bold leading-none md:text-8xl">{L ? L.name : seg.name}</h1>
          </div>
          <div className="flex gap-7">{SEGMENTS.map((s) => <Link key={s.id} href={`/products?segment=${s.id}`} className={tab(s.id === seg.id)}>{s.name}</Link>)}</div>
        </div>
        <p className="mt-5 max-w-2xl text-mist">{L ? L.desc : seg.desc}</p>
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 border-b border-ink/15">
          <Link href={`/products?segment=${seg.id}`} className={tab(!L)}>All {seg.name}</Link>
          {lines.map((l) => <Link key={l.id} href={`/products?line=${l.id}`} className={tab(L?.id === l.id)}>{l.name}</Link>)}
        </div>
        <ProductWall key={L?.id ?? seg.id} items={list} />
      </section>
    </SegmentShell>
  );
}