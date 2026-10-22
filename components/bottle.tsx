// Placeholder product art (SVG). Replace with real product PNGs / renders when the client supplies artwork.
export default function Bottle({ color, label, className = "" }: { color: string; label: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 240" className={className} role="img" aria-label={label}>
      <rect x="40" y="6" width="40" height="42" rx="8" fill={color} />
      <rect x="46" y="48" width="28" height="22" fill="#dde4f4" stroke="#14193a" strokeOpacity=".18" opacity=".9" />
      <rect x="18" y="68" width="84" height="164" rx="18" fill="#dde4f4" stroke="#14193a" strokeOpacity=".18" opacity=".92" />
      <rect x="18" y="108" width="84" height="84" fill={color} />
      <text x="60" y="156" textAnchor="middle" fontSize={label.length > 8 ? 9 : label.length > 6 ? 12 : 15} fontWeight="700" fill="#fff" fontFamily="sans-serif">{label}</text>
      <rect x="26" y="76" width="9" height="150" rx="4" fill="#fff" opacity=".35" />
    </svg>
  );
}
