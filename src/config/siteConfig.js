/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE. No other file needs to change.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  // ── Page / meta ───────────────────────────────────────────
  meta: {
    title: 'Valaikaappu — Vigneshvaran N  & Devi Sri G',
    tagline: 'With hearts full of joy, we await our little one',
    favicon: '🍼',
  },

  // ── The couple / parents-to-be ────────────────────────────
  couple: {
    motherName: 'Devi Sri G',
    fatherName: 'Vigneshvaran N',
    // Shown as "Vigneshvaran N & Devi Sri G"
    joiner: '&',
    motherPhoto: '/mother.jpg',
    fatherPhoto: '/father.jpg',
    motherParents: 'D/o Mr. Gurusamy & Mrs. Kavitha',
    fatherParents: 'S/o Mr. Natarajan & Mrs. Thanabakkiyam',
  },

  // ── Hero ──────────────────────────────────────────────────
  hero: {
    eyebrow: 'Join us for our',
    titleTop: 'Valaikaappu',
    // Tamil script - shown above the title and as the huge watermark.
    titleTamil: 'வளைகாப்பு',
    titleSub: 'Bangle Ceremony',
    // Main date shown big under the title
    dateLabel: 'Sunday, 22 November 2026',
    cityLabel: 'Amman Kovil patti, Omalur, Salem, Tamil Nadu',
    quote:
      'A tiny heartbeat, a thousand dreams — bless our little one with love, laughter and a lifetime of happiness.',
  },

  // ── Countdown target (the headline event) ─────────────────
  // Local time, 24h format: YYYY-MM-DDTHH:mm:ss
  countdownTo: '2026-11-22T10:00:00',

  // ── Events ────────────────────────────────────────────────
  events: [
    {
      id: 'valaikaappu',
      icon: '🪔',
      name: 'Valaikaappu',
      tamil: 'வளைகாப்பு',
      subtitle: 'Bangle Ceremony',
      date: '2026-11-22',
      startTime: '10:00',
      endTime: '13:00',
      dateLabel: 'Sunday, 22 November 2026',
      timeLabel: '10:00 AM — 1:00 PM',
      venue: '',
      address: 'Amman Kovil patti, Omalur, Salem, Tamil Nadu 636016',
      mapUrl: 'https://goo.gl/maps/PXLC4HjbsBYDx6UD9?g_st=aw',
      note: 'Traditional bangle blessing followed by lunch.',
    },
  ],

  // ── Gallery ───────────────────────────────────────────────
  // Drop images in /public and reference as '/photo1.jpg'.
  // Leave `src` empty to render an elegant placeholder tile.
  gallery: [
    { src: '', caption: 'The moment we knew' },
    { src: '', caption: 'First scan' },
    { src: '', caption: 'Tiny socks' },
    { src: '', caption: 'Counting the days' },
  ],

  // ── RSVP ──────────────────────────────────────────────────
  rsvp: {
    // Section hidden. Flip to true to bring the RSVP form back.
    enabled: false,
    deadlineLabel: 'Kindly respond by 5 November 2026',
    // Where responses go. 'whatsapp' opens a prefilled chat.
    // Swap to 'formspree' and add endpoint for email delivery.
    mode: 'whatsapp',
    whatsappNumber: '919876543210', // country code + number, no +
    formspreeEndpoint: '', // e.g. 'https://formspree.io/f/xxxxxxx'
  },

  // ── Guessing game (a fun extra) ───────────────────────────
  guessGame: {
    // Section hidden. Flip to true to bring the guessing game back.
    enabled: false,
    title: 'Take a Guess!',
    subtitle: 'Place your bets before the big day',
  },

  // ── Wishes wall ───────────────────────────────────────────
  wishes: {
    // Section hidden. Flip to true to bring the wishes wall back.
    enabled: false,
  },

  // ── Registry / gifts ──────────────────────────────────────
  gifts: {
    enabled: true,
    message:
      'Your presence and blessings are the only gift we need. If you wish to bring something, a book for the little one’s first library would be treasured.',
  },

  // ── Contact ───────────────────────────────────────────────
  contacts: [
    { name: 'Vigneshvaran N ', phone: '+91 63825 38063' },
    { name: 'Devi Sri G', phone: '+91 63793 24339' },
  ],

  // ── Background music (optional) ───────────────────────────
  music: {
    // Put your track at public/music.mp3, then set this to true.
    // The button hides itself automatically if the file is missing.
    enabled: true,
    src: '/music.mp3',
    volume: 0.35, // 0-1; it fades up to this after the envelope opens
  },

  // ── Share ─────────────────────────────────────────────────
  share: {
    // Leave blank to auto-detect from the browser URL.
    siteUrl: '',
    message: 'You are invited to our Baby Shower! 🍼✨',
  },

  credit: 'Made with love',
}

export default siteConfig
