import { useEffect, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import { guestName } from '../utils/share.js'
import { Bangles, Kolam, Lotus } from './Ornaments.jsx'

const BURST_PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i * (360 / 14) * Math.PI) / 180
  const dist = 55 + (i % 3) * 25
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    size: 6 + (i % 3) * 3,
  }
})

/**
 * Authentic Invitation Opening Experience:
 * 1. Wax seal crack with 360° golden starburst.
 * 2. 3D flap unfolds backwards.
 * 3. The royal invitation card glides up out of the envelope.
 * 4. Expands to seamlessly unveil the celebration.
 */
export default function Intro({ onOpen }) {
  const [stage, setStage] = useState('idle') // 'idle' | 'breaking' | 'extracting' | 'revealing' | 'done'
  const guest = guestName()
  const { couple, hero } = siteConfig

  useEffect(() => {
    document.body.classList.toggle('locked', stage !== 'done')
    return () => document.body.classList.remove('locked')
  }, [stage])

  function handleOpen() {
    if (stage !== 'idle') return

    // Step 1: Break seal and fold flap open
    setStage('breaking')

    // Step 2: Letter slides out of envelope
    setTimeout(() => {
      setStage('extracting')
      onOpen?.() // Start audio as the letter emerges
    }, 400)

    // Step 3: Card expands to welcome guest into hero
    setTimeout(() => {
      setStage('revealing')
    }, 1150)

    // Step 4: Finish transition
    setTimeout(() => {
      setStage('done')
    }, 1850)
  }

  if (stage === 'done') return null

  return (
    <div
      className={`intro intro--${stage}`}
      role="dialog"
      aria-label="Open your invitation"
      aria-hidden={stage !== 'idle'}
    >
      <div className="intro__inner">
        <span className="intro__bangles" aria-hidden="true">
          <Bangles size={320} rings={5} spin />
        </span>

        {/* Kolam draws on load */}
        <Kolam className="intro__kolam is-in" size={128} />

        {guest && <p className="intro__to">Dear {guest},</p>}

        {/* The 3D Envelope */}
        <div className={`envelope envelope--${stage}`} onClick={handleOpen}>
          {/* Interior back */}
          <div className="env-back" aria-hidden="true" />

          {/* Real Invitation Card that pulls out */}
          <div className="env-card" aria-hidden="true">
            <div className="env-card-inner">
              <span className="env-card-orn">🪷</span>
              <span className="env-card-eyebrow">Invitation</span>
              <h3 className="env-card-title">{hero.titleTop}</h3>
              <p className="env-card-tamil">{hero.titleTamil}</p>
              <div className="env-card-names">
                {couple.fatherName} &amp; {couple.motherName}
              </div>
              <p className="env-card-date">{hero.dateLabel}</p>
            </div>
          </div>

          {/* Front Pocket */}
          <div className="env-pocket" aria-hidden="true" />

          {/* 3D Flap */}
          <div className="env-flap" aria-hidden="true" />

          {/* Wax seal & golden starburst */}
          <div className="env-seal-wrap">
            <button
              className="env-seal"
              type="button"
              aria-label="Open the invitation seal"
              onClick={handleOpen}
            >
              <Lotus size={32} petals={6} />
            </button>
            {stage !== 'idle' && (
              <div className="env-burst" aria-hidden="true">
                {BURST_PARTICLES.map((p) => (
                  <span
                    key={p.id}
                    className="burst-dot"
                    style={{
                      '--tx': `${p.x}px`,
                      '--ty': `${p.y}px`,
                      width: p.size,
                      height: p.size,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <h1 className="intro__names">
          {couple.fatherName} {couple.joiner} {couple.motherName}
        </h1>
        <p className="intro__hint" lang="ta">
          {hero.titleTamil} · invite you to celebrate
        </p>

        <button
          className="btn btn--solid btn--open"
          onClick={handleOpen}
          disabled={stage !== 'idle'}
        >
          <span className="btn__sparkle" aria-hidden="true">✨</span> Open Invitation
        </button>
      </div>
    </div>
  )
}
