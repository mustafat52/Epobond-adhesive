import "../globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/chrome";
import ScrollReveal from "@/components/scroll-reveal";
import { LangProvider } from "@/components/lang-provider";
import { display, body, arDisplay, arBody } from "@/lib/fonts";
import { LOCALES, isLang, dirOf } from "@/lib/i18n";
import { dict } from "@/lib/dict";
// Public site layout. English is served at "/" and Arabic at "/ar" (middleware.ts rewrites "/" to "/en").
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#17191c" };
export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLang(params.lang)) return {};
  const t = dict[params.lang].site;
  return { title: { default: `${t.name}: ${t.metaTitle}`, template: `%s · ${t.name}` }, description: t.metaDesc, alternates: { languages: { en: "/", ar: "/ar" } } };
}
export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  if (!isLang(params.lang)) notFound();
  const lang = params.lang;
  const fonts = lang === "ar" ? `${display.variable} ${body.variable} ${arDisplay.variable} ${arBody.variable}` : `${display.variable} ${body.variable}`;
  return (
    <html lang={lang} dir={dirOf(lang)} className={fonts}>
      <body className="font-body">
        <LangProvider lang={lang}><Header lang={lang} /><main>{children}</main><Footer lang={lang} /></LangProvider>
        <ScrollReveal />
      </body>
    </html>
  );
}
