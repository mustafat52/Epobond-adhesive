"use client";

import * as React from "react";

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Glow colour. Use the product line's accent (e.g. blue for Fast, red for Lock). */
  spotlightColor?: string;
  /** Glow radius in px. */
  radius?: number;
};

/**
 * Card with a soft glow that follows the cursor.
 * Pure CSS variables + one pointer handler: no animation library needed,
 * and nothing runs on touch devices (no hover there).
 */
export function SpotlightCard({
  spotlightColor = "rgba(255, 255, 255, 0.12)",
  radius = 320,
  className = "",
  children,
  style,
  onPointerMove,
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      style={{ ...style, ["--spot-r" as string]: `${radius}px` }}
      className={`group relative overflow-hidden rounded-xl border border-ink/10 bg-deep shadow-sm ${className}`}
      {...props}
    >
      {/* Glow layer: fades in on hover, sits under the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(var(--spot-r) circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
