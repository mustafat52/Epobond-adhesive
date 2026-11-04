import { NextRequest, NextResponse } from "next/server";
import { COOKIE, verifyToken } from "@/lib/auth";
// Everything under /admin and /api/admin needs the login cookie, except the login page and login endpoint.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login" || pathname === "/api/admin/login") return NextResponse.next();
  if (await verifyToken(req.cookies.get(COOKIE)?.value)) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Your session has ended. Please log in again." }, { status: 401 });
  const url = req.nextUrl.clone(); url.pathname = "/admin/login"; url.search = "";
  return NextResponse.redirect(url);
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
