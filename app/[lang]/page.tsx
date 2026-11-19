import Link from "next/link";
import HeroGlue from "@/components/hero-glue";
import PauseOffscreen from "@/components/pause-offscreen";
import Conveyor from "@/components/conveyor";
import JobFinder from "@/components/job-finder";
import { Marquee } from "@/components/ui/marquee";
import { SITE } from "@/lib/products";
import { getProducts } from "@/lib/store";
import { cardItem } from "@/lib/localize";
import { Lang, href } from "@/lib/i18n";
import { dict } from "@/lib/dict";

// Icons only: all wording comes from lib/dict.ts so English and Arabic stay in step.
const INDUSTRY_ICONS = [
  "M4 17v-5l2-5h12l2 5v5 M4 12h16 M6 17v2 M18 17v2 M7.5 14.5h.01 M16.5 14.5h.01",
  "M3 16c0-3 1-5 3-6l2 2c2 0 3-1 3-2l7 3c2 .7 3 1.7 3 3v1H3z M3 19h18",
  "M5 4h14v16H5z M9 16l6-6 M9 11l2-2",
  "M12 4a8 8 0 100 16 8 8 0 000-16z M12 8a4 4 0 100 8 4 4 0 000-8z M12 11.6v.8",
  "M3 9h11a3 3 0 10-3-3 M3 13h15a3 3 0 11-3 3 M3 17h7",
  "M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z",
  "M12 3l8 4.5v9L12 21l-8-4.5v-9z M12 9a3 3 0 100 6 3 3 0 000-6z",
];
const PILLAR_ICONS = [
  "M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z M9 12l2 2 4-4",
  "M12 4a8 8 0 100 16 8 8 0 000-16z M12 9a3 3 0 100 6 3 3 0 000-6z M12 2v3 M12 19v3 M2 12h3 M19 12h3",
  "M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1 M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0010 18.7l1-1",
];
const eyebrow = "text-sm font-semibold uppercase tracking-[0.22em]";
const Arrow = () => <span className="arr">&rarr;</span>;

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  const t = dict[lang]; const h = t.home; const L = (p: string) => href(lang, p);
  const PRODUCTS = await getProducts();
  return (
    <>
      {/* 1. Hero (animation unchanged; copy and buttons now speak for the brand) */}
      <section className="relative flex min-h-[calc(100svh-69px)] md:min-h-[calc(100vh-76px)] items-center overflow-hidden bg-teal text-ivory" style={{ background: "radial-gradient(55% 70% at 75% 45%, rgba(214,38,43,.40) 0%, transparent 70%), linear-gradient(180deg, #17191c, #0e0f11)" }}>
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-6 py-8 md:py-[clamp(1.5rem,5vh,3.5rem)] lg:grid-cols-2">
          <div>
            <div className="mb-4 h-2 w-24 bg-gold" aria-hidden />
            <p className={`fade-up mb-4 text-xs text-ivory/60 sm:text-sm [@media(max-height:680px)]:hidden ${eyebrow}`}>{h.heroEyebrow}</p>
            <h1 className="font-display text-[3.4rem] font-bold leading-[0.86] min-[400px]:text-[4rem] sm:text-8xl lg:text-[clamp(3.6rem,12.5vh,8.6rem)]">
              {h.heroWords.map((w, i) => <span key={w} className="word" style={{ animationDelay: `${i * 130}ms` }}>{w}&nbsp;</span>)}
              <span className="word relative block w-fit" style={{ animationDelay: "400ms" }}><span className="shimmer">{h.heroEm}</span><span className="underline-sweep absolute -bottom-1 start-0 h-[8px] w-full bg-gold" /></span>
            </h1>
            <p className="fade-up mt-5 max-w-md text-base text-ivory/75 sm:mt-6 sm:text-lg lg:mt-[clamp(.9rem,3vh,2rem)]" style={{ animationDelay: "650ms" }}>{h.heroSub}</p>
            <div className="fade-up mt-6 grid gap-3 sm:flex sm:flex-wrap sm:gap-4 lg:mt-[clamp(1.1rem,4vh,2.25rem)]" style={{ animationDelay: "800ms" }}>
              <Link href={L("/products")} className="btn-glow group inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-8 py-3.5 text-base font-semibold uppercase tracking-wider text-white">{h.ctaProducts} <span className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1"><Arrow /></span></Link>
              <Link href={L("/about")} className="group inline-flex items-center justify-center gap-2 rounded-sm border border-white/30 px-8 py-3.5 text-base font-semibold uppercase tracking-wider transition hover:border-gold hover:bg-white/5">{h.ctaStory} <span className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1"><Arrow /></span></Link>
            </div>
          </div>
          <div>
            <PauseOffscreen><HeroGlue label={lang === "ar" ? "لاصق إيبوبوند سوبر جلو يصلح مقبض كوب مكسور" : undefined} /></PauseOffscreen>
            <Link href={L("/products/sgc3")} className="fade-up mx-auto mt-3 flex w-fit max-w-full items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-ivory/80 transition hover:border-gold hover:bg-white/10 sm:text-sm" style={{ animationDelay: "1000ms" }}><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{h.pill} <span className="text-gold"><Arrow /></span></Link>
          </div>
        </div>
        <div className="hazard absolute bottom-0 start-0 end-0" aria-hidden />
      </section>

      {/* 2. Industries ribbon */}
      <div className="border-b border-ink/10 pb-5 pt-6">
        <p className={`mb-3 text-center text-xs text-mist ${eyebrow}`}>{h.trusted}</p>
        <div className="font-display text-2xl text-mist"><Marquee duration={50} gap="3rem">{h.industries.map((x) => <span key={x}>{x}</span>)}</Marquee></div>
      </div>

      {/* 3. Who we are */}
      <section data-reveal className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-16 md:grid-cols-12 md:gap-14 md:pt-28">
        <div className="md:col-span-6">
          <p className={`${eyebrow} text-golddk`}>{h.whoEyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:text-7xl">{h.whoTitleA} <span className="text-golddk">{h.whoTitleB}</span></h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">{h.whoP1}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-mist">{h.whoP2}</p>
          <Link href={L("/about")} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-golddk transition-all hover:gap-4">{h.whoLink} <Arrow /></Link>
        </div>
        <figure className="relative md:col-span-6">
          <img src="/brand/epobond-building.webp" alt={h.photoAlt} width={1600} height={1067} loading="lazy" decoding="async" className="relative z-10 h-auto w-full rounded-3xl shadow-2xl" />
          <span className="absolute -bottom-3 -end-3 z-0 h-28 w-28 rounded-ee-3xl border-b-4 border-e-4 border-gold sm:h-36 sm:w-36" aria-hidden />
        </figure>
      </section>

      {/* 3b. Key facts */}
      <section data-reveal className="mx-auto max-w-6xl px-6 pt-14 md:pt-20">
        <dl data-stagger className="grid grid-cols-2 border-y border-ink/20 md:grid-cols-4">
          {h.facts.map(([v, k], i) => (
            <div key={k} className={`py-7 pe-4 ${i % 2 === 1 ? "border-s border-ink/20 ps-4" : ""} ${i > 1 ? "border-t border-ink/20 md:border-t-0" : ""} ${i > 0 ? "md:border-s md:border-ink/20 md:ps-8" : ""}`}>
              <dd className="font-display text-4xl font-bold leading-none sm:text-5xl md:text-6xl rtl:md:text-5xl">{v}</dd>
              <dt className={`mt-3 text-xs text-mist ${eyebrow}`}>{k}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* 4. What we stand for */}
      <section data-reveal className="mx-auto max-w-6xl px-6 pt-16 md:pt-28">
        <p className={`${eyebrow} text-golddk`}>{h.standEyebrow}</p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl">{h.standTitle}</h2>
        <div data-stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {h.pillars.map(([title, d], i) => (
            <div key={title} className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-deep p-7 transition duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-xl sm:p-8">
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" aria-hidden />
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal text-gold transition duration-300 group-hover:bg-gold group-hover:text-white">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={PILLAR_ICONS[i]} /></svg>
              </div>
              <h3 className="mt-7 font-display text-4xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-mist">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Industries (dark band) */}
      <section data-reveal className="mt-16 bg-teal py-16 text-ivory md:mt-28 md:py-24" style={{ background: "radial-gradient(70% 90% at 0% 100%, rgba(143,29,29,.55) 0%, transparent 65%), #17191c" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <p className={`${eyebrow} text-gold`}>{h.indEyebrow}</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl">{h.indTitle}</h2>
            </div>
            <p className="max-w-md leading-relaxed text-ivory/65">{h.indP}</p>
          </div>
          <div data-stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 lg:grid-cols-4">
            {h.industries.map((name, i) => (
              <div key={name} className="group flex min-h-[9.5rem] flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-4 transition duration-300 hover:-translate-y-1.5 hover:border-gold hover:bg-white/10 sm:min-h-[11rem] sm:p-6">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold transition duration-300 group-hover:scale-110" aria-hidden><path d={INDUSTRY_ICONS[i]} /></svg>
                <h3 className="break-words font-display text-xl font-bold leading-[1.05] min-[400px]:text-2xl sm:text-3xl">{name}</h3>
              </div>
            ))}
            <Link href={L("/products?segment=industrial")} className="group flex min-h-[9.5rem] flex-col justify-between rounded-2xl bg-gold p-4 text-white transition duration-300 hover:-translate-y-1.5 hover:brightness-110 sm:min-h-[11rem] sm:p-6">
              <span className="text-3xl transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden><Arrow /></span>
              <span className="break-words font-display text-xl font-bold leading-[1.05] min-[400px]:text-2xl sm:text-3xl">{h.indCta}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Reach: KANDEEL distribution */}
      <section data-reveal className="mx-auto max-w-6xl px-6 pt-16 md:pt-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className={`${eyebrow} text-golddk`}>{h.reachEyebrow}</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl">{h.reachTitle}</h2>
            <p className="mt-6 max-w-md leading-relaxed text-mist">{h.reachP}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a href={`tel:${SITE.phone}`} className="rounded-2xl border border-ink/15 bg-deep p-5 transition hover:border-gold"><p className={`text-xs text-mist ${eyebrow}`}>{t.footer.hotline}</p><p dir="ltr" className="mt-2 text-start font-display text-4xl font-bold rtl:text-end">{SITE.phone}</p></a>
              <a href={`tel:${SITE.techPhone}`} className="rounded-2xl border border-ink/15 bg-deep p-5 transition hover:border-gold"><p className={`text-xs text-mist ${eyebrow}`}>{t.footer.tech}</p><p dir="ltr" className="mt-2 text-start font-display text-4xl font-bold rtl:text-end">{SITE.techPhone}</p></a>
            </div>
          </div>
          <ul data-stagger>
            {h.sectors.map(([name, cities]) => (
              <li key={name} className="border-t border-ink/20 py-5">
                <h3 className="font-display text-3xl font-bold">{name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{cities}</p>
              </li>
            ))}
            <li className="border-t border-ink/20" />
          </ul>
        </div>
      </section>

      {/* 7. Hand-off to the products */}
      <JobFinder items={PRODUCTS.map((p) => cardItem(p, lang))} />
      <Conveyor products={PRODUCTS} lang={lang} />

      {/* 8. Closing call to action */}
      <section data-reveal className="mx-auto max-w-6xl px-6 pt-14 md:pt-20">
        <div className="relative overflow-hidden rounded-3xl bg-teal px-6 py-14 text-center text-white sm:px-8 md:py-20" style={{ background: "radial-gradient(60% 120% at 80% 0%, #8f1d1d, #17191c 70%)" }}>
          <h2 className="font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:text-7xl">{h.ctaTitle}</h2>
          <p className="mx-auto mt-5 max-w-md text-white/70">{h.ctaP}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href={L("/products")} className="rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white hover:brightness-110">{h.ctaBrowse}</Link>
            <Link href={L("/contact")} className="rounded-sm border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:border-gold hover:bg-white/5">{h.ctaContact}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
