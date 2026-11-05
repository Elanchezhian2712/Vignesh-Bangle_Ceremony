import { useEffect, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { copyLink, nativeShare, whatsappUrl } from '../utils/share.js'
import { googleCalendarUrl } from '../utils/calendar.js'
import { WhatsAppIcon } from './Icons.jsx'

export default function ShareDock() {
  const [toast, setToast] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(id)
  }, [toast])

  async function onCopy() {
    setToast((await copyLink()) ? 'Link copied ✓' : 'Copy failed — long-press the address bar')
  }

  const headline = siteConfig.events[0]

  const buttons = [
    {
      key: 'wa',
      label: 'WhatsApp',
      icon: <WhatsAppIcon />,
      className: 'dock__btn dock__btn--wa',
      href: whatsappUrl(),
    },
    { key: 'share', label: 'Share', icon: '↗', onClick: () => nativeShare() },
    { key: 'copy', label: 'Copy link', icon: '🔗', onClick: onCopy },
    {
      key: 'cal',
      label: 'Add to Google Calendar',
      icon: '📅',
      // An anchor, not a download - it opens Google Calendar with the
      // ceremony prefilled, matching the button on the event card.
      href: headline ? googleCalendarUrl(headline) : undefined,
    },
    {
      key: 'top',
      label: 'Back to top',
      icon: '↑',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
  ]

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <nav className="dock no-print" aria-label="Share and actions">
        {buttons.map((b) => (
          <div className="dock__item" key={b.key}>
            <span className="dock__label" aria-hidden="true">
              {b.label}
            </span>
            {b.href ? (
              <a
                className={b.className || 'dock__btn'}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={b.label}
              >
                {b.icon}
              </a>
            ) : (
              <button
                className={b.className || 'dock__btn'}
                onClick={b.onClick}
                aria-label={b.label}
              >
                {b.icon}
              </button>
            )}
          </div>
        ))}
      </nav>

      {toast && <div className="copied-toast" role="status">{toast}</div>}
    </>
  )
}
