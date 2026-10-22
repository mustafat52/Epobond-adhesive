import { SITE } from "@/lib/products";
export const metadata = { title: "Contact" };
export default function Contact() {
  return (<section className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-5xl font-semibold">Contact</h1>
    <p className="mt-6 text-mist">Questions about a product or an order? Reach us directly.</p>
    <p className="mt-6 text-xl">{SITE.address}</p><p className="mt-2 text-xl">{SITE.phone}</p><p className="text-xl text-golddk">{SITE.email}</p>
    <p className="mt-6 text-sm text-mist">Enquiry form to be connected once the client confirms where enquiries should go.</p></section>);
}
