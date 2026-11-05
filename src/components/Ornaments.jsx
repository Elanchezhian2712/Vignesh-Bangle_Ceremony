/**
 * Hand-built SVG ornaments in a South Indian temple idiom.
 * Everything is stroked with `currentColor` so a parent can recolour it,
 * and every path is drawable (stroke-dasharray) for the reveal animations.
 */

/* ── Lotus rosette ────────────────────────────────────────────
   Eight petals around a seed. Used as the divider centrepiece
   and the apex of the arch.                                     */
export function Lotus({ size = 26, petals = 8, className = '' }) {
  return (
    <svg
      className={`orn ${className}`}
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      aria-hidden="true"
    >
      {Array.from({ length: petals }, (_, i) => (
        <ellipse
          key={i}
          rx="10"
          ry="30"
          cy="-16"
          transform={`rotate(${(360 / petals) * i})`}
        />
      ))}
      <circle r="7" />
    </svg>
  )
}

/* ── Paisley (mango) divider ──────────────────────────────────
   A mango curling away from each side of a lotus.               */
export function PaisleyDivider({ width = 300, className = '' }) {
  const mango =
    'M0 0 C -22 -6 -38 -22 -38 -40 C -38 -56 -26 -66 -13 -66 ' +
    'C -1 -66 8 -57 8 -45 C 8 -34 0 -26 -9 -26 C -16 -26 -21 -31 -21 -38 ' +
    'C -21 -43 -18 -47 -13 -47'

  return (
    <svg
      className={`orn orn--draw ${className}`}
      viewBox="-160 -80 320 100"
      width={width}
      height={(width / 320) * 100}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* baseline rules */}
      <path d="M-158 0 H -60" opacity="0.5" />
      <path d="M60 0 H 158" opacity="0.5" />

      {/* mirrored mangoes */}
      <g transform="translate(-40 0)">
        <path d={mango} />
      </g>
      <g transform="translate(40 0) scale(-1 1)">
        <path d={mango} />
      </g>

      {/* seed dots */}
      <circle cx="-52" cy="0" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="52" cy="0" r="2.6" fill="currentColor" stroke="none" />

      {/* centre lotus */}
      <g transform="translate(0 -18) scale(0.34)">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} rx="10" ry="30" cy="-16" transform={`rotate(${45 * i})`} strokeWidth="7" />
        ))}
        <circle r="7" strokeWidth="7" />
      </g>
    </svg>
  )
}

/* ── Bangle stack ─────────────────────────────────────────────
   The signature motif: concentric rings, some solid, some cut
   like glass bangles catching light.                            */
