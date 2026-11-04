// Hero animation: a bottle of Epobond Lock opens, flips over, and drops of glue fall into the crack of a broken vase.
// The drops stick, the two halves slide together, a red glue seam draws itself, then it resets. SVG + CSS only.
const LEFT = "M200 330 L176 330 Q176 360 160 385 Q114 420 114 470 Q114 520 148 540 L200 540 L204 520 L194 490 L206 455 L192 420 L205 390 L194 360 Z";
const RIGHT = "M200 330 L224 330 Q224 360 240 385 Q286 420 286 470 Q286 520 252 540 L200 540 L204 520 L194 490 L206 455 L192 420 L205 390 L194 360 Z";
const SEAM = "M200 330 L194 360 L205 390 L192 420 L206 455 L194 490 L204 520 L200 540";
export default function HeroBottle() {
  return (
    <svg viewBox="0 0 400 580" role="img" aria-label="Epobond Lock glue repairing a broken vase" className="mx-auto w-full max-w-[260px] sm:max-w-[420px] md:drop-shadow-[0_30px_40px_rgba(0,0,0,.55)]">
      <defs>
        <linearGradient id="hbBody" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8f1118" /><stop offset=".35" stopColor="#e5373d" /><stop offset=".7" stopColor="#c01e25" /><stop offset="1" stopColor="#7a0e14" /></linearGradient>
        <linearGradient id="hbNozzle" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c9ccd6" /><stop offset=".4" stopColor="#ffffff" /><stop offset="1" stopColor="#b9bdc9" /></linearGradient>
        <linearGradient id="hbSteel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#cfd3d9" /><stop offset=".5" stopColor="#8d939b" /><stop offset="1" stopColor="#4f555d" /></linearGradient>
        <linearGradient id="hbGlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff6a70" /><stop offset="1" stopColor="#b3121a" /></linearGradient>
        <linearGradient id="hbPL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#b9afa0" /><stop offset=".55" stopColor="#f3eee6" /><stop offset="1" stopColor="#d6cebf" /></linearGradient>
        <linearGradient id="hbPR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#d6cebf" /><stop offset=".45" stopColor="#f3eee6" /><stop offset="1" stopColor="#b0a696" /></linearGradient>
        <radialGradient id="hbHalo"><stop offset="0" stopColor="#d6262b" stopOpacity=".55" /><stop offset="1" stopColor="#d6262b" stopOpacity="0" /></radialGradient>
        <clipPath id="hbCL"><path d={LEFT} /></clipPath>
        <clipPath id="hbCR"><path d={RIGHT} /></clipPath>
      </defs>

      <rect x="90" y="540" width="220" height="16" rx="3" fill="url(#hbSteel)" />
      <rect x="90" y="540" width="220" height="2.5" fill="#fff" opacity=".45" />
      <g className="hb-vase">
        <ellipse className="hb-glow" cx="200" cy="440" rx="125" ry="135" fill="url(#hbHalo)" />
        <g className="hb-hl">
          <path d={LEFT} fill="url(#hbPL)" />
          <g clipPath="url(#hbCL)"><rect x="100" y="452" width="120" height="9" fill="#d6262b" /><rect x="100" y="466" width="120" height="3" fill="#8a8173" opacity=".6" /></g>
        </g>
        <g className="hb-hr">
          <path d={RIGHT} fill="url(#hbPR)" />
          <g clipPath="url(#hbCR)"><rect x="180" y="452" width="120" height="9" fill="#d6262b" /><rect x="180" y="466" width="120" height="3" fill="#8a8173" opacity=".6" /></g>
        </g>
        <path className="hb-seam" d={SEAM} pathLength={1} fill="none" stroke="#d6262b" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse className="hb-bead" cx="200" cy="337" rx="15" ry="7" fill="url(#hbGlue)" />
      </g>

      <g className="hb-bottle">
        <g transform="translate(140,45)">
          <path d="M50 20 L46 72 L74 72 L70 20 Z" fill="url(#hbNozzle)" />
          <ellipse cx="60" cy="21" rx="5" ry="2.6" fill="#2a2c31" />
          <g className="hb-cap"><path d="M55.5 0 L64.5 0 L70.5 22 L49.5 22 Z" fill="url(#hbNozzle)" /></g>
          <path d="M40 70 Q12 78 12 104 L12 190 Q12 210 34 210 L86 210 Q108 210 108 190 L108 104 Q108 78 80 70 Z" fill="url(#hbBody)" />
          <rect x="18" y="98" width="7" height="96" rx="3.5" fill="#fff" opacity=".28" />
          <rect x="22" y="104" width="76" height="34" rx="6" fill="#111317" />
          <text x="60" y="125" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">EPOBOND<tspan fontSize="8" fontWeight="500" fill="#c9ccd2">-LOCK</tspan></text>
          <rect x="22" y="140" width="76" height="12" fill="#d8dbe0" />
          <text x="60" y="149.5" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#16181c" fontFamily="Arial, sans-serif">THREADLOCKER</text>
          <rect x="34" y="158" width="52" height="34" rx="7" fill="#fff" />
          <path d="M48 175 h24 M60 165 v20" stroke="#a3151b" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </g>

      {[1, 2, 3, 4].map((n) => <path key={n} className={`hb-drop hb-d${n}`} d="M200 236 C206.5 246 209.5 254 200 262 C190.5 254 193.5 246 200 236Z" fill="url(#hbGlue)" />)}
    </svg>
  );
}