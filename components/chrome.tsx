import Link from "next/link";
import { SITE } from "@/lib/products";
const NAV = [["Household", "/products?segment=household"], ["Industrial", "/products?segment=industrial"], ["All products", "/products"], ["About", "/about"], ["Contact", "/contact"]];
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-teal/95 text-ivory backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 font-display text-2xl font-semibold text-gold"><img src="/logo-mark.png" alt="" className="h-9 w-auto" />{SITE.name}</Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ivory/70 sm:gap-7 sm:text-sm">{NAV.map(([l, h]) => <Link key={h} href={h} className="hover:text-gold">{l}</Link>)}</nav>
      </div>
      <div className="progress" />
    </header>
  );
}
export function Footer() {
  return (
    <footer className="mt-24 bg-teal py-10 text-sm text-ivory/70">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-6">
        <span>© {new Date().getFullYear()} {SITE.name}</span><span>{SITE.address} · {SITE.phone} · {SITE.email}</span>
      </div>
    </footer>
  );
}
