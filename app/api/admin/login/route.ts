import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { COOKIE, adminPassword, makeToken } from "@/lib/auth";
export const dynamic = "force-dynamic";
const h = (s: string) => createHash("sha256").update(s).digest();
export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const real = adminPassword();
  if (!real || !process.env.ADMIN_SECRET && process.env.NODE_ENV === "production") return NextResponse.json({ error: "The admin login is not set up yet. Set ADMIN_PASSWORD and ADMIN_SECRET on the server." }, { status: 500 });
  if (!timingSafeEqual(h(String(password ?? "")), h(real))) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "That password is not correct." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await makeToken(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 14 * 24 * 3600 });
  return res;
}
