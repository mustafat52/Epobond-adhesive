"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductPhoto from "./product-photo";
import { Product } from "@/lib/products";

const SPEED = 12; // degrees per second (was about 18). Lower = slower.

// 3D showcase. "barrel": cards stand in a ring around a vertical axis (big ranges split into stacked rings).
// "sphere": cards cover a globe, sized so they never overlap or clip. Plain CSS 3D, no WebGL, no extra libraries.
export default function Showcase3D({ items, variant = "barrel" }: { items: Product[]; variant?: "barrel" | "sphere" }) {
  const sphere = variant === "sphere";
  const n = items.length;
  const rows = n > 14 ? Math.ceil(n / 12) : 1, c = Math.ceil(n / rows);
  const [small, setSmall] = useState(false);
  const box = useRef<HTMLDivElement>(null), stage = useRef<HTMLDivElement>(null);
  const st = useRef({ y: 0, x: -8, vy: SPEED, drag: false, moved: false, lx: 0, ly: 0, sx: 0, sy: 0 });

  useEffect(() => {
    const r = st.current; let raf = 0, vis = true, last = performance.now();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fit = () => setSmall(window.innerWidth < 640); fit(); window.addEventListener("resize", fit);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }); if (box.current) io.observe(box.current);
    const mv = (e: PointerEvent) => {
      if (!r.drag) return;
      const dx = e.clientX - r.lx, dy = e.clientY - r.ly; r.lx = e.clientX; r.ly = e.clientY;
      if (Math.hypot(e.clientX - r.sx, e.clientY - r.sy) > 6) r.moved = true;
      r.y += dx * 0.4; r.vy = Math.max(-300, Math.min(300, dx * 24)); r.x = Math.max(-30, Math.min(25, r.x - dy * 0.2));
    };
    const up = () => { r.drag = false; };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
    const tick = (t: number) => {
      const el = stage.current; if (!el) return;
      const dt = Math.min((t - last) / 1000, 0.05); last = t;
      if (vis) { if (!r.drag) { r.y += r.vy * dt; r.vy += (SPEED - r.vy) * Math.min(1, dt * 2); } el.style.transform = `rotateX(${r.x}deg) rotateY(${r.y}deg)`; }
      raf = requestAnimationFrame(tick);
    };
    if (reduce) { if (stage.current) stage.current.style.transform = `rotateX(${r.x}deg)`; } else raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", fit); window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
  }, []);

  const k = small ? 0.7 : 1, gap = 14 * k;
  const W = sphere ? 92 * k : Math.min(140 * k, ((2 * Math.PI * 240 * k) / c) * 0.92), H = W * 1.55;
  const R = sphere ? Math.sqrt((n * W * H) / (0.55 * 4 * Math.PI)) : Math.max((W * 1.06) / (2 * Math.tan(Math.PI / c)), 140 * k);
  const boxH = sphere ? 2 * R + H * 1.3 + 70 : rows * (H + gap) + 150 * k + 60;
  const place = (i: number) => {
    if (sphere) {
      const lat = 90 - (Math.acos(1 - (2 * (i + 0.5)) / n) * 180) / Math.PI, az = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      return `rotateY(${az}rad) rotateX(${lat}deg) translateZ(${R}px)`;
    }
    const row = Math.floor(i / c), j = i % c;
    const a = j * (360 / c) + (row % 2) * (180 / c), y = (row - (rows - 1) / 2) * (H + gap);
    return `rotateY(${a}deg) translateY(${y}px) translateZ(${R}px)`;
  };
  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl p-5 text-ivory" style={{ background: "radial-gradient(70% 90% at 50% 40%, #7d1a1d 0%, #1d1f23 55%, #0e0f11 100%)" }}>
      <div className="relative z-10 px-1">
        <p className="font-display text-2xl font-semibold">{n} products</p>
        <p className="text-sm text-ivory/60">{sphere ? "Drag to spin the sphere" : "Drag to turn the barrel"} · click a product to open it</p>
      </div>
      <div ref={box} className="relative mx-auto w-full max-w-4xl cursor-grab select-none active:cursor-grabbing"
        style={{ perspective: "1400px", touchAction: "pan-y", height: boxH }}
        onPointerDown={(e) => { const r = st.current; r.drag = true; r.moved = false; r.lx = r.sx = e.clientX; r.ly = r.sy = e.clientY; }}
        onClickCapture={(e) => { if (st.current.moved) { e.preventDefault(); e.stopPropagation(); st.current.moved = false; } }}>
        <div ref={stage} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
          {items.map((p, i) => (
            <Link key={p.slug} href={`/products/${p.slug}`} draggable={false}
              className="absolute block rounded-xl bg-white p-2 text-center shadow-2xl"
              style={{ width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2, transform: place(i), backfaceVisibility: "hidden" }}>
              <div className="flex justify-center" style={{ height: H - 40 * k }}><ProductPhoto p={p} className="h-full w-full" /></div>
              <p className="mt-1 truncate text-[11px] font-semibold text-onwhite">{p.model}</p>
              {W > 100 && <p className="truncate text-[9px] text-neutral-500">{p.name}</p>}
            </Link>
          ))}
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute bottom-4 left-1/2 h-10 w-2/3 -translate-x-1/2 rounded-[50%] bg-black/40 blur-2xl" />
    </div>
  );
}
