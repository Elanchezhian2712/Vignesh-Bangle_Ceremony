import { useCallback, useEffect, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { Lotus } from './Ornaments.jsx'
import Section from './Section.jsx'
import useTilt from '../hooks/useTilt.js'

function Tile({ item, index, hasPhoto, onOpen }) {
  const tilt = useTilt({ max: 10 })

  return (
    <button
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className={`tile${hasPhoto ? '' : ' tile--empty'}`}
      onClick={onOpen}
      aria-label={hasPhoto ? `View photo: ${item.caption}` : item.caption}
      disabled={!hasPhoto}
    >
      {hasPhoto ? (
        <img src={item.src} alt={item.caption} loading="lazy" />
      ) : (
        <span className="tile__ph" aria-hidden="true">
          <Lotus size={46} petals={index % 2 ? 6 : 8} />
        </span>
      )}
      <span className="tile__cap">{item.caption}</span>
    </button>
  )
}

/** Wrap a state change in a View Transition where the browser has one. */
function withTransition(fn) {
  if (document.startViewTransition) document.startViewTransition(fn)
  else fn()
}

export default function Gallery() {
  const photos = siteConfig.gallery.filter((p) => p.src)
  const [open, setOpen] = useState(-1)

  const close = useCallback(() => withTransition(() => setOpen(-1)), [])
  const step = useCallback(
    (delta) => setOpen((i) => (i + delta + photos.length) % photos.length),
    [photos.length],
  )

  useEffect(() => {
    if (open < 0) return
    function onKey(e) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.classList.add('locked')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('locked')
    }
  }, [open, close, step])

  return (
    <Section
      id="gallery"
      eyebrow="Our journey"
      title="Moments"
      sub="A few of the memories that led us here."
    >
      <div className="gallery">
        {siteConfig.gallery.map((item, i) => (
          <Tile
            key={`${item.caption}-${i}`}
            item={item}
            index={i}
            hasPhoto={Boolean(item.src)}
            onOpen={() => withTransition(() => setOpen(photos.indexOf(item)))}
          />
        ))}
      </div>

      {open >= 0 && photos[open] && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lightbox__close" onClick={close} aria-label="Close">
            ✕
          </button>

          {photos.length > 1 && (
            <>
              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}

          <figure style={{ margin: 0 }} onClick={(e) => e.stopPropagation()}>
            <img src={photos[open].src} alt={photos[open].caption} />
            <figcaption className="lightbox__cap">{photos[open].caption}</figcaption>
          </figure>
        </div>
      )}
    </Section>
  )
}
