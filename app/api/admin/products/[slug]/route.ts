import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { deleteProduct, updateProduct } from "@/lib/store";
import { parseProduct } from "@/lib/validate";
export const dynamic = "force-dynamic";
const done = () => { revalidateTag("products"); revalidatePath("/", "layout"); };
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try { const p = await updateProduct(params.slug, parseProduct(await req.json())); done(); return NextResponse.json({ product: p }); }
  catch (e: any) { return NextResponse.json({ error: e.message || "Could not save." }, { status: 400 }); }
}
export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  try { await deleteProduct(params.slug); done(); return NextResponse.json({ ok: true }); }
  catch (e: any) { return NextResponse.json({ error: e.message || "Could not delete." }, { status: 400 }); }
}
