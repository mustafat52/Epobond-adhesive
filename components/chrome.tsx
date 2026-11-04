import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { SITE } from "@/lib/products";
const NAV: [string, string][] = [["Household", "/products?segment=household"], ["Industrial", "/products?segment=industrial"], ["All products", "/products"], ["About", "/about"], ["Contact", "/contact"]];
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-teal text-ivory md:bg-teal/95 md:backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
        <Link href="/" className="flex items-center gap-2.5 font-display font-semibold text-gold sm:gap-3">
          <img src="/logo-mark.png" alt="" className="h-8 w-auto sm:h-9" />
          <span className="text-lg leading-none sm:text-2xl">{SITE.name}</span>
        </Link>
        <nav className="hidden gap-7 text-sm text-ivory/70 md:flex">{NAV.map(([l, h]) => <Link key={h} href={h} className="hover:text-gold">{l}</Link>)}</nav>
        <MobileMenu items={NAV} phone={SITE.phone} email={SITE.email} />
      </div>
      <div className="progress" />
    </header>
  );
}
export function Footer() {
  return (
    <footer className="mt-16 bg-teal pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-10 text-sm text-ivory/70 md:mt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 md:flex-row md:flex-wrap md:justify-between">
        <span>© {new Date().getFullYear()} {SITE.name}</span><span>{SITE.address}</span><span>{SITE.phone} · {SITE.email}</span>
      </div>
    </footer>
  );
}