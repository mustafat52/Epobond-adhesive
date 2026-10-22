import * as React from "react";

type MarqueeProps = {
  children: React.ReactNode;
  /** Seconds for one full loop. Higher = slower. */
  duration?: number;
  /** Scroll direction on screen. */
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  /** Space between items. */
  gap?: string;
  className?: string;
};

/**
 * Infinite horizontal scroller (logos, product-line badges, testimonials).
 * CSS-only: no JS, no layout work per frame.
 * - Content is rendered twice; the copy is hidden from screen readers.
 * - The track is forced to dir="ltr" so the loop maths is identical in
 *   English and Arabic. Give individual items their own dir if needed.
 * - With "reduce motion" on, it stops and becomes a normal scrollable row.
 */
export function Marquee({
  children,
  duration = 40,
  direction = "left",
  pauseOnHover = true,
  gap = "2rem",
  className = "",
}: MarqueeProps) {
  return (
    <div
      dir="ltr"
      className={`marquee-root overflow-hidden ${className}`}
      data-pause={pauseOnHover}
      style={
        {
          "--marquee-duration": `${duration}s`,
          "--marquee-gap": gap,
          "--marquee-direction": direction === "left" ? "normal" : "reverse",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        } as React.CSSProperties
      }
    >
      <div className="marquee-track flex w-max">
        <div className="flex shrink-0 items-center" style={{ gap: gap, paddingRight: gap }}>
          {children}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 items-center"
          style={{ gap: gap, paddingRight: gap }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
