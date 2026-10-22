"use client";
import { useRef } from "react";
// Button gently follows the cursor.
export default function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  };
  return <span ref={ref} onPointerMove={move} onPointerLeave={() => ref.current && (ref.current.style.transform = "")} className="inline-block transition-transform duration-150">{children}</span>;
}
