import { useEffect, useRef } from 'react'

/**
 * Adds `is-in` to the element once it scrolls into view.
 * Falls back to "always visible" where IntersectionObserver is missing.
 */
export function useReveal({ threshold = 0.16, once = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            if (once) io.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('is-in')
          }
        })
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])

  return ref
}

export default useReveal
