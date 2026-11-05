import siteConfig from '../config/siteConfig.js'
import { guestName } from '../utils/share.js'
import { Arch, Feather, Floral, Lotus, Mandala, RoyalBangleCrest, Toran } from './Ornaments.jsx'
import SplitText from './SplitText.jsx'

export default function Hero({ opened = false }) {
  const { hero, couple } = siteConfig
  const guest = guestName()

  // The watermark parallax is pure CSS now (animation-timeline: scroll),
  // so there is no scroll listener left to run here.
  return (
    // `is-in` drives the word-by-word title reveal. The hero is not a
    // <Section>, so nothing else would ever set it.
    <header className={`hero${opened ? ' is-in' : ''}`} id="top">
      <Toran />

      <Mandala className="hero__mandala" size={820} />

      <div className="hero__watermark" aria-hidden="true">
        {hero.titleTamil}
      </div>

      <div className="hero__frame">
        <Arch />

        <span className="hero__finial" aria-hidden="true">
          <Lotus size={30} />
        </span>

        <span className="hero__feather hero__feather--l" aria-hidden="true">
          <Feather size={40} />
        </span>
        <span className="hero__feather hero__feather--r" aria-hidden="true">
          <Feather size={40} />
        </span>

        {guest && <p className="hero__to">Especially for {guest}</p>}

        <p className="hero__eyebrow">{hero.eyebrow}</p>

        {/* The Tamil is carried by the watermark behind the arch - printing
            it here too just repeats the same word in two scripts. */}
        <SplitText as="h1" className="hero__title foil" text={hero.titleTop} delay={0.15} />
        <p className="hero__sub">{hero.titleSub}</p>

        <div className="hero__bangles-wrap" aria-hidden="true">
          <RoyalBangleCrest width={270} />
        </div>

        <p className="hero__names">
          {couple.fatherName} <em>{couple.joiner}</em> {couple.motherName}
        </p>

        <div className="hero__meta">
          <span>{hero.dateLabel}</span>
          <i aria-hidden="true" />
          <span>{hero.cityLabel}</span>
        </div>

        <p className="hero__quote">&ldquo;{hero.quote}&rdquo;</p>

        <div className="hero__cta no-print">
          <a className="btn btn--solid" href="#events">
            The Ceremony
          </a>
          <a className="btn btn--ghost" href="#gallery">
            Our Moments
          </a>
        </div>

        {/* Inside the frame, so they spill out of the arch's lower corners. */}
        <Floral className="hero__floral hero__floral--l" size={210} />
        <Floral className="hero__floral hero__floral--r" size={210} />
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <i />
        Scroll
      </div>
    </header>
  )
}
