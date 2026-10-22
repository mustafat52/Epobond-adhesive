"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductPhoto from "./product-photo";
import { Product, lineOf } from "@/lib/products";

const SPEED = 0.45; // cards per second, continuous (never pauses)
const W = 190, H = 250;

// Homepage range browser. Coverflow or Ring, driven by one animation loop so it glides without any stops.
// Drag to move it yourself; it carries on from wherever you let go.
export default function RangeBrowser({ items }: { items: Product[] }) {
  const n = items.length;
  const [layout, setLayout] = useState<"coverflow" | "ring">("coverflow");
  const [shown, setShown] = useState(0);
  const els = useRef<(HTMLAnchorElement | null)[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const st = useRef({ pos: 0, drag: false, lx: 0, sx: 0, sy: 0, moved: false });
  const layoutRef = useRef(layout); layoutRef.current = layout;

  useEffect(() => {
    const s = st.current; let raf = 0, last = performance.now(), vis = true, lastShown = -1;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }); if (box.current) io.observe(box.current);
    const draw = () => {
      const ring = layoutRef.current === "ring", lim = ring ? 4.2 : 6.2;
      els.current.forEach((el, i) => {
        if (!el) return;
        let o = (((i - s.pos) % n) + n) % n; if (o > n / 2) o -= n;
        const a = Math.abs(o), c = Math.max(-1, Math.min(1, o));
        el.style.transformOrigin = ring ? "50% 720px" : "50% 50%";
        el.style.transform = ring
          ? `rotate(${o * 16}deg)`
          : `translateX(${c * 175 + Math.sign(o) * Math.max(a - 1, 0) * 62}px) translateZ(${-a * 50}px) rotateY(${-c * 52}deg) scale(${1.08 - 0.16 * Math.min(a, 1)})`;
        el.style.opacity = String(Math.max(0, Math.min(1, lim - a)));
        el.style.zIndex = String(Math.round(100 - a * 10));
        el.style.pointerEvents = a > lim ? "none" : "auto";
      });
    };
    draw();
    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05); last = t;
      if (!s.drag && vis && !reduce) s.pos = (s.pos + SPEED * dt) % n;
      if (vis) draw();
      const c = Math.round(s.pos) % n; if (c !== lastShown) { lastShown = c; setShown(c); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const mv = (e: PointerEvent) => {
      if (!s.drag) return;
      const dx = e.clientX - s.lx; s.lx = e.clientX;
      if (Math.hypot(e.clientX - s.sx, e.clientY - s.sy) > 6) s.moved = true;
      s.pos = (((s.pos - dx / 150) % n) + n) % n;
    };
    const up = () => { s.drag = false; };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
  }, [n]);

  const step = (d: number) => { st.current.pos = (((Math.round(st.current.pos) + d) % n) + n) % n; };
  const cur = items[shown] ?? items[0], L = lineOf(cur.line);
  const chip = (on: boolean) => `rounded-full border px-4 py-1.5 text-sm ${on ? "border-gold bg-gold text-white" : "border-ink/20 text-mist hover:border-gold"}`;
  return (
    <div className="mt-8 rounded-3xl border border-ink/10 bg-deep/70 p-4">
      <div className="flex justify-end gap-2 px-2">
        <button className={chip(layout === "coverflow")} onClick={() => setLayout("coverflow")}>Coverflow</button>
        <button className={chip(layout === "ring")} onClick={() => setLayout("ring")}>Ring</button>
      </div>
      <div ref={box} tabIndex={0} aria-label="Product range browser" className="relative mx-auto mt-2 h-[360px] w-full cursor-grab select-none overflow-hidden outline-none active:cursor-grabbing"
        style={{ perspective: "1200px", touchAction: "pan-y" }}
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
        onPointerDown={(e) => { const s = st.current; s.drag = true; s.moved = false; s.lx = s.sx = e.clientX; s.sy = e.clientY; }}
        onClickCapture={(e) => { if (st.current.moved) { e.preventDefault(); e.stopPropagation(); st.current.moved = false; } }}>
        {items.map((p, i) => {
          const d = Math.abs(i - shown), near = Math.min(d, n - d) <= 8;
          return (
            <Link key={p.slug} href={`/products/${p.slug}`} draggable={false} aria-label={`${p.model} ${p.name}`}
              ref={(el) => { els.current[i] = el; }}
              className="absolute top-6 block rounded-2xl border border-ink/10 bg-deep p-3 text-center shadow-lg will-change-transform"
              style={{ width: W, height: H, left: `calc(50% - ${W / 2}px)`, opacity: 0 }}>
              <div className="flex justify-center" style={{ height: H - 70 }}>{near && <ProductPhoto p={p} eager className="h-full w-auto max-w-full" />}</div>
              <p className="mt-2 text-sm font-semibold text-ink">{p.model}</p>
              <p className="truncate text-xs text-mist">{p.name}</p>
            </Link>
          );
        })}
      </div>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 px-2 pb-2 text-center">
        <p className="flex items-center gap-2 text-sm text-mist"><span className="h-2 w-2 rounded-full" style={{ background: L.color }} />{L.name} · {shown + 1} / {n}</p>
        <h3 className="font-display text-3xl font-semibold">{cur.model} <span className="text-golddk">{cur.name}</span></h3>
        <p className="text-sm text-mist">{cur.summary.slice(0, 150)}{cur.summary.length > 150 ? "..." : ""}</p>
        <div className="mt-2 flex items-center gap-3">
          <button className="h-10 w-10 rounded-full border border-ink/20 hover:border-gold" onClick={() => step(-1)} aria-label="Previous">&larr;</button>
          <Link href={`/products/${cur.slug}`} className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110">View full data</Link>
          <button className="h-10 w-10 rounded-full border border-ink/20 hover:border-gold" onClick={() => step(1)} aria-label="Next">&rarr;</button>
        </div>
      </div>
    </div>
  );
}
