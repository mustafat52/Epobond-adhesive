import Bottle from "./bottle";
import { Product, lineOf } from "@/lib/products";
// Real product photo when we have one, drawn bottle as a fallback.
export default function ProductPhoto({ p, className = "", eager = false }: { p: Product; className?: string; eager?: boolean }) {
  if (p.images[0]) return <img src={p.images[0]} alt={`${p.model} ${p.name}`} loading={eager ? "eager" : "lazy"} draggable={false} className={`rounded-lg object-contain ${className}`} />;
  return <Bottle color={lineOf(p.line).color} label={p.model} className={className} />;
}
