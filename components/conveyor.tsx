import Link from "next/link";
import ProductPhoto from "./product-photo";
import { Marquee } from "./ui/marquee";
import { PRODUCTS, lineOf } from "@/lib/products";

// The range riding down a production-line conveyor. Each product stands on its own length of belt, so belt and products move together.
export default function Conveyor() {
  const items = PRODUCTS.filter((p) => p.images.length > 0);
  return (
    <section className="mt-24 bg-teal py-14 text-ivory">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-5xl font-bold md:text-6xl">The full range</h2>
        <p className="mt-2 max-w-md text-ivory/65">Every product, moving down the line. Click any one to open its datasheet.</p>
      </div>
      <div className="mt-8">
        <Marquee duration={95} gap="0px">
          <div className="flex items-end">
            {items.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group block w-60 shrink-0 px-5 text-center">
                <div className="h-72 transition-transform duration-300 group-hover:-translate-y-2"><ProductPhoto p={p} className="h-full w-full drop-shadow-[0_22px_20px_rgba(0,0,0,.55)]" /></div>
                <div className="conveyor -mx-5" aria-hidden />
                <p className="mt-3 font-display text-2xl font-bold leading-none">{p.model}</p>
                <p className="mt-1 truncate text-xs text-ivory/55">{lineOf(p.line).name}</p>
              </Link>
            ))}
          </div>
        </Marquee>
      </div>
      <div className="hazard mt-14" aria-hidden />
    </section>
  );
}