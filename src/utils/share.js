import siteConfig from '../config/siteConfig.js'

/** The canonical URL for this invitation, guest param stripped. */
export function inviteUrl() {
  if (siteConfig.share.siteUrl) return siteConfig.share.siteUrl
  if (typeof window === 'undefined') return ''
  return window.location.origin + window.location.pathname
}

/** Personalise the invite for one guest: ?to=Aunt%20Meena */
export function guestName() {
  if (typeof window === 'undefined') return ''
  const raw = new URLSearchParams(window.location.search).get('to')
  if (!raw) return ''
  // Trim, cap the length, and strip anything that is not name-ish.
  return raw.replace(/[<>{}]/g, '').trim().slice(0, 40)
}

export function shareText() {
  return `${siteConfig.share.message}\n\n${inviteUrl()}`
}

export function whatsappUrl() {
  return `https://wa.me/?text=${encodeURIComponent(shareText())}`
}

/** Clipboard with a fallback for non-secure origins. */
export async function copyLink() {
  const url = inviteUrl()
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = url
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}

/** Native share sheet where available, WhatsApp otherwise. */
export async function nativeShare() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: siteConfig.meta.title,
        text: siteConfig.share.message,
        url: inviteUrl(),
      })
      return true
    } catch {
      return false // user dismissed the sheet
    }
  }
  window.open(whatsappUrl(), '_blank', 'noopener')
  return true
}

/**
 * "Download PDF" - the browser's own print-to-PDF.
 * The print stylesheet in global.css strips the interactive chrome,
 * so what comes out is a clean invitation card.
 */
export function downloadPdf() {
  window.print()
}
