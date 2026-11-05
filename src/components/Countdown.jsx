import useCountdown from '../hooks/useCountdown.js'
import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'

const R = 54
const CIRC = 2 * Math.PI * R

/** Each unit gets its own bangle, filled to the fraction it has run. */
function Dial({ value, max, label }) {
  const fraction = max ? Math.min(1, value / max) : 0

  return (
    <div className="dial">
      <svg className="dial__svg" viewBox="0 0 130 130" aria-hidden="true">
        <circle className="dial__track" cx="65" cy="65" r={R} />
        <circle
          className="dial__fill"
          cx="65"
          cy="65"
          r={R}
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - fraction)}
        />
        {/* the thin glass bangle just inside */}
        <circle className="dial__glass" cx="65" cy="65" r={R - 10} />
      </svg>

      <div className="dial__inner">
        <span className="dial__num">{String(value).padStart(2, '0')}</span>
        <span className="dial__label">{label}</span>
      </div>
    </div>
  )
}

export default function Countdown() {
  const left = useCountdown(siteConfig.countdownTo)

  // Scale days against a 30-day month cycle so it fills proportionately
  const cells = [
    { key: 'days', label: 'Days', max: 30 },
    { key: 'hours', label: 'Hours', max: 24 },
    { key: 'minutes', label: 'Minutes', max: 60 },
    { key: 'seconds', label: 'Seconds', max: 60 },
  ]

  return (
    <Section
      id="countdown"
      tight
      eyebrow="Save the date"
      title="Counting Down"
      sub={siteConfig.hero.dateLabel}
    >
      {/* One gradient, shared by all four dials. Uses rich tones so it doesn't wash out against the ivory background. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="dialGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9d7130" />
            <stop offset="50%" stopColor="#d4a359" />
            <stop offset="100%" stopColor="#b58338" />
          </linearGradient>
        </defs>
      </svg>

      {left.done ? (
        <p className="cd-done">The day is here — celebrate with us</p>
      ) : (
        <div className="countdown stagger" role="timer">
          {cells.map((c) => (
            <Dial key={c.key} value={left[c.key]} max={c.max} label={c.label} />
          ))}
        </div>
      )}
    </Section>
  )
}
