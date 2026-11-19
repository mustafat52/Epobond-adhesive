"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavItem } from "./chrome";
import { useLang } from "./lang-provider";

// Phone navigation: a clear menu button and a full-screen panel with large, easy-to-tap links.
export default function MobileMenu({ items, phone, email }: { items: NavItem[]; phone: string; email: string }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [open]);
  return (
    <div className="md:hidden">
      <button type="button" aria-label={open ? t.nav.closeMenu : t.nav.openMenu} aria-expanded={open} onClick={() => setOpen(!open)} className="relative -me-2 h-11 w-11">
        <span className={`absolute start-3 top-[17px] h-0.5 w-5 bg-ivory transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
        <span className={`absolute start-3 top-[27px] h-0.5 w-5 bg-ivory transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
      </button>
      <div className={`fixed inset-x-0 bottom-0 top-[69px] z-30 flex flex-col justify-between overflow-y-auto bg-teal px-6 pb-8 pt-4 transition-opacity duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        style={{ background: "radial-gradient(80% 50% at 90% 0%, rgba(214,38,43,.28), transparent 70%), #17191c" }}>
        <ul>
          {items.map(({ label, href }, i) => (
            <li key={href} className={`border-b border-white/10 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`} style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}>
              <Link href={href} className="flex items-center justify-between py-5 font-display text-4xl font-bold">{label}<span className="arr text-2xl text-gold">&rarr;</span></Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-sm text-ivory/65"><a href={`tel:${phone.replace(/\s/g, "")}`} dir="ltr" className="block py-1 text-start rtl:text-end">{phone}</a><a href={`mailto:${email}`} className="block py-1">{email}</a></div>
      </div>
    </div>
  );
}