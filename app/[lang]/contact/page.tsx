import { SITE } from "@/lib/products";
import { Lang } from "@/lib/i18n";
import { dict } from "@/lib/dict";
export const generateMetadata = ({ params }: { params: { lang: string } }) => ({ title: dict[params.lang as Lang]?.contact.title });
export default function Contact({ params }: { params: { lang: string } }) {
  const t = dict[params.lang as Lang];
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-display text-5xl font-semibold">{t.contact.title}</h1>
      <p className="mt-6 text-mist">{t.contact.p}</p>
      <p className="mt-6 text-xl">{t.site.address}</p>
      <p className="mt-4 text-sm text-mist">{t.footer.hotline}</p><a href={`tel:${SITE.phone}`} dir="ltr" className="inline-block text-xl hover:text-golddk">{SITE.phone}</a>
      <p className="mt-4 text-sm text-mist">{t.footer.tech}</p><a href={`tel:${SITE.techPhone}`} dir="ltr" className="inline-block text-xl hover:text-golddk">{SITE.techPhone}</a>
      <p className="mt-4 text-xl text-golddk">{SITE.email}</p>
      <p className="mt-6 text-sm text-mist">{t.contact.form}</p>
    </section>
  );
}
