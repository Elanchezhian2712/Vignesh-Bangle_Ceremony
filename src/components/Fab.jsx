import { useEffect, useRef, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { copyLink, nativeShare } from '../utils/share.js'
import { downloadIcs } from '../utils/calendar.js'
import {
  CloseIcon,
  MusicIcon,
  PauseIcon,
  PinIcon,
  PlusIcon,
  CalendarIcon,
  ShareIcon,
} from './Icons.jsx'

/**
 * One control, expanding to a short menu. Replaces the old column of
 * six buttons that sat on top of the content.
 */
export default function Fab({ startMusic }) {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const rootRef = useRef(null)

  const event = siteConfig.events[0]
  const music = siteConfig.music

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(id)
  }, [toast])

  // Close on outside click or Escape - a menu that traps you is not premium.
  useEffect(() => {
    if (!open) return
    function onDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // The guest opened the invitation - that gesture lets audio start.
  useEffect(() => {
    if (!music.enabled || !startMusic || !audioRef.current) return
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [startMusic, music.enabled])

  function toggleMusic() {
    const el = audioRef.current
    if (!el) return
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    else {
      el.pause()
      setPlaying(false)
    }
  }

  async function onCopy() {
    setToast((await copyLink()) ? 'Link copied' : 'Could not copy the link')
  }

  const items = [
    music.enabled && {
      key: 'music',
      label: playing ? 'Pause' : 'Music',
      icon: playing ? <PauseIcon s={18} /> : <MusicIcon s={18} />,
      onClick: toggleMusic,
    },
    {
      key: 'share',
      label: 'Share',
      icon: <ShareIcon s={18} />,
      onClick: async () => {
        const shared = await nativeShare()
        if (!shared) onCopy()
      },
    },
    event && {
      key: 'cal',
      label: 'Calendar',
      icon: <CalendarIcon s={18} />,
      onClick: () => downloadIcs(event),
    },
    event?.mapUrl && {
      key: 'map',
      label: 'Location',
      icon: <PinIcon s={18} />,
      href: event.mapUrl,
    },
  ].filter(Boolean)

  return (
    <>
      {music.enabled && <audio ref={audioRef} src={music.src} loop preload="none" />}

      <div
        className={`fab no-print${open ? ' is-open' : ''}`}
        ref={rootRef}
      >
        <div className="fab__menu" role="menu" aria-hidden={!open}>
          {items.map((it) => (
            <div className="fab__item" key={it.key}>
              <span className="fab__label" aria-hidden="true">{it.label}</span>
              {it.href ? (
                <a
                  className="fab__btn"
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={it.label}
                  tabIndex={open ? 0 : -1}
                  role="menuitem"
                >
                  {it.icon}
                </a>
              ) : (
                <button
                  className="fab__btn"
                  onClick={it.onClick}
                  aria-label={it.label}
                  tabIndex={open ? 0 : -1}
                  role="menuitem"
                >
                  {it.icon}
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          className="fab__btn fab__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <CloseIcon s={20} /> : <PlusIcon s={20} />}
        </button>
      </div>

      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  )
}
