"use client";
import { useEffect } from "react";
// threshold 0: a tall product wall (20-30 items) can never be 12% visible on a phone/laptop screen, which used to leave it invisible.
// Adds ".in" to [data-reveal] / [data-stagger] elements as they scroll into view (also catches content added later, e.g. filters).
export default function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    const scan = () => document.querySelectorAll("[data-reveal]:not(.in),[data-stagger]:not(.in)").forEach((n) => io.observe(n));
    scan(); const mo = new MutationObserver(scan); mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}