import { NextRequest, NextResponse } from "next/server";
import { COOKIE, verifyToken } from "@/lib/auth";

// 1. /admin and /api/admin need the login cookie (except the login page and login endpoint).
// 2. Languages: Arabic lives under /ar. English has no prefix: "/products" is rewritten to "/en/products" internally,
//    and a visible "/en/..." address redirects to the clean one.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (pathname === "/admin/login" || pathname === "/api/admin/login") return NextResponse.next();
    if (await verifyToken(req.cookies.get(COOKIE)?.value)) return NextResponse.next();
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Your session has ended. Please log in again." }, { status: 401 });
    const url = req.nextUrl.clone(); url.pathname = "/admin/login"; url.search = "";
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/api/")) return NextResponse.next();
  const first = pathname.split("/")[1];
  if (first === "ar") return NextResponse.next();
  if (first === "en") { const url = req.nextUrl.clone(); url.pathname = pathname.replace(/^\/en/, "") || "/"; return NextResponse.redirect(url, 308); }
  const url = req.nextUrl.clone(); url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}
// Everything except Next.js internals and files with an extension (images, fonts, icons).
export const config = { matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"] };
