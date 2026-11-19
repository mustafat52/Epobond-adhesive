import SegmentShell from "@/components/segment-shell";
import ProductBrowser from "@/components/product-browser";
import { LINES, SEGMENTS } from "@/lib/products";
import { getProducts } from "@/lib/store";
import { cardItem } from "@/lib/localize";
import { Lang } from "@/lib/i18n";
import { dict } from "@/lib/dict";
export const generateMetadata = ({ params }: { params: { lang: string } }) => ({ title: dict[params.lang as Lang]?.seg.all.name });
// URLs: /products (everything) · /products?segment=household · /products?segment=industrial · /products?line=fast|lock|seal|fix  (and the same under /ar)
export default async function Products({ params, searchParams }: { params: { lang: string }; searchParams: { line?: string; segment?: string } }) {
  const lang = params.lang as Lang; const t = dict[lang];
  const PRODUCTS = await getProducts();
  const L = LINES.find((l) => l.id === searchParams.line && l.segment === "industrial");
  const segId = L?.segment ?? (searchParams.line === "household" ? "household" : searchParams.segment);
  const seg = SEGMENTS.find((s) => s.id === segId); // undefined = "All products"
  const inSeg = (id: string) => PRODUCTS.filter((p) => p.segment === id).length;
  const list = PRODUCTS.filter((p) => (!seg || p.segment === seg.id) && (!L || p.line === L.id));
  // Only what the cards need goes to the browser (not the full datasheets).
  const items = list.map((p) => cardItem(p, lang));
  const title = L ? t.lines[L.id as "fast"].name : t.seg[(seg?.id ?? "all") as "all"].name;
  const desc = L ? t.lines[L.id as "fast"].desc : t.seg[(seg?.id ?? "all") as "all"].desc;
  return (
    <SegmentShell segment={seg?.id}>
      <ProductBrowser
        items={items} title={title} desc={desc}
        active={{ segment: seg?.id, line: L?.id }}
        counts={{ all: PRODUCTS.length, household: inSeg("household"), industrial: inSeg("industrial") }}
        lines={LINES.filter((l) => l.segment === "industrial").map((l) => ({ id: l.id, name: l.name, color: l.color, count: PRODUCTS.filter((p) => p.line === l.id).length }))}
      />
    </SegmentShell>
  );
}
