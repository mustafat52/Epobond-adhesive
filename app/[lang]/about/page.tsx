import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Lang, href } from "@/lib/i18n";
import { dict } from "@/lib/dict";
export const generateMetadata = ({ params }: { params: { lang: string } }) => { const a = dict[params.lang as Lang]?.about; return { title: a?.title, description: a?.desc }; };
export default function About({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang; const t = dict[lang]; const a = t.about; const L = (p: string) => href(lang, p);
  const SEGS: [string, string, string][] = [[t.seg.household.name, a.householdP, L("/products?segment=household")], [t.seg.industrial.name, a.industrialP, L("/products?segment=industrial")]];
  return (
    <>
      <section className="bg-teal text-ivory" style={{ background: "radial-gradient(60% 90% at 80% 20%, #8f1d1d 0%, transparent 70%), linear-gradient(180deg, #17191c, #0e0f11)" }}>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24 text-center">
          <h1 className="word font-display text-5xl font-semibold leading-tight md:text-7xl">{a.h1A} <span className="text-gold">{a.h1B}</span></h1>
          <p className="fade-up mx-auto mt-6 max-w-2xl text-lg text-ivory/75" style={{ animationDelay: "300ms" }}>{a.sub}</p>
        </div>
      </section>

      <section data-reveal className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-14 md:pt-20 md:grid-cols-5">
        <div className="space-y-5 text-lg leading-relaxed text-mist md:col-span-3">
          <h2 className="font-display text-4xl font-semibold text-ink">{a.whoH}</h2>
          {a.who.map((x) => <p key={x}>{x}</p>)}
        </div>
        <div className="flex justify-center md:col-span-2"><div className="float-soft rounded-3xl border border-ink/10 bg-white p-8 shadow-xl"><img src="/logo.png" alt={a.logoAlt} className="w-56" /></div></div>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pt-14 md:pt-20">
        <h2 className="font-display text-4xl font-semibold">{a.standH}</h2>
        <div data-stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {a.pillars.map(([title, d]) => (
            <SpotlightCard key={title} spotlightColor="#d6262b40" className="p-7"><h3 className="font-display text-3xl font-semibold text-golddk">{title}</h3><p className="mt-3 leading-relaxed text-mist">{d}</p></SpotlightCard>
          ))}
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pt-14 md:pt-20">
        <h2 className="font-display text-4xl font-semibold">{a.makeH}</h2>
        <p className="mt-3 max-w-2xl text-mist">{a.makeP}</p>
        <div data-stagger className="mt-8 grid gap-6 md:grid-cols-2">
          {SEGS.map(([title, d, to]) => (
            <SpotlightCard key={title} spotlightColor="#d6262b40" className="p-8">
              <h3 className="font-display text-4xl font-semibold">{title}</h3>
              <p className="mt-3 leading-relaxed text-mist">{d}</p>
              <Link href={to} className="mt-6 inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110">{a.explore} {title}</Link>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-4xl px-6 pt-16 md:pt-24 text-center">
        <p className="text-sm text-golddk">{a.visionLabel}</p>
        <p className="mt-4 font-display text-4xl font-semibold leading-snug md:text-5xl">{a.visionA} <span className="text-golddk">{a.visionB}</span></p>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <div className="rounded-3xl bg-teal px-8 py-14 text-center text-ivory" style={{ background: "radial-gradient(60% 120% at 80% 0%, #8f1d1d, #17191c 70%)" }}>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">{a.ctaA} <span className="text-gold">{a.ctaB}</span></h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={L("/products")} className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-white hover:brightness-110">{a.ctaProducts}</Link>
            <Link href={L("/contact")} className="rounded-full border border-white/30 px-7 py-3 text-sm hover:border-gold">{a.ctaContact}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
