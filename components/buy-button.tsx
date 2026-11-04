"use client";
import Magnetic from "./magnetic";
export default function BuyButton({ url, model }: { url: string; model: string }) {
  const cls = "inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition sm:w-auto";
  if (!url || url === "#") return <Magnetic><a href="/contact" className={`${cls} border border-gold/60 text-golddk hover:bg-gold hover:text-white`}>Enquire about {model}</a></Magnetic>;
  return <Magnetic><a href={url} target="_blank" rel="noopener noreferrer" className={`${cls} bg-gold text-white hover:brightness-110`}
    onClick={() => (window as any).dataLayer?.push({ event: "buy_click", model })}>Buy on our store</a></Magnetic>;
}