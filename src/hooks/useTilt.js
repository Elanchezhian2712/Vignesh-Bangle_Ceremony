import { useCallback, useRef } from 'react'

/**
 * Pointer-tracked 3D tilt for a card. Returns handlers to spread onto
 * the element. Writes CSS custom properties instead of re-rendering,
 * and no-ops on touch, where there is no hover to track.
 */
export function useTilt({ max = 9 } = {}) {
  const ref = useRef(null)
  const frame = useRef(0)

  const onPointerMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el || e.pointerType === 'touch') return

      cancelAnimationFrame(frame.current)
      const rect = el.getBoundingClientRect()
      // -0.5 .. 0.5 from the centre of the card
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5

      frame.current = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`)
        // Drives the glare highlight.
        el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`)
        el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`)
      })
    },
    [max],
  )

  const onPointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}

export default useTilt
