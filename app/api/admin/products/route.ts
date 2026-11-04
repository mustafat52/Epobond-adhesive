import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { createProduct } from "@/lib/store";
import { parseProduct } from "@/lib/validate";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const p = await createProduct(parseProduct(await req.json()));
    revalidateTag("products"); revalidatePath("/", "layout");
    return NextResponse.json({ product: p });
  } catch (e: any) { return NextResponse.json({ error: e.message || "Could not save." }, { status: 400 }); }
}
