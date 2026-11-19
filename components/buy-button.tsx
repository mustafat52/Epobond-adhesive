"use client";
import Magnetic from "./magnetic";
import { useLang } from "./lang-provider";
export default function BuyButton({ url, model }: { url: string; model: string }) {
  const { t, href } = useLang();
  const cls = "inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition sm:w-auto";
  if (!url || url === "#") return <Magnetic><a href={href("/contact")} className={`${cls} border border-gold/60 text-golddk hover:bg-gold hover:text-white`}>{t.product.enquire} <bdi className="ms-1.5">{model}</bdi></a></Magnetic>;
  return <Magnetic><a href={url} target="_blank" rel="noopener noreferrer" className={`${cls} bg-gold text-white hover:brightness-110`}
    onClick={() => (window as any).dataLayer?.push({ event: "buy_click", model })}>{t.product.buy}</a></Magnetic>;
}
