import Link from "next/link";
import ProductPhoto from "./product-photo";
import PauseOffscreen from "./pause-offscreen";
import { Marquee } from "./ui/marquee";
import { Product, lineOf } from "@/lib/products";

// The range riding down a production-line conveyor. Phones load fewer, lighter images and pause the belt off-screen.
export default function Conveyor({ products }: { products: Product[] }) {
  const items = products.filter((p) => p.images.length > 0);
  return (
    <section className="mt-16 bg-teal py-12 text-ivory md:mt-24 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-5xl font-bold md:text-6xl">The full range</h2>
        <p className="mt-2 max-w-md text-ivory/65">Every product, moving down the line. Tap any one to open its datasheet.</p>
      </div>
      <PauseOffscreen className="mt-8">
        <Marquee duration={95} gap="0px">
          <div className="flex items-end">
            {items.map((p, i) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className={`group block w-44 shrink-0 px-4 text-center sm:w-60 sm:px-5 ${i >= 14 ? "max-md:hidden" : ""}`}>
                <div className="h-52 transition-transform duration-300 group-hover:-translate-y-2 sm:h-72"><ProductPhoto p={p} small className="h-full w-full md:drop-shadow-[0_22px_20px_rgba(0,0,0,.55)]" /></div>
                <div className="conveyor -mx-4 sm:-mx-5" aria-hidden />
                <p className="mt-3 font-display text-xl font-bold leading-none sm:text-2xl">{p.model}</p>
                <p className="mt-1 truncate text-xs text-ivory/55">{lineOf(p.line).name}</p>
              </Link>
            ))}
          </div>
        </Marquee>
      </PauseOffscreen>
      <div className="hazard mt-12 md:mt-14" aria-hidden />
    </section>
  );
}
