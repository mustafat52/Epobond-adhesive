"use client";
import { useEffect, useRef } from "react";
// Pauses every CSS animation inside while the block is off-screen, which saves battery and keeps scrolling smooth on phones.
export default function PauseOffscreen({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { el.dataset.paused = String(!e.isIntersecting); }, { rootMargin: "100px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}