# Baby Shower Invitation

A single-page invitation site in React + Vite. Modelled on the wedding-invite
format, with a few things it did not have: an envelope intro, per-guest
personalisation, an RSVP form, a guess-the-baby game, and a wishes wall.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built output locally
```

## Change the content

Everything guests see lives in **`src/config/siteConfig.js`** — names, dates,
events, venues, map links, gallery captions, contact numbers, RSVP target.
No other file needs editing for a normal setup.

### Photos

Drop images into `public/` and reference them by path:

```js
couple: { motherPhoto: '/Devi Sri G.jpg', fatherPhoto: '/Vigneshvaran N .jpg' },
gallery: [{ src: '/scan.jpg', caption: 'First scan' }, …],
```

Gallery entries with an empty `src` render as a decorative placeholder tile, so
the page looks finished before you have the photos.

### Social preview

Put a 1200×630 image at `public/preview.jpg` and update the `og:` tags in
`index.html`.

## Features

| Feature | Where |
| --- | --- |
| Envelope splash screen | `components/Intro.jsx` |
| Per-guest greeting via `?to=Name` | `utils/share.js` |
| Live countdown | `hooks/useCountdown.js` |
| Event timeline with directions | `components/Events.jsx` |
| Add to Google Calendar / `.ics` download | `utils/calendar.js` |
| Photo gallery with lightbox (arrow keys, Esc) | `components/Gallery.jsx` |
| RSVP → WhatsApp or Formspree | `components/Rsvp.jsx` |
| Guess-the-baby game with tally | `components/GuessGame.jsx` |
| Wishes wall | `components/Wishes.jsx` |
| Share dock: WhatsApp, native share, copy link, PDF | `components/ShareDock.jsx` |
| Scroll progress bar | `components/ShareDock.jsx` |
| Optional background music | `components/MusicToggle.jsx` |
| Print stylesheet (the "Save as PDF" button) | `styles/global.css` |

### Personalised links

Append `?to=` to send a named invite:

```
https://your-site.com/?to=Aunt%20Meena
```

The name appears on the envelope and in the hero.

## RSVP delivery

Two modes, set in `siteConfig.rsvp.mode`:

- **`'whatsapp'`** (default) — opens WhatsApp with the reply pre-filled to
  `whatsappNumber`. No backend, works immediately.
- **`'formspree'`** — POSTs the form as JSON. Create a form at
  [formspree.io](https://formspree.io), paste the endpoint into
  `formspreeEndpoint`.

## What is stored where

The guess game, the wishes wall, and the view counter use `localStorage`, so
they are **per browser** — each guest sees their own. That keeps the site fully
static and free to host. To make them shared across guests, point
`GuessGame.jsx` and `Wishes.jsx` at a backend (Supabase, Firebase, or a Google
Apps Script webhook) instead of `useLocalState`.

## Deploy

The build output is plain static files.

```bash
npm run build          # → dist/
```

- **Netlify / Vercel / Cloudflare Pages** — connect the repo, build command
  `npm run build`, publish directory `dist`.
- **GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.js` first,
  then publish `dist/`.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (reveals and floating confetti turn off).
- Every `localStorage` access is wrapped in `try/catch` so private windows and
  blocked site-data do not break the page.
- Fonts are the only external request; everything else is local.
