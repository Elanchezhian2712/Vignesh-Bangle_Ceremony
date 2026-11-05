import { useCallback, useState } from 'react'

/**
 * useState backed by localStorage. Every read/write is guarded -
 * private windows and blocked site-data must not break the page.
 */
export function useLocalState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initial : JSON.parse(raw)
    } catch {
      return initial
    }
  })

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved))
        } catch {
          /* storage unavailable - keep it in memory only */
        }
        return resolved
      })
    },
    [key],
  )

  return [value, set]
}

export default useLocalState
