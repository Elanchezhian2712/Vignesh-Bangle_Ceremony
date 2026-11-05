import { useEffect, useRef, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import useLocalState from '../hooks/useLocalState.js'

/**
 * Background music. Never autoplays cold - it waits for the guest to
 * open the envelope, which is the gesture browsers require. Volume
 * fades in rather than cutting on, and the guest's mute choice sticks.
 */
export default function MusicToggle({ startSignal }) {
  const { music } = siteConfig
  const audioRef = useRef(null)
  const fadeRef = useRef(0)

  const [playing, setPlaying] = useState(false)
  const [broken, setBroken] = useState(false)
  const [muted, setMuted] = useLocalState('bs.music.muted', false)

  /** Ramp to a target volume over ~1.2s so nothing startles anyone. */
  function fadeTo(target, done) {
    const el = audioRef.current
    if (!el) return
    clearInterval(fadeRef.current)
    const step = (target - el.volume) / 24
    fadeRef.current = setInterval(() => {
      const next = el.volume + step
      if ((step > 0 && next >= target) || (step < 0 && next <= target)) {
        el.volume = Math.min(1, Math.max(0, target))
        clearInterval(fadeRef.current)
        done?.()
      } else {
        el.volume = Math.min(1, Math.max(0, next))
      }
    }, 50)
  }

  // Start once the invitation is opened, unless the guest muted it before.
  useEffect(() => {
    const el = audioRef.current
    if (!music.enabled || !startSignal || !el || muted || broken) return

    el.volume = 0
    el.play()
      .then(() => {
        setPlaying(true)
        fadeTo(music.volume ?? 0.4)
      })
      .catch(() => setPlaying(false)) // browser declined; the button still works
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startSignal, music.enabled, broken])

  useEffect(() => () => clearInterval(fadeRef.current), [])

  if (!music.enabled || broken) return null

  function toggle() {
    const el = audioRef.current
    if (!el) return

    if (el.paused) {
      el.volume = 0
      el.play()
        .then(() => {
          setPlaying(true)
          setMuted(false)
          fadeTo(music.volume ?? 0.4)
        })
        .catch(() => setPlaying(false))
    } else {
      fadeTo(0, () => {
        el.pause()
        setPlaying(false)
      })
      setMuted(true)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="auto"
        onError={() => setBroken(true)}
      />

      <div className="music no-print">
        <button
          className={`music__btn${playing ? ' is-playing' : ''}`}
          onClick={toggle}
          aria-label={playing ? 'Pause music' : 'Play music'}
          title={playing ? 'Pause music' : 'Play music'}
        >
          {/* Equaliser bars: they dance while playing, rest when paused. */}
          <span className="music__bars" aria-hidden="true">
            <i /><i /><i /><i />
          </span>
        </button>
      </div>
    </>
  )
}