export function Bangles({ size = 120, rings = 4, className = '', spin = false }) {
  return (
    <svg
      className={`orn ${spin ? 'orn--spin' : ''} ${className}`}
      viewBox="-60 -60 120 120"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {Array.from({ length: rings }, (_, i) => {
        const r = 52 - i * 11
        // Alternate rings are dashed - the glint of cut glass.
        const dashed = i % 2 === 1
        return (
          <circle
            key={i}
            r={r}
            strokeWidth={dashed ? 1.4 : 3}
            opacity={dashed ? 0.75 : 1}
            strokeDasharray={dashed ? '1 7' : undefined}
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

/* ── Royal Valaikaappu Bangle Jewel Crest ────────────────────────
   An authentic South Indian heirloom jewel emblem:
   - Carved royal gold kada (தங்கக் கடகம்) in center with embossed beadwork
   - Traditional emerald green & ruby red glass bangles (பச்சை & சிவப்பு வளையல்)
   - Draped fresh jasmine flower garland (மல்லிகைப் பூ மாலை)
   - Hanging golden ghungroo bells (சலங்கை மணிகள்)
   - Flanking royal paisley/mango filigree flourishes.                    */
/* ── Royal Valaikaappu Bangle Jewel Crest (Pinterest Luxury Edition) ───
   Authentic South Indian Heirloom Valaikaappu motif:
   - 9-set auspicious traditional bangles: Imperial carved gold kada,
     translucent emerald green glass (பச்சை), and kumkum ruby red glass (சிவப்பு)
   - Double-strung fresh jasmine garland (மல்லிகைப் பூ மாலை) with rose buds
   - Flanking temple gold mango/paisley vines (மாங்காய் கொடி)
   - Triple hanging royal temple jhumkas (தங்க ஜிமிக்கி) with dangling pearls   */
export function RoyalBangleCrest({ width = 280, className = '' }) {
  const h = (width / 280) * 115

  return (
    <svg
      className={`royal-bangle-crest ${className}`}
      viewBox="-140 -48 280 118"
      width={width}
      height={h}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/* Imperial Gold Gradient */}
        <linearGradient id="rbGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7a4a15" />
          <stop offset="18%" stopColor="#c8963e" />
          <stop offset="38%" stopColor="#fdefb2" />
          <stop offset="60%" stopColor="#e5b158" />
          <stop offset="82%" stopColor="#9a6520" />
          <stop offset="100%" stopColor="#663c0e" />
        </linearGradient>

        {/* Antique Gold kada rim */}
        <linearGradient id="rbGoldRim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff3cf" />
          <stop offset="50%" stopColor="#d4a359" />
          <stop offset="100%" stopColor="#87581d" />
        </linearGradient>

        {/* Translucent Emerald Glass Gradient */}
        <linearGradient id="rbEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a331c" />
          <stop offset="25%" stopColor="#196339" />
          <stop offset="50%" stopColor="#52d68a" />
          <stop offset="78%" stopColor="#1e7343" />
          <stop offset="100%" stopColor="#0d3d22" />
        </linearGradient>

        {/* Kumkum Ruby Glass Gradient */}
        <linearGradient id="rbRuby" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a0e1b" />
          <stop offset="25%" stopColor="#8c1b32" />
          <stop offset="50%" stopColor="#f26d87" />
          <stop offset="78%" stopColor="#9e203b" />
          <stop offset="100%" stopColor="#541220" />
        </linearGradient>

        {/* Pearl Drop Gradient */}
        <radialGradient id="rbPearl" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#fdfbf7" />
          <stop offset="100%" stopColor="#dcd3c4" />
        </radialGradient>

        {/* Soft Golden Glow Filter */}
        <filter id="rbGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4.5" floodColor="#87581d" floodOpacity="0.25" />
        </filter>
        <filter id="rbShine" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2a180c" floodOpacity="0.20" />
        </filter>
      </defs>

      {/* Aura / Halo behind crest */}
      <ellipse cx="0" cy="5" rx="72" ry="32" fill="url(#rbGold)" opacity="0.08" />

      {/* Flanking Royal Paisley Mango Vines (மாங்கொடி) */}
      <g stroke="url(#rbGold)" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" fill="none">
        {/* Left Paisley Branch */}
        <path d="M-48 6 C -72 -10 -98 -12 -118 -2 C -128 4 -126 16 -115 16 C -105 16 -103 6 -111 2" />
        <path d="M-52 14 C -76 22 -96 18 -108 8" strokeDasharray="1.5 3.5" />
        <circle cx="-116" cy="-3" r="2.2" fill="url(#rbGold)" stroke="none" />
        <circle cx="-130" cy="6" r="1.6" fill="#fdefb2" stroke="none" />
        {/* Left tiny leaves */}
        <path d="M-82 -3 C -88 -9 -84 -16 -76 -13 C -76 -7 -80 -3 -82 -3 Z" fill="#2d774d" opacity="0.75" />
        <path d="M-66 3 C -70 -3 -66 -9 -60 -7 C -60 -2 -64 3 -66 3 Z" fill="#2d774d" opacity="0.75" />

        {/* Right Paisley Branch */}
        <path d="M48 6 C 72 -10 98 -12 118 -2 C 128 4 126 16 115 16 C 105 16 103 6 111 2" />
        <path d="M52 14 C 76 22 96 18 108 8" strokeDasharray="1.5 3.5" />
        <circle cx="116" cy="-3" r="2.2" fill="url(#rbGold)" stroke="none" />
        <circle cx="130" cy="6" r="1.6" fill="#fdefb2" stroke="none" />
        {/* Right tiny leaves */}
        <path d="M82 -3 C 88 -9 84 -16 76 -13 C 76 -7 80 -3 82 -3 Z" fill="#2d774d" opacity="0.75" />
        <path d="M66 3 C 70 -3 66 -9 60 -7 C 60 -2 64 3 66 3 Z" fill="#2d774d" opacity="0.75" />
      </g>

      {/* ── 9 Traditional Auspicious Bangles ───────────────────── */}
      <g filter="url(#rbGlow)">
        {/* 1. Far Left: Gold beaded kada */}
        <g transform="translate(-40, 2) rotate(-22)">
          <ellipse rx="15" ry="26" stroke="url(#rbGold)" strokeWidth="3.2" />
          <ellipse rx="12.6" ry="23.6" stroke="#fff1d0" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.85" />
          {/* Edge studs */}
          {[-18, 0, 18].map((deg, i) => {
            const rad = ((deg - 90) * Math.PI) / 180
            return (
              <circle
                key={i}
                cx={15 * Math.cos(rad)}
                cy={26 * Math.sin(rad)}
                r="1.4"
                fill="#fdefb2"
                stroke="#663c0e"
                strokeWidth="0.4"
              />
            )
          })}
        </g>

        {/* 2. Far Right: Gold beaded kada */}
        <g transform="translate(40, 2) rotate(22)">
          <ellipse rx="15" ry="26" stroke="url(#rbGold)" strokeWidth="3.2" />
          <ellipse rx="12.6" ry="23.6" stroke="#fff1d0" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.85" />
          {[-18, 0, 18].map((deg, i) => {
            const rad = ((deg - 90) * Math.PI) / 180
            return (
              <circle
                key={i}
                cx={15 * Math.cos(rad)}
                cy={26 * Math.sin(rad)}
                r="1.4"
                fill="#fdefb2"
                stroke="#663c0e"
                strokeWidth="0.4"
              />
            )
          })}
        </g>

        {/* 3. Outer Emerald Green Glass (Left) */}
        <g transform="translate(-30, 4) rotate(-16)">
          <ellipse rx="15.5" ry="27" stroke="url(#rbEmerald)" strokeWidth="3.6" />
          <ellipse rx="13.2" ry="24.4" stroke="#7ae0a8" strokeWidth="0.9" opacity="0.9" />
          {/* Glass specular glint */}
          <path d="M-12 -14 A 15.5 27 0 0 1 0 -27" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* 4. Outer Emerald Green Glass (Right) */}
        <g transform="translate(30, 4) rotate(16)">
          <ellipse rx="15.5" ry="27" stroke="url(#rbEmerald)" strokeWidth="3.6" />
          <ellipse rx="13.2" ry="24.4" stroke="#7ae0a8" strokeWidth="0.9" opacity="0.9" />
          <path d="M12 -14 A 15.5 27 0 0 0 0 -27" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* 5. Mid Ruby Red Glass (Left) */}
        <g transform="translate(-20, 6) rotate(-10)">
          <ellipse rx="16" ry="28" stroke="url(#rbRuby)" strokeWidth="3.8" />
          <ellipse rx="13.6" ry="25.2" stroke="#fba3b4" strokeWidth="0.9" opacity="0.92" />
          <path d="M-13 -15 A 16 28 0 0 1 0 -28" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* 6. Mid Ruby Red Glass (Right) */}
        <g transform="translate(20, 6) rotate(10)">
          <ellipse rx="16" ry="28" stroke="url(#rbRuby)" strokeWidth="3.8" />
          <ellipse rx="13.6" ry="25.2" stroke="#fba3b4" strokeWidth="0.9" opacity="0.92" />
          <path d="M13 -15 A 16 28 0 0 0 0 -28" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* 7. Inner Gold Filigree Bangle (Left) */}
        <g transform="translate(-10, 8) rotate(-5)">
          <ellipse rx="16.5" ry="28.5" stroke="url(#rbGold)" strokeWidth="3.4" />
          <ellipse rx="14.2" ry="25.8" stroke="#fff3cf" strokeWidth="1" strokeDasharray="1.5 3" opacity="0.95" />
        </g>

        {/* 8. Inner Gold Filigree Bangle (Right) */}
        <g transform="translate(10, 8) rotate(5)">
          <ellipse rx="16.5" ry="28.5" stroke="url(#rbGold)" strokeWidth="3.4" />
          <ellipse rx="14.2" ry="25.8" stroke="#fff3cf" strokeWidth="1" strokeDasharray="1.5 3" opacity="0.95" />
        </g>

        {/* 9. CENTERPIECE: Grand Royal Kada (ராஜ தங்கக் கடகம்) */}
        <g transform="translate(0, 9)" filter="url(#rbShine)">
          {/* Main Gold Tube */}
          <ellipse rx="17.5" ry="29.5" stroke="url(#rbGold)" strokeWidth="5.2" />
          {/* Central Carved Zari Inlay */}
          <ellipse rx="15" ry="26.5" stroke="#fff4d4" strokeWidth="1.4" strokeDasharray="3 3.5" opacity="0.95" />
          {/* Embossed kasu / jewel beads */}
          {[-24, -16, -8, 0, 8, 16, 24].map((deg, idx) => {
            const rad = ((deg - 90) * Math.PI) / 180
            const bx = 17.5 * Math.cos(rad)
            const by = 29.5 * Math.sin(rad)
            return (
              <g key={idx} transform={`translate(${bx}, ${by})`}>
                <circle r="1.8" fill="#fff5d6" stroke="#7a4a15" strokeWidth="0.5" />
                {idx === 3 && <circle r="0.9" fill="#9e203b" />} {/* Central ruby bindu */}
              </g>
            )
          })}
          {/* High gloss specular reflection on gold curve */}
          <path d="M-12 -20 A 17.5 29.5 0 0 1 10 -25" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.92" />
        </g>
      </g>

      {/* ── Fragrant Jasmine Garland (மல்லிகைப் பூ மாலை) ──────── */}
      <g>
        {/* Sacred yellow/red tying thread (காப்பு நூல்) */}
        <path d="M-46 16 Q 0 42 46 16" stroke="#d49b29" strokeWidth="1.4" fill="none" opacity="0.75" />
        <path d="M-46 17 Q 0 43 46 17" stroke="#b22b3f" strokeWidth="1.1" strokeDasharray="3 3" fill="none" opacity="0.8" />

        {/* Lush Jasmine Buds with Blush Rose accents */}
        {[
          { x: -44, y: 17, r: -26, isRose: false },
          { x: -33, y: 24, r: -18, isRose: false },
          { x: -22, y: 30, r: -10, isRose: true },
          { x: -11, y: 34, r: -4,  isRose: false },
          { x: 0,   y: 36, r: 0,   isRose: true }, // Centre rose accent
          { x: 11,  y: 34, r: 4,   isRose: false },
          { x: 22,  y: 30, r: 10,  isRose: true },
          { x: 33,  y: 24, r: 18,  isRose: false },
          { x: 44,  y: 17, r: 26,  isRose: false },
        ].map((bud, i) => (
          <g key={i} transform={`translate(${bud.x}, ${bud.y}) rotate(${bud.r})`}>
            {bud.isRose ? (
              /* Pinkish rose petal accent in garland */
              <g>
                <circle cx="0" cy="5" r="3.6" fill="#df5c76" stroke="#a61c36" strokeWidth="0.5" />
                <circle cx="0" cy="5" r="2" fill="#f89cb0" />
                <path d="M-2 1 L0 -1 L2 1" stroke="#256b3e" strokeWidth="1" fill="none" />
              </g>
            ) : (
              /* Fragrant Jasmine Bud (மல்லி மொட்டு) */
              <g>
                {/* Green calyx */}
                <path d="M-2.2 2 L0 -1 L2.2 2 Z" fill="#20693a" />
                {/* White jasmine petals */}
                <ellipse cx="0" cy="5.2" rx="3.6" ry="5.2" fill="#ffffff" stroke="#e8dfce" strokeWidth="0.5" />
                <ellipse cx="-1.5" cy="4.2" rx="2.2" ry="4" fill="#fbfaf6" />
                {/* Pollen glint */}
                <circle cx="0" cy="9.2" r="1.1" fill="#e5ad35" />
              </g>
            )}
          </g>
        ))}
      </g>

      {/* ── Triple Royal Temple Jhumkas / Jimikki (ஜிமிக்கி சலங்கை) ─ */}
      <g filter="url(#rbGlow)">
        {/* Left Small Jhumka */}
        <g transform="translate(-20, 38)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="url(#rbGold)" strokeWidth="1.2" />
          <circle cx="0" cy="8" r="1.8" fill="url(#rbGold)" stroke="#663c0e" strokeWidth="0.5" />
          {/* Bell dome */}
          <path d="M-5 11 C -5 7.5 5 7.5 5 11 L 4 16 L -4 16 Z" fill="url(#rbGold)" stroke="#663c0e" strokeWidth="0.6" />
          {/* Filigree ribs */}
          <path d="M-2 9 L -2 15 M 2 9 L 2 15" stroke="#fff4d4" strokeWidth="0.7" />
          {/* Pearl drop */}
          <circle cx="0" cy="19.5" r="2.2" fill="url(#rbPearl)" stroke="#87581d" strokeWidth="0.5" />
        </g>

        {/* Right Small Jhumka */}
        <g transform="translate(20, 38)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="url(#rbGold)" strokeWidth="1.2" />
          <circle cx="0" cy="8" r="1.8" fill="url(#rbGold)" stroke="#663c0e" strokeWidth="0.5" />
          <path d="M-5 11 C -5 7.5 5 7.5 5 11 L 4 16 L -4 16 Z" fill="url(#rbGold)" stroke="#663c0e" strokeWidth="0.6" />
          <path d="M-2 9 L -2 15 M 2 9 L 2 15" stroke="#fff4d4" strokeWidth="0.7" />
          <circle cx="0" cy="19.5" r="2.2" fill="url(#rbPearl)" stroke="#87581d" strokeWidth="0.5" />
        </g>

        {/* Centre Grand Royal Jhumka */}
        <g transform="translate(0, 43)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="url(#rbGold)" strokeWidth="1.4" />
          <circle cx="0" cy="9.5" r="2.4" fill="url(#rbGold)" stroke="#663c0e" strokeWidth="0.6" />
          <circle cx="0" cy="9.5" r="1" fill="#9e203b" /> {/* Ruby stud */}
          {/* Grand dome */}
          <path d="M-7 13.5 C -7 9 7 9 7 13.5 L 5.5 19.5 L -5.5 19.5 Z" fill="url(#rbGold)" stroke="#663c0e" strokeWidth="0.8" />
          {/* Filigree dots & ribs */}
          <path d="M-3.5 11.5 L -3.5 18.5 M 0 10.5 L 0 19 M 3.5 11.5 L 3.5 18.5" stroke="#fff4d4" strokeWidth="0.8" />
          {[-5, 0, 5].map((x, idx) => (
            <circle key={idx} cx={x} cy="19.5" r="0.9" fill="#fff4d4" />
          ))}
          {/* Triple hanging pearl droplets */}
          <line x1="0" y1="19.5" x2="0" y2="23" stroke="url(#rbGold)" strokeWidth="1" />
          <circle cx="0" cy="25.5" r="2.6" fill="url(#rbPearl)" stroke="#7a4a15" strokeWidth="0.6" />
          <line x1="-4" y1="19.5" x2="-4" y2="22.5" stroke="url(#rbGold)" strokeWidth="0.9" />
          <circle cx="-4" cy="24.5" r="1.8" fill="url(#rbPearl)" stroke="#7a4a15" strokeWidth="0.5" />
          <line x1="4" y1="19.5" x2="4" y2="22.5" stroke="url(#rbGold)" strokeWidth="0.9" />
          <circle cx="4" cy="24.5" r="1.8" fill="url(#rbPearl)" stroke="#7a4a15" strokeWidth="0.5" />
        </g>
      </g>
    </svg>
  )
}

export const BangleStack = RoyalBangleCrest



/* ── Auspicious Interlocking Bangles ───────────────────────────
   Green glass bangle linked with an antique gold bangle.         */
export function BangleKnot({ size = 56, className = '' }) {
  return (
    <svg
      className={`bangle-knot ${className}`}
      viewBox="-40 -30 80 60"
      width={size}
      height={(size / 80) * 60}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bkGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9d7130" />
          <stop offset="45%" stopColor="#f5deb3" />
          <stop offset="100%" stopColor="#c69749" />
        </linearGradient>
        <linearGradient id="bkGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b4d34" />
          <stop offset="50%" stopColor="#74c69d" />
          <stop offset="100%" stopColor="#2e7d56" />
        </linearGradient>
      </defs>

      {/* Left Bangle: Green glass */}
      <g transform="translate(-12, 0) rotate(-16)">
        <ellipse rx="16" ry="24" stroke="url(#bkGreen)" strokeWidth="3" />
        <ellipse rx="13.5" ry="21.5" stroke="#74c69d" strokeWidth="0.8" opacity="0.75" />
      </g>

      {/* Right Bangle: Cut Gold */}
      <g transform="translate(12, 0) rotate(16)">
        <ellipse rx="16" ry="24" stroke="url(#bkGold)" strokeWidth="3.2" />
        <ellipse
          rx="13.5"
          ry="21.5"
          stroke="#fff0c4"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
      </g>

      {/* Center auspicious floral bindu */}
      <circle cx="0" cy="0" r="3.5" fill="#f5deb3" stroke="#9d7130" strokeWidth="1" />
    </svg>
  )
}

/* ── Kolam ────────────────────────────────────────────────────
   A pulli kolam: a dot grid with a continuous looping line
   threaded around it. Draws itself when it scrolls into view.   */
export function Kolam({ size = 200, className = '' }) {
  const dots = []
  for (let row = -2; row <= 2; row++) {
    const span = 2 - Math.abs(row)
    for (let col = -span; col <= span; col++) {
      dots.push({ x: col * 22, y: row * 22 })
    }
  }

  // Four looping petals, each swinging around one arm of the grid.
  const loop =
    'M0 -46 C 18 -46 30 -30 30 -14 C 46 -14 46 14 30 14 ' +
    'C 30 30 18 46 0 46 C -18 46 -30 30 -30 14 ' +
    'C -46 14 -46 -14 -30 -14 C -30 -30 -18 -46 0 -46 Z'

  return (
    <svg
      className={`orn orn--draw ${className}`}
      viewBox="-70 -70 140 140"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d={loop} />
      <path d={loop} transform="rotate(45) scale(0.62)" opacity="0.7" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.9" fill="currentColor" stroke="none" opacity="0.55" />
      ))}
    </svg>
  )
}

/* ── Toran with Festive Fairy Lights ──────────────────────────
   Traditional mango-leaf garland strung with warm, glowing
   festive fairy lights across the entrance.                     */
export function Toran({ leaves = 26, className = '' }) {
  const W = 1200
  const sag = 26

  // Mango leaves hanging along the cord
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = i / (leaves - 1)
    const x = t * W
    const y = 4 * sag * t * (1 - t)
    const len = 26 + 20 * Math.sin(Math.PI * t)
    const tilt = (t - 0.5) * 26
    return { x, y, len, tilt, i }
  })

  // Festive glowing light bulbs nestled between the leaves
  const lights = Array.from({ length: leaves - 1 }, (_, i) => {
    const t = (i + 0.5) / (leaves - 1)
    const x = t * W
    const y = 4 * sag * t * (1 - t)
    const drop = 9 + (i % 3) * 3
    return { x, y, drop, i }
  })

  return (
    <svg
      className={`toran ${className}`}
      viewBox={`0 0 ${W} 92`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Warm incandescent bulb radial glow */}
        <radialGradient id="bulbGlowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbeb" stopOpacity="1" />
          <stop offset="35%" stopColor="#fde047" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>

        {/* Bulb glass gradient */}
        <linearGradient id="bulbGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="32%" stopColor="#fef08a" />
          <stop offset="75%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        {/* Gold brass socket cap */}
        <linearGradient id="bulbSocket" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="50%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        {/* Bloom glow filter */}
        <filter id="bulbBloom" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main suspension cord (natural jute/sage cord) */}
      <path
        d={`M0 0 Q ${W / 2} ${2 * sag} ${W} 0`}
        fill="none"
        stroke="var(--sage, #6b8e23)"
        strokeWidth="2.2"
        opacity="0.75"
      />

      {/* Festive fairy light wire weaving across the cord */}
      <path
        d={`M0 1 Q ${W / 2} ${2 * sag + 2} ${W} 1`}
        fill="none"
        stroke="#d97706"
        strokeWidth="0.9"
        strokeDasharray="4 6"
        opacity="0.65"
      />

      {/* Mango Leaves */}
      {items.map(({ x, y, len, tilt, i }) => (
        <g key={`leaf-${i}`} transform={`translate(${x} ${y}) rotate(${tilt})`}>
          <path
            d={`M0 0 C -7 ${len * 0.4} -5 ${len * 0.8} 0 ${len} C 5 ${len * 0.8} 7 ${len * 0.4} 0 0 Z`}
            fill="var(--sage, #4d7c0f)"
            opacity={i % 3 === 0 ? 0.92 : 0.68}
          />
          {/* Subtle leaf spine */}
          <line x1="0" y1="0" x2="0" y2={len * 0.8} stroke="#ffffff" strokeWidth="0.5" opacity="0.35" />
        </g>
      ))}

      {/* Glowing Festive Light Bulbs */}
      {lights.map(({ x, y, drop, i }) => (
        <g
          key={`light-${i}`}
          className={`toran__light toran__light--${i % 4}`}
          transform={`translate(${x} ${y})`}
        >
          {/* Dainty suspension wire */}
          <line x1="0" y1="0" x2="0" y2={drop} stroke="#94a3b8" strokeWidth="0.9" opacity="0.7" />

          {/* Golden brass socket cap */}
          <rect x="-2" y={drop} width="4" height="2.8" rx="0.6" fill="url(#bulbSocket)" />

          {/* Radiant warm amber halo */}
          <circle cx="0" cy={drop + 7.5} r="13" fill="url(#bulbGlowGrad)" opacity="0.9" />

          {/* Teardrop festival bulb */}
          <path
            d={`M -3 ${drop + 2.8} C -4.2 ${drop + 6} -3.6 ${drop + 9.5} 0 ${drop + 13} C 3.6 ${drop + 9.5} 4.2 ${drop + 6} 3 ${drop + 2.8} Z`}
            fill="url(#bulbGlass)"
            filter="url(#bulbBloom)"
          />

          {/* Glowing hot white core filament */}
          <circle cx="0" cy={drop + 6.5} r="1.5" fill="#ffffff" opacity="0.95" />
          <circle cx="-0.8" cy={drop + 4.8} r="0.7" fill="#ffffff" opacity="0.9" />
        </g>
      ))}
    </svg>
  )
}

