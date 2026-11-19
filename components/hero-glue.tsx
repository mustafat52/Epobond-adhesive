// Hero animation: the EPOBOND Super Glue ("Al-Sarookh") tube fixes a snapped mug handle.
// Two drops fall onto the break, the handle snaps back, a red glue seam draws itself, the mug hops, then coffee steam rises.
// SVG + CSS only. Without motion (prefers-reduced-motion) it shows the finished, repaired scene.
const CSS = `
.hg-float,.hg-glow,.hg-scene,.hg-mug,.hg-tube,.hg-handle,.hg-drop,.hg-ring,.hg-spark,.hg-steam{transform-box:view-box}
.hg-seam{stroke-dasharray:1;stroke-dashoffset:0}
.hg-drop,.hg-ring,.hg-spark{opacity:0}
.hg-steam{opacity:.5}
.hg-handle{transform-origin:280px 412px}
.hg-ring{transform-origin:300px 412px}
.hg-glow{transform-origin:240px 400px}
.hg-spark{transform-box:fill-box;transform-origin:center}
@media (prefers-reduced-motion:no-preference){
.hg-float{animation:hgFloat 7s ease-in-out infinite}
.hg-glow{animation:hgGlow 11s ease-in-out infinite}
.hg-scene{animation:hgScene 11s linear infinite}
.hg-mug{animation:hgMug 11s ease-in-out infinite}
.hg-tube{animation:hgTube 11s ease-in-out infinite}
.hg-handle{animation:hgHandle 11s linear infinite}
.hg-seam{animation:hgSeam 11s ease-in-out infinite}
.hg-d1{transform-origin:272px 276px;animation:hgDrop 11s ease-in infinite}
.hg-d2{transform-origin:272px 276px;animation:hgDrop2 11s ease-in infinite}
.hg-ring{animation:hgRing 11s ease-out infinite}
.hg-spark{animation:hgSpark 11s ease-out infinite}
.hg-s1{animation:hgSteam1 11s ease-in-out infinite}
.hg-s2{animation:hgSteam2 11s ease-in-out infinite}
.hg-s3{animation:hgSteam3 11s ease-in-out infinite}
}
@keyframes hgFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes hgGlow{0%,34%{opacity:.5;transform:scale(1)}42%{opacity:1;transform:scale(1.08)}62%,100%{opacity:.55;transform:scale(1)}}
@keyframes hgScene{0%{opacity:0}4%,94%{opacity:1}98%,100%{opacity:0}}
@keyframes hgMug{0%,44%{transform:translateY(0)}47%{transform:translateY(-12px)}50%{transform:translateY(0)}52%{transform:translateY(-3px)}54%,100%{transform:translateY(0)}}
@keyframes hgTube{0%,2%{opacity:0;transform:translate(-150px,-110px) rotate(-8deg)}8%,38%{opacity:1;transform:none}46%,100%{opacity:0;transform:translate(-150px,-110px) rotate(-8deg)}}
@keyframes hgHandle{0%{transform:translate(34px,-22px) rotate(14deg)}12%{transform:translate(36px,-20px) rotate(10deg)}24%{transform:translate(33px,-23px) rotate(15deg)}33%{transform:translate(34px,-22px) rotate(14deg);animation-timing-function:cubic-bezier(.34,1.56,.64,1)}39%,96%{transform:none}99%,100%{transform:translate(34px,-22px) rotate(14deg)}}
@keyframes hgSeam{0%,38%{stroke-dashoffset:1}44%,96%{stroke-dashoffset:0}98%,100%{stroke-dashoffset:1}}
@keyframes hgDrop{0%,12%{opacity:0;transform:translateY(0) scale(.2)}14%{opacity:1;transform:translateY(0) scale(1)}15%{opacity:1;transform:translateY(4px) scale(.9,1.2)}20%{opacity:1;transform:translateY(92px) scale(.85,1.3)}20.4%,100%{opacity:0;transform:translateY(96px) scale(.3)}}
@keyframes hgDrop2{0%,23%{opacity:0;transform:translateY(0) scale(.2)}25%{opacity:1;transform:translateY(0) scale(1)}26%{opacity:1;transform:translateY(4px) scale(.9,1.2)}31%{opacity:1;transform:translateY(92px) scale(.85,1.3)}31.4%,100%{opacity:0;transform:translateY(96px) scale(.3)}}
@keyframes hgRing{0%,37%{opacity:0;transform:scale(.3)}40%{opacity:.9;transform:scale(.8)}48%,100%{opacity:0;transform:scale(2.6)}}
@keyframes hgSpark{0%,38%{opacity:0;transform:scale(0) rotate(0)}43%{opacity:1;transform:scale(1.2) rotate(40deg)}50%,100%{opacity:0;transform:scale(0) rotate(80deg)}}
@keyframes hgSteam1{0%,54%{opacity:0;transform:translateY(8px)}62%{opacity:.75}78%,100%{opacity:0;transform:translateY(-28px)}}
@keyframes hgSteam2{0%,60%{opacity:0;transform:translateY(8px)}68%{opacity:.75}84%,100%{opacity:0;transform:translateY(-28px)}}
@keyframes hgSteam3{0%,66%{opacity:0;transform:translateY(8px)}74%{opacity:.75}90%,100%{opacity:0;transform:translateY(-28px)}}
`;
const SPARK = "M0 -9 L2.5 -2.5 L9 0 L2.5 2.5 L0 9 L-2.5 2.5 L-9 0 L-2.5 -2.5Z";
export default function HeroGlue({ label = "EPOBOND Super Glue repairing the handle of a broken mug" }: { label?: string }) {
  return (
    <svg viewBox="0 0 480 560" role="img" aria-label={label} className="mx-auto w-full max-w-[300px] sm:max-w-[460px] max-h-[48vh] sm:max-h-[52vh] lg:max-h-[60vh]">
      <style>{CSS}</style>
      <defs>
        <radialGradient id="hgHalo"><stop offset="0" stopColor="#d6262b" stopOpacity=".6" /><stop offset="1" stopColor="#d6262b" stopOpacity="0" /></radialGradient>
        <linearGradient id="hgMugG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#b9afa0" /><stop offset=".5" stopColor="#f6f1e8" /><stop offset="1" stopColor="#cfc6b5" /></linearGradient>
        <linearGradient id="hgTubeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#cfcbc3" /><stop offset=".45" stopColor="#ffffff" /><stop offset="1" stopColor="#c4c0b8" /></linearGradient>
        <linearGradient id="hgSilver" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8d939b" /><stop offset=".45" stopColor="#f0f2f5" /><stop offset="1" stopColor="#7c828a" /></linearGradient>
        <linearGradient id="hgDropG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffb0b4" /><stop offset="1" stopColor="#d6262b" /></linearGradient>
        <clipPath id="hgBody"><path d="M120 340 L120 470 Q120 505 155 505 L245 505 Q280 505 280 470 L280 340 Z" /></clipPath>
      </defs>

      <ellipse className="hg-glow" cx="240" cy="400" rx="205" ry="190" fill="url(#hgHalo)" />
      <g className="hg-float">
        <ellipse cx="205" cy="513" rx="135" ry="11" fill="#000" opacity=".4" />
        <g className="hg-scene">
          <g className="hg-mug">
            {/* handle, drawn first so its ends tuck behind the mug body when repaired */}
            <g className="hg-handle">
              <path d="M276 372 C352 364 352 460 276 452" fill="none" stroke="#c9c0af" strokeWidth="25" />
              <path d="M276 372 C352 364 352 460 276 452" fill="none" stroke="#f1ebdf" strokeWidth="17" />
              <path d="M290 378 C334 374 340 420 332 440" fill="none" stroke="#fff" strokeWidth="3" opacity=".6" strokeLinecap="round" />
            </g>
            <path d="M120 340 L120 470 Q120 505 155 505 L245 505 Q280 505 280 470 L280 340 Z" fill="url(#hgMugG)" />
            <g clipPath="url(#hgBody)"><rect x="110" y="398" width="180" height="24" fill="#d6262b" /><rect x="110" y="426" width="180" height="3" fill="#8a8173" opacity=".55" /></g>
            <ellipse cx="200" cy="340" rx="80" ry="13" fill="#d9d1c2" />
            <ellipse cx="200" cy="342" rx="72" ry="10" fill="#3a2218" />
            <path d="M132 352 L132 460" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".5" />
            <path className="hg-seam" d="M283 360 L283 384" pathLength={1} fill="none" stroke="#d6262b" strokeWidth="5" strokeLinecap="round" />
            <path className="hg-seam" d="M283 440 L283 464" pathLength={1} fill="none" stroke="#d6262b" strokeWidth="5" strokeLinecap="round" />
            <g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round">
              <path className="hg-steam hg-s1" d="M170 322 C160 304 182 292 172 270" />
              <path className="hg-steam hg-s2" d="M200 322 C190 302 212 290 202 266" />
              <path className="hg-steam hg-s3" d="M230 322 C220 304 242 292 232 272" />
            </g>
          </g>
          <circle className="hg-ring" cx="300" cy="412" r="40" fill="none" stroke="#ffb3b6" strokeWidth="3" />
          {[[338, 372, 0], [352, 430, 120], [318, 476, 240], [296, 352, 360]].map(([x, y, d], i) => (
            <path key={i} className="hg-spark" transform={`translate(${x} ${y})`} d={SPARK} fill="#ffd86b" style={{ animationDelay: `${(d as number) / 1000}s` }} />
          ))}

          {/* the star product: Super Glue (Al-Sarookh) */}
          <g transform="translate(270 270)">
            <g className="hg-tube">
              <g transform="rotate(120)">
                <rect x="-32" y="200" width="64" height="13" fill="url(#hgSilver)" />
                <path d="M-32 204 H32 M-32 208 H32" stroke="#5c6168" strokeWidth=".8" opacity=".6" />
                <rect x="-32" y="74" width="64" height="126" fill="url(#hgTubeG)" />
                <path d="M-11 34 Q-30 44 -32 74 L32 74 Q30 44 11 34 Z" fill="url(#hgTubeG)" />
                <rect x="-12" y="22" width="24" height="12" fill="url(#hgSilver)" />
                <path d="M-6 0 L6 0 L9 22 L-9 22 Z" fill="#15161a" />
                <rect x="-32" y="74" width="64" height="7" fill="#d6262b" />
                <rect x="-32" y="192" width="64" height="8" fill="#2e9e45" />
                <text transform="translate(3 114) rotate(-90)" textAnchor="middle" fontSize="20" fontWeight="900" fill="#14161a" fontFamily="Arial, Tahoma, 'Noto Naskh Arabic', sans-serif">الصاروخ</text>
                <text transform="translate(-17 114) rotate(-90)" textAnchor="middle" fontSize="8" fontWeight="800" fill="#d6262b" letterSpacing="1.4" fontFamily="Arial, sans-serif">SUPER GLUE</text>
                <rect x="-23" y="156" width="46" height="32" rx="3" fill="#111317" />
                <circle cx="-3.5" cy="166" r="6.5" fill="#d6262b" /><circle cx="3.5" cy="166" r="6.5" fill="#2e9e45" opacity=".92" />
                <text x="0" y="183" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">EPOBOND</text>
              </g>
            </g>
          </g>
          {[1, 2].map((n) => <path key={n} className={`hg-drop hg-d${n}`} d="M272 262 C279 273 283 281 272 290 C261 281 265 273 272 262Z" fill="url(#hgDropG)" />)}
        </g>
      </g>
    </svg>
  );
}
