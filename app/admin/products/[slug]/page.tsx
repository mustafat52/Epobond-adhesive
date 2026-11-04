import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/product-form";
import { adminList, dbReady } from "@/lib/store";
export const dynamic = "force-dynamic";
export default async function EditProduct({ params }: { params: { slug: string } }) {
  const p = (await adminList()).products.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return <ProductForm canSave={dbReady()} init={{ slug: p.slug, model: p.model, name: p.name, line: p.line, summary: p.summary, storeUrl: p.storeUrl, draft: Boolean(p.draft), images: p.images, specs: p.specs, notes: p.notes, sections: p.sections }} />;
}
