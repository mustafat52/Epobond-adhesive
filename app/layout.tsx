import "./globals.css";
import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import { Header, Footer } from "@/components/chrome";
import ScrollReveal from "@/components/scroll-reveal";
import { SITE } from "@/lib/products";
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
export const metadata: Metadata = { title: { default: `${SITE.name}: Adhesives and Sealants`, template: `%s · ${SITE.name}` }, description: SITE.tagline };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${display.variable} ${body.variable}`}><body className="font-body"><Header /><main>{children}</main><Footer /><ScrollReveal /></body></html>);
}
