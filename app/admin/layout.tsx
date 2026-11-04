import Link from "next/link";
import { cookies } from "next/headers";
import { COOKIE, verifyToken } from "@/lib/auth";
import LogoutButton from "@/components/admin/logout-button";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await verifyToken(cookies().get(COOKIE)?.value);
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex items-center gap-3"><img src="/logo-mark.png" alt="" className="h-8 w-auto" /><span className="font-display text-xl font-bold uppercase leading-none">Epobond <span className="text-[#d6262b]">Admin</span></span></Link>
          <div className="flex items-center gap-2"><Link href="/" target="_blank" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 sm:block">View website &#8599;</Link>{authed && <LogoutButton />}</div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
