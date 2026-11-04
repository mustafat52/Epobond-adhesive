"use client";
import { useEffect, useRef, useState } from "react";
// Datasheet contents. Desktop: sticky side list. Phone: a sticky tab strip under the header. Both follow the section you are reading.
export default function DetailNav({ items }: { items: [string, string][] }) {
  const [active, setActive] = useState(items[0][0]);
  const strip = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-20% 0px -70% 0px" });
    items.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items.length]);
  useEffect(() => {
    const el = strip.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (el && strip.current) strip.current.scrollTo({ left: el.offsetLeft - 24, behavior: "smooth" });
  }, [active]);
  return (
    <>
      <div ref={strip} className="no-scrollbar sticky top-[69px] z-20 -mx-6 flex overflow-x-auto border-b border-ink/15 bg-paper px-6 lg:hidden">
        {items.map(([id, label]) => <a key={id} data-id={id} href={`#${id}`} className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider transition ${active === id ? "border-gold text-ink" : "border-transparent text-mist"}`}>{label}</a>)}
      </div>
      <nav aria-label="Datasheet sections" className="hidden lg:block">
        <ul className="sticky top-28 border-l border-ink/20">
          {items.map(([id, label], k) => (
            <li key={id}><a href={`#${id}`} className={`-ml-px block border-l-2 py-2 pl-4 text-sm transition ${active === id ? "border-gold font-semibold text-ink" : "border-transparent text-mist hover:text-ink"}`}><span className="mr-2 text-xs tabular-nums text-golddk">{String(k + 1).padStart(2, "0")}</span>{label}</a></li>
          ))}
        </ul>
      </nav>
    </>
  );
}