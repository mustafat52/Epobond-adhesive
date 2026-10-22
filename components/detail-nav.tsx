"use client";
import { useEffect, useState } from "react";
// Sticky contents list for the datasheet; highlights the section you are reading.
export default function DetailNav({ items }: { items: [string, string][] }) {
  const [active, setActive] = useState(items[0][0]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-15% 0px -75% 0px" });
    items.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items.length]);
  return (
    <nav aria-label="Datasheet sections" className="hidden lg:block">
      <ul className="sticky top-28 border-l border-ink/20">
        {items.map(([id, label], k) => (
          <li key={id}><a href={`#${id}`} className={`-ml-px block border-l-2 py-2 pl-4 text-sm transition ${active === id ? "border-gold font-semibold text-ink" : "border-transparent text-mist hover:text-ink"}`}><span className="mr-2 text-xs tabular-nums text-golddk">{String(k + 1).padStart(2, "0")}</span>{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}