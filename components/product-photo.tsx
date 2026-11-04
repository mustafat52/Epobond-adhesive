import Bottle from "./bottle";
import { Product, lineOf } from "@/lib/products";
// Real product photo when we have one (small = lighter 560px version for lists), drawn bottle as a fallback.
export default function ProductPhoto({ p, className = "", eager = false, small = false }: { p: Product; className?: string; eager?: boolean; small?: boolean }) {
  if (p.images[0]) return <img src={small ? p.images[0].replace("/products/", "/products/sm/") : p.images[0]} alt={`${p.model} ${p.name}`} loading={eager ? "eager" : "lazy"} decoding="async" draggable={false} className={`object-contain ${className}`} />;
  return <Bottle color={lineOf(p.line).color} label={p.model} className={className} />;
}