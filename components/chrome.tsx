import Link from "next/link";
import MobileMenu from "./mobile-menu";
import LangSwitch from "./lang-switch";
import { LINES, SITE } from "@/lib/products";
import { Lang, href } from "@/lib/i18n";
import { dict } from "@/lib/dict";
export type NavItem = { label: string; href: string };
// Header: All products, About, Contact (Household / Industrial and the four industrial lines are reached from the All products page).
export function Header({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const NAV: NavItem[] = [{ label: t.nav.products, href: href(lang, "/products") }, { label: t.nav.about, href: href(lang, "/about") }, { label: t.nav.contact, href: href(lang, "/contact") }];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-teal text-ivory md:bg-teal/95 md:backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
        <Link href={href(lang, "/")} className="flex items-center gap-2.5 font-display font-semibold text-gold sm:gap-3">
          <img src="/logo-mark.png" alt="" className="h-8 w-auto sm:h-9" />
          <span className="text-lg leading-none sm:text-2xl">{t.site.name}</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden gap-8 text-sm text-ivory/70 md:flex">
            {NAV.map((n) => <Link key={n.href} href={n.href} className="hover:text-gold">{n.label}</Link>)}
          </nav>
          <LangSwitch />
          <MobileMenu items={NAV} phone={SITE.phone} email={SITE.email} />
        </div>
      </div>
      <div className="progress" />
    </header>
  );
}
export function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const col = "text-xs font-semibold uppercase tracking-[0.22em] text-ivory/45";
  const link = "block py-1.5 hover:text-gold";
  return (
    <footer className="mt-16 bg-teal text-sm text-ivory/70 md:mt-24" style={{ background: "radial-gradient(60% 100% at 100% 0%, rgba(143,29,29,.35), transparent 70%), #17191c" }}>
      <div className="hazard" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Link href={href(lang, "/")} className="flex items-center gap-3 font-display text-2xl font-semibold text-gold"><img src="/logo-mark.png" alt="" className="h-10 w-auto" />{t.site.name}</Link>
          <p className="mt-5 max-w-xs leading-relaxed">{t.footer.blurb}</p>
          <p className="mt-5 inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs text-ivory/60">{t.footer.iso}</p>
        </div>
        <div className="md:col-span-3">
          <p className={col}>{t.footer.navigation}</p>
          <nav className="mt-4">
            <Link href={href(lang, "/products")} className={link}>{t.seg.all.name}</Link>
            <Link href={href(lang, "/products?segment=household")} className={link}>{t.seg.household.name}</Link>
            <Link href={href(lang, "/products?segment=industrial")} className={link}>{t.seg.industrial.name}</Link>
            {LINES.filter((l) => l.segment === "industrial").map((l) => <Link key={l.id} href={href(lang, `/products?line=${l.id}`)} className={`${link} ps-4 text-ivory/50`}>{t.lines[l.id as "fast"].name}</Link>)}
            <Link href={href(lang, "/about")} className={link}>{t.nav.about}</Link>
            <Link href={href(lang, "/contact")} className={link}>{t.nav.contact}</Link>
          </nav>
        </div>
        <div className="md:col-span-4">
          <p className={col}>{t.footer.touch}</p>
          <div className="mt-4 space-y-3">
            <p>{t.site.address}</p>
            <p><span className="block text-xs text-ivory/45">{t.footer.hotline}</span><a href={`tel:${SITE.phone}`} dir="ltr" className="inline-block font-display text-3xl font-semibold text-ivory hover:text-gold">{SITE.phone}</a></p>
            <p><span className="block text-xs text-ivory/45">{t.footer.tech}</span><a href={`tel:${SITE.techPhone}`} dir="ltr" className="inline-block hover:text-gold">{SITE.techPhone}</a></p>
            <p><a href={`mailto:${SITE.email}`} className="hover:text-gold">{SITE.email}</a></p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
        <p className="mx-auto max-w-6xl px-6 text-xs text-ivory/45">© {new Date().getFullYear()} {t.site.name}. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
