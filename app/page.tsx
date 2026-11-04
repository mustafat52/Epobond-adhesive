import Link from "next/link";
import ProductPhoto from "@/components/product-photo";
import HeroBottle from "@/components/hero-bottle";
import PauseOffscreen from "@/components/pause-offscreen";
import Conveyor from "@/components/conveyor";
import Segments from "@/components/segments";
import NeedFinder from "@/components/need-finder";
import Steps from "@/components/steps";
import DownloadButton from "@/components/download-button";
import Tilt from "@/components/tilt";
import { Marquee } from "@/components/ui/marquee";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { LINES, SEGMENTS, SITE } from "@/lib/products";
import { getProducts } from "@/lib/store";
const FAQ: [string, string][] = [
  ["How do I find the right product?", "Start with your segment, Household or Industrial, then open a product line. Each line has a comparison table, and every product page lists its full properties, applications and directions. If you are still unsure, contact our team."],
  ["Can I save a product's information?", "Yes. Every product page has a Download datasheet button that creates a PDF with the full details and photo."],
  ["How do I buy?", "Each product page has a Buy button that takes you to the product on our online store. If a product is not listed there yet, the button becomes an enquiry link."],
  ["Do you supply both homes and industry?", "Yes. The range covers everyday household adhesives and specialised industrial products, from epoxy and super glue to threadlockers, sealants and UV adhesives."],
];
export default async function Home() {
  const PRODUCTS = await getProducts();
  const spot = PRODUCTS.find((p) => p.model === "CX-406") ?? PRODUCTS.find((p) => p.images.length > 0) ?? PRODUCTS[0];
  return (
    <>
      <section className="relative flex min-h-[calc(100svh-69px)] md:min-h-[calc(100vh-76px)] items-center overflow-hidden bg-teal text-ivory" style={{ background: "radial-gradient(55% 70% at 75% 45%, rgba(214,38,43,.40) 0%, transparent 70%), linear-gradient(180deg, #17191c, #0e0f11)" }}>
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-6 py-10 md:py-14 lg:grid-cols-2">
          <div>
            <div className="mb-6 h-2 w-24 bg-gold" aria-hidden />
            <h1 className="font-display text-[3.4rem] font-bold leading-[0.86] min-[400px]:text-[4rem] sm:text-8xl lg:text-[8.6rem]">
              {["Every", "bond,"].map((w, i) => <span key={w} className="word" style={{ animationDelay: `${i * 130}ms` }}>{w}&nbsp;</span>)}
              <span className="word relative block w-fit" style={{ animationDelay: "400ms" }}><span className="shimmer">specified.</span><span className="underline-sweep absolute -bottom-1 left-0 h-[8px] w-full bg-gold" /></span>
            </h1>
            <p className="fade-up mt-6 max-w-md text-base text-ivory/75 sm:mt-8 sm:text-lg" style={{ animationDelay: "650ms" }}>{SITE.tagline}</p>
            <div className="fade-up mt-8 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4" style={{ animationDelay: "800ms" }}>
              <Link href="/products?segment=industrial" className="btn-glow group inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-8 py-4 text-base font-semibold uppercase tracking-wider text-white">Industrial range <span className="transition group-hover:translate-x-1">&rarr;</span></Link>
              <Link href="/products?segment=household" className="group inline-flex items-center justify-center gap-2 rounded-sm border border-white/30 px-8 py-4 text-base font-semibold uppercase tracking-wider transition hover:border-gold hover:bg-white/5">Household range <span className="transition group-hover:translate-x-1">&rarr;</span></Link>
            </div>
          </div>
          <PauseOffscreen><HeroBottle /></PauseOffscreen>
        </div>
        <div className="hazard absolute bottom-0 left-0 right-0" aria-hidden />
      </section>
      <div className="border-y border-ink/10 py-5 font-display text-2xl text-mist">
        <Marquee duration={50} gap="3rem">{["Epoxy", "Super glue", "Epoxy putty", "Instant adhesives", "Threadlockers", "Retaining compounds", "Thread sealants", "Gasketing", "UV adhesives"].map((t) => <span key={t}>{t}</span>)}</Marquee>
      </div>
      <Segments products={PRODUCTS} />
      <NeedFinder products={PRODUCTS} />
      <Conveyor products={PRODUCTS} />
      
      {spot && (
      <section data-reveal className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Tilt><div className="float-soft flex justify-center py-6"><ProductPhoto p={spot} eager className="h-72 w-72 sm:h-96 sm:w-96 md:drop-shadow-2xl" /></div></Tilt>
          <div>
            <h2 className="font-display text-4xl font-semibold">Every detail, on every product</h2>
            <p className="mt-3 text-mist">Properties, cure behaviour, directions and storage, laid out clearly. Here is {spot.model} as an example.</p>
            <dl className="mt-6 text-sm">{spot.specs.slice(0, 6).map(([k, v], i) => <div key={i} className="flex justify-between gap-4 border-b border-ink/10 py-2.5"><dt className="text-mist">{k}</dt><dd className="text-right font-medium">{v}</dd></div>)}</dl>
            <div className="mt-6 flex flex-wrap gap-3"><Link href={`/products/${spot.slug}`} className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white hover:brightness-110">Open {spot.model}</Link><DownloadButton p={spot} /></div>
          </div>
        </div>
      </section>
      )}
      <section data-reveal className="mx-auto max-w-6xl px-6 pt-14 md:pt-20">
        <div data-stagger className="grid grid-cols-2 gap-6 border-y border-ink/10 py-10 text-center md:grid-cols-4">
          {[[String(PRODUCTS.length), "products"], [String(LINES.length), "product lines"], [String(SEGMENTS.length), "segments"], ["PDF", "datasheet for every product"]].map(([n, l]) => (
            <div key={l}><p className="font-display text-5xl font-semibold text-golddk">{n}</p><p className="mt-1 text-sm text-mist">{l}</p></div>
          ))}
        </div>
      </section>
      <Steps product={spot} />
      <section data-reveal className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-16 md:pt-24 md:grid-cols-5">
        <div className="md:col-span-3">
          <h2 className="font-display text-4xl font-semibold">Built on Strength. <span className="text-golddk">Driven by Innovation.</span></h2>
          <p className="mt-4 leading-relaxed text-mist">At Epobond, we believe that every strong bond begins with quality, precision, and trust. We are a chemical manufacturing company committed to developing reliable adhesive solutions for businesses, industries and everyday consumers.</p>
          <Link href="/about" className="mt-6 inline-block rounded-full border border-ink/25 px-6 py-3 text-sm hover:border-gold">Read our story</Link>
        </div>
        <div className="flex justify-center md:col-span-2"><div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-xl"><img src="/logo.png" alt="Epobond, the strongest bond" className="w-48" /></div></div>
      </section>
      <section data-reveal className="mx-auto max-w-3xl px-6 pt-16 md:pt-24">
        <h2 className="text-center font-display text-4xl font-semibold">Questions, answered</h2>
        <div className="mt-8 space-y-3">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group rounded-2xl border border-ink/10 bg-deep p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-semibold">{q}<span className="text-2xl text-golddk transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 leading-relaxed text-mist">{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section data-reveal className="mx-auto max-w-6xl px-6 pt-14 md:pt-20">
        <div className="relative overflow-hidden rounded-3xl bg-teal px-6 py-12 sm:px-8 sm:py-14 text-center text-white md:py-16" style={{ background: "radial-gradient(60% 120% at 80% 0%, #8f1d1d, #17191c 70%)" }}>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Not sure which one you need?</h2>
          <p className="mx-auto mt-4 max-w-md text-white/70">Tell us what you are bonding or sealing and we will point you to the right product.</p>
          <Link href="/contact" className="mt-8 inline-block rounded-full bg-gold px-7 py-3 text-sm font-semibold text-white hover:brightness-110">Talk to our team</Link>
        </div>
      </section>
    </>
  );
}
