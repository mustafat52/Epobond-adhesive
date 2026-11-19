"use client";
import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLang } from "./lang-provider";
import { switchPath } from "@/lib/i18n";
// Switches the current page to the other language and keeps the query string (?segment=, ?line=).
const cls = "inline-flex items-center rounded-full border border-white/25 px-3.5 py-1.5 text-sm font-semibold text-ivory transition hover:border-gold hover:text-gold";
function Inner() {
  const { lang, t } = useLang();
  const path = usePathname(); const q = useSearchParams().toString();
  return <Link href={switchPath(lang, path, q ? `?${q}` : "")} hrefLang={lang === "en" ? "ar" : "en"} lang={lang === "en" ? "ar" : "en"} className={cls} aria-label={t.nav.switchLabel}>{t.nav.switchTo}</Link>;
}
export default function LangSwitch() {
  const { lang, t } = useLang();
  return <Suspense fallback={<Link href={lang === "en" ? "/ar" : "/"} className={cls}>{t.nav.switchTo}</Link>}><Inner /></Suspense>;
}
