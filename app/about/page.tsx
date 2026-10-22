import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
export const metadata = { title: "About", description: "Epobond is a chemical manufacturing company developing reliable adhesive solutions for businesses, industries and everyday consumers." };
const PILLARS = [
  ["Quality", "Every product starts with careful formulation and consistent manufacturing, so a bond made today performs like the one made last time."],
  ["Precision", "Adhesives are chosen by detail: viscosity, cure time, gap fill, temperature range. We publish that detail openly, so you can pick the right product with confidence."],
  ["Trust", "We build lasting partnerships with the customers, distributors and industries that depend on us when it matters most."],
];
const SEGMENTS = [
  ["Household", "Epoxy, epoxy putty, super glue, wood and leather adhesives and everyday repair products for homes and workshops.", "/products?segment=household"],
  ["Industrial", "Instant adhesives, threadlockers, retaining compounds, thread sealants, gasketing and UV adhesives, each backed by a full technical datasheet.", "/products?segment=industrial"],
];
export default function About() {
  return (
    <>
      <section className="bg-teal text-ivory" style={{ background: "radial-gradient(60% 90% at 80% 20%, #8f1d1d 0%, transparent 70%), linear-gradient(180deg, #17191c, #0e0f11)" }}>
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="word font-display text-5xl font-semibold leading-tight md:text-7xl">Built on Strength. <span className="text-gold">Driven by Innovation.</span></h1>
          <p className="fade-up mx-auto mt-6 max-w-2xl text-lg text-ivory/75" style={{ animationDelay: "300ms" }}>At Epobond, we believe that every strong bond begins with quality, precision, and trust.</p>
        </div>
      </section>

      <section data-reveal className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-20 md:grid-cols-5">
        <div className="space-y-5 text-lg leading-relaxed text-mist md:col-span-3">
          <h2 className="font-display text-4xl font-semibold text-ink">Who we are</h2>
          <p>We are a chemical manufacturing company committed to developing reliable adhesive solutions that meet the evolving needs of businesses, industries, and everyday consumers.</p>
          <p>Through continuous innovation, careful manufacturing, and a commitment to consistent quality, we strive to deliver products that perform when it matters most.</p>
          <p>From everyday adhesive applications to specialized bonding solutions, our focus remains the same: creating products that people can depend on, building lasting partnerships, and setting higher standards in the adhesive industry.</p>
        </div>
        <div className="flex justify-center md:col-span-2"><div className="float-soft rounded-3xl border border-ink/10 bg-white p-8 shadow-xl"><img src="/logo.png" alt="Epobond, the strongest bond" className="w-56" /></div></div>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pt-20">
        <h2 className="font-display text-4xl font-semibold">What we stand for</h2>
        <div data-stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {PILLARS.map(([t, d]) => (
            <SpotlightCard key={t} spotlightColor="#d6262b40" className="p-7"><h3 className="font-display text-3xl font-semibold text-golddk">{t}</h3><p className="mt-3 leading-relaxed text-mist">{d}</p></SpotlightCard>
          ))}
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pt-20">
        <h2 className="font-display text-4xl font-semibold">What we make</h2>
        <p className="mt-3 max-w-2xl text-mist">The needs of businesses, industries and everyday consumers keep changing, so we keep developing and refining our range to meet them. It falls into two segments.</p>
        <div data-stagger className="mt-8 grid gap-6 md:grid-cols-2">
          {SEGMENTS.map(([t, d, href]) => (
            <SpotlightCard key={t} spotlightColor="#d6262b40" className="p-8">
              <h3 className="font-display text-4xl font-semibold">{t}</h3>
              <p className="mt-3 leading-relaxed text-mist">{d}</p>
              <Link href={href} className="mt-6 inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110">Explore {t}</Link>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-4xl px-6 pt-24 text-center">
        <p className="text-sm text-golddk">Our vision</p>
        <p className="mt-4 font-display text-4xl font-semibold leading-snug md:text-5xl">To turn every bond into a promise of <span className="text-golddk">strength, reliability, and confidence.</span></p>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pt-24">
        <div className="rounded-3xl bg-teal px-8 py-14 text-center text-ivory" style={{ background: "radial-gradient(60% 120% at 80% 0%, #8f1d1d, #17191c 70%)" }}>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Epobond. Strong Bonds. <span className="text-gold">Lasting Trust.</span></h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-white hover:brightness-110">Explore our products</Link>
            <Link href="/contact" className="rounded-full border border-white/30 px-7 py-3 text-sm hover:border-gold">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
