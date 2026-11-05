import { useEffect, useState } from 'react'

function diff(target) {
  const ms = target - Date.now()
  if (ms <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  const s = Math.floor(ms / 1000)
  return {
    done: false,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

/** Ticking countdown to an ISO local datetime string. */
export function useCountdown(isoString) {
  const target = new Date(isoString).getTime()
  const [left, setLeft] = useState(() => diff(target))

  useEffect(() => {
    if (Number.isNaN(target)) return
    const id = setInterval(() => setLeft(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return left
}

export default useCountdown
