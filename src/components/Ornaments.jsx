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

/* ── Traditional Valaikaappu Glass Bangle Row ──────────────────
   A stacked set of authentic South Indian glass bangles (emerald green,
   ruby red, and engraved gold) with cut-glass facet reflections.   */
export function BangleStack({ width = 160, className = '' }) {
  const bangles = [
    { type: 'green', stroke: '#2e7d56', highlight: '#74c69d' },
    { type: 'gold', stroke: '#c69749', highlight: '#fae3b4' },
    { type: 'ruby', stroke: '#9d3248', highlight: '#e27b91' },
    { type: 'gold-center', stroke: '#d4a359', highlight: '#fff2d6' },
    { type: 'ruby', stroke: '#9d3248', highlight: '#e27b91' },
    { type: 'gold', stroke: '#c69749', highlight: '#fae3b4' },
    { type: 'green', stroke: '#2e7d56', highlight: '#74c69d' },
  ]
  const h = (width / 160) * 56

  return (
    <svg
      className={`bangle-stack ${className}`}
      viewBox="0 0 160 56"
      width={width}
      height={h}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bsGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9d7130" />
          <stop offset="45%" stopColor="#fae3b4" />
          <stop offset="100%" stopColor="#c69749" />
        </linearGradient>
        <linearGradient id="bsGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b4d34" />
          <stop offset="45%" stopColor="#74c69d" />
          <stop offset="100%" stopColor="#2e7d56" />
        </linearGradient>
        <linearGradient id="bsRuby" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#681e2d" />
          <stop offset="45%" stopColor="#e27b91" />
          <stop offset="100%" stopColor="#9d3248" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow under the bangles */}
      <ellipse cx="80" cy="48" rx="66" ry="6" fill="rgba(198, 151, 73, 0.14)" />

      {bangles.map((b, i) => {
        const cx = 35 + i * 15
        const cy = 26
        const grad =
          b.type.includes('gold')
            ? 'url(#bsGold)'
            : b.type === 'green'
            ? 'url(#bsGreen)'
            : 'url(#bsRuby)'
        return (
          <g key={i} transform={`translate(${cx}, ${cy}) rotate(-14)`}>
            {/* Outer glass bangle ring */}
            <ellipse
              rx="11"
              ry="24"
              stroke={grad}
              strokeWidth={b.type.includes('gold') ? '2.8' : '2.4'}
            />
            {/* Inner cut facet reflection */}
            <ellipse
              rx="9"
              ry="22"
              stroke={b.highlight}
              strokeWidth="0.9"
              opacity={b.type.includes('gold') ? '0.85' : '0.65'}
              strokeDasharray={b.type.includes('gold') ? '2 4' : undefined}
            />
          </g>
        )
      })}
    </svg>
  )
}

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

/* ── Toran ────────────────────────────────────────────────────
   The mango-leaf garland strung across a doorway. Leaves hang
   from a slack cord, longer in the middle like the real thing.  */
export function Toran({ leaves = 26, className = '' }) {
  const W = 1200
  const sag = 26
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = i / (leaves - 1)
    const x = t * W
    // Parabolic slack, matching the cord path below.
    const y = 4 * sag * t * (1 - t)
    // Longest leaves at the centre, tapering to the ends.
    const len = 26 + 20 * Math.sin(Math.PI * t)
    const tilt = (t - 0.5) * 26
    return { x, y, len, tilt, i }
  })

  return (
    <svg
      className={`toran ${className}`}
      viewBox={`0 0 ${W} 90`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={`M0 0 Q ${W / 2} ${2 * sag} ${W} 0`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.65"
      />
      {items.map(({ x, y, len, tilt, i }) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${tilt})`}>
          <path
            d={`M0 0 C -7 ${len * 0.4} -5 ${len * 0.8} 0 ${len} C 5 ${len * 0.8} 7 ${len * 0.4} 0 0 Z`}
            fill="currentColor"
            opacity={i % 3 === 0 ? 0.9 : 0.62}
          />
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
