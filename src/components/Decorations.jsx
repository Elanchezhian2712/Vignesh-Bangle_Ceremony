import { useEffect, useMemo, useState } from 'react'
import { Petal } from './Ornaments.jsx'

const TINTS = ['var(--rose)', 'var(--gold)', 'var(--sage)', 'var(--turmeric)']

/** Drifting petals and golden sparkles, plus the warm lamp glow that follows the cursor on desktop. */
export default function Decorations({ count = 16 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: `p-${i}`,
        left: `${(i * 61) % 96 + 2}%`,
        duration: `${16 + ((i * 7) % 14)}s`,
        delay: `${-((i * 5) % 18)}s`,
        size: 11 + ((i * 3) % 9),
        tint: TINTS[i % TINTS.length],
        variant: i % 2, // 0 and 1 are organic petals
      })),
    [count],
  )

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: `s-${i}`,
        left: `${(i * 47 + 11) % 94 + 3}%`,
        duration: `${9 + ((i * 3) % 8)}s`,
        delay: `${-((i * 4) % 12)}s`,
        size: 7 + (i % 4) * 3,
      })),
    [],
  )

  const [glow, setGlow] = useState({ x: 0, y: 0, on: false })

  useEffect(() => {
    if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return
    let frame = 0
    function onMove(e) {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setGlow({ x: e.clientX, y: e.clientY, on: true }))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div
        className={`cursor-glow${glow.on ? ' is-on' : ''}`}
        style={{ transform: `translate3d(${glow.x}px, ${glow.y}px, 0)` }}
        aria-hidden="true"
      />

      <div className="float-layer" aria-hidden="true">
        {/* Shimmering golden stardust */}
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="sparkle-dust"
            style={{
              left: s.left,
              animationDuration: s.duration,
              animationDelay: s.delay,
              width: s.size,
              height: s.size,
            }}
          >
            <svg viewBox="0 0 16 16" width={s.size} height={s.size} fill="var(--gold-hi)">
              <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" />
            </svg>
          </span>
        ))}

        {/* Tumbling celebration petals */}
        {petals.map((p) => (
          <span
            key={p.id}
            className="floatie"
            style={{
              left: p.left,
              color: p.tint,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          >
            <Petal size={p.size} variant={p.variant} />
          </span>
        ))}
      </div>
    </>
  )
}