/* ── Temple arch ──────────────────────────────────────────────
   Drawn as a border behind content, with a finial at the apex. */
export function Arch({ className = '', strokeWidth = 2 }) {
  return (
    <svg
      className={`arch ${className}`}
      viewBox="0 0 400 560"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
    >
      <path
        d="M6 554 L6 190 C6 92 92 6 200 6 C308 6 394 92 394 190 L394 554"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M18 554 L18 192 C18 100 99 18 200 18 C301 18 382 100 382 192 L382 554"
        opacity="0.4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/* ── Peacock feather ──────────────────────────────────────────
   A quiet accent for corners.                                   */
export function Feather({ size = 56, className = '' }) {
  return (
    <svg
      className={`orn ${className}`}
      viewBox="-30 -60 60 120"
      width={size}
      height={(size / 60) * 120}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M0 58 C 0 20 0 -6 0 -22" strokeLinecap="round" />
      <ellipse cy="-30" rx="17" ry="26" />
      <ellipse cy="-32" rx="9" ry="14" />
      <circle cy="-34" r="4.5" fill="currentColor" stroke="none" />
      {Array.from({ length: 11 }, (_, i) => {
        const a = -128 + i * 12.8
        const rad = (a * Math.PI) / 180
        return (
          <line
            key={i}
            x1={Math.cos(rad) * 17}
            y1={-30 + Math.sin(rad) * 26}
            x2={Math.cos(rad) * 27}
            y2={-30 + Math.sin(rad) * 40}
            opacity="0.55"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

/* ── Falling petal ────────────────────────────────────────────
   Replaces the emoji confetti with something that belongs.      */
export function Petal({ size = 14, variant = 0 }) {
  const shapes = [
    'M8 0 C 13 5 16 10 8 16 C 0 10 3 5 8 0 Z', // petal
    'M8 1 C 12 4 15 9 8 15 C 1 9 4 4 8 1 Z', // slimmer petal
    'M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z', // four-point star
  ]
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path d={shapes[variant % shapes.length]} fill="currentColor" />
    </svg>
  )
}

/* ── Mandala ──────────────────────────────────────────────────
   A big, ornate backdrop. Three concentric rings of petals with
   a scalloped outer band - substantial enough to carry the hero
   rather than reading as a thin line drawing.                   */
export function Mandala({ size = 760, className = '' }) {
  const ring = (count, rx, ry, cy, sw, op) =>
    Array.from({ length: count }, (_, i) => (
      <ellipse
        key={`${cy}-${i}`}
        rx={rx}
        ry={ry}
        cy={cy}
        strokeWidth={sw}
        opacity={op}
        transform={`rotate(${(360 / count) * i})`}
      />
    ))

  return (
    <svg
      className={`orn ${className}`}
      viewBox="-260 -260 520 520"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {/* scalloped outer band */}
      {Array.from({ length: 36 }, (_, i) => (
        <circle key={`s-${i}`} r="12" cy="-238" strokeWidth="1.2" opacity="0.5"
          transform={`rotate(${10 * i})`} />
      ))}
      <circle r="222" strokeWidth="1.4" opacity="0.55" />
      <circle r="214" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 9" />

      {ring(24, 14, 52, -168, 1.3, 0.6)}
      <circle r="140" strokeWidth="1.2" opacity="0.5" />
      {ring(16, 22, 62, -92, 1.6, 0.72)}
      <circle r="66" strokeWidth="1.4" opacity="0.6" />
      {ring(8, 20, 46, -34, 2, 0.85)}
      <circle r="16" strokeWidth="2" />
      <circle r="5" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ── Floral spray ─────────────────────────────────────────────
   Filled, layered blooms - the lush counterweight to all the
   thin gold linework.                                           */
export function Floral({ size = 260, className = '' }) {
  const bloom = (cx, cy, r, petals, fill, op) => (
    <g transform={`translate(${cx} ${cy})`} opacity={op}>
      {Array.from({ length: petals }, (_, i) => (
        <ellipse
          key={i}
          rx={r * 0.42}
          ry={r}
          cy={-r * 0.55}
          fill={fill}
          transform={`rotate(${(360 / petals) * i})`}
        />
      ))}
      <circle r={r * 0.3} fill="var(--turmeric)" opacity="0.85" />
    </g>
  )

  const leaf = (x, y, rot, len, op) => (
    <path
      d={`M0 0 C ${-len * 0.34} ${len * 0.3} ${-len * 0.2} ${len * 0.78} 0 ${len}
          C ${len * 0.2} ${len * 0.78} ${len * 0.34} ${len * 0.3} 0 0 Z`}
      fill="var(--sage)"
      opacity={op}
      transform={`translate(${x} ${y}) rotate(${rot})`}
    />
  )

  return (
    <svg
      className={`orn floral ${className}`}
      viewBox="0 0 240 240"
      width={size}
      height={size}
      aria-hidden="true"
    >
      {/* stems */}
      <path d="M18 232 C 60 180 88 140 104 86" stroke="var(--sage)" strokeWidth="2.4" fill="none" opacity="0.75" />
      <path d="M18 232 C 74 198 128 176 172 154" stroke="var(--sage)" strokeWidth="2" fill="none" opacity="0.6" />

      {leaf(56, 168, -46, 60, 0.5)}
      {leaf(92, 132, -28, 52, 0.42)}
      {leaf(140, 168, 52, 56, 0.38)}

      {bloom(104, 70, 40, 8, 'var(--rose)', 0.85)}
      {bloom(168, 128, 26, 6, 'var(--rose-lite)', 0.9)}
      {bloom(58, 122, 20, 6, 'var(--gold-lite)', 0.85)}
      {bloom(146, 52, 15, 5, 'var(--rose-lite)', 0.7)}
    </svg>
  )
}
