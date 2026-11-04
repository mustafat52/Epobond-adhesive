import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/store";
export const dynamic = "force-dynamic";
const TYPES: Record<string, string> = { "image/webp": "webp", "image/png": "png", "image/jpeg": "jpg" };
export async function POST(req: Request) {
  try {
    const file = (await req.formData()).get("file");
    if (!(file instanceof File)) throw new Error("No photo was received.");
    const ext = TYPES[file.type]; if (!ext) throw new Error("Please upload a PNG, JPG or WebP photo.");
    if (file.size > 6 * 1024 * 1024) throw new Error("That photo is too large. Please use one under 6 MB.");
    return NextResponse.json({ url: await uploadImage(Buffer.from(await file.arrayBuffer()), ext, file.type) });
  } catch (e: any) { return NextResponse.json({ error: e.message || "Upload failed." }, { status: 400 }); }
}
