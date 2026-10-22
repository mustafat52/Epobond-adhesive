import Link from "next/link";
import ProductPhoto from "./product-photo";
import { SpotlightCard } from "./ui/spotlight-card";
import { Product, lineOf } from "@/lib/products";
export default function ProductCard({ p }: { p: Product }) {
  const line = lineOf(p.line);
  return (
    <Link href={`/products/${p.slug}`} className="group block h-full transition duration-300 hover:-translate-y-1">
      <SpotlightCard spotlightColor={`${line.color}33`} className="h-full p-5">
        <div className="float-soft mx-auto h-40 w-40" style={{ animationDelay: `-${(p.slug.length * 0.9) % 5}s` }}><ProductPhoto p={p} className="h-full w-full transition duration-500 group-hover:scale-105" /></div>
        <p className="mt-4 text-xs text-mist">{line.name}</p>
        <h3 className="font-display text-2xl font-semibold">{p.model}</h3>
        <p className="mt-1 text-sm text-mist">{p.name}</p>
      </SpotlightCard>
    </Link>
  );
}
