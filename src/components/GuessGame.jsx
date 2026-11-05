import { useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'
import useLocalState from '../hooks/useLocalState.js'

const GENDER = [
  { value: 'boy', label: '💙 Baby boy' },
  { value: 'girl', label: '💗 Baby girl' },
  { value: 'surprise', label: '💛 A surprise!' },
]

/**
 * A light party game. Guesses live in this browser only - there is no
 * backend here, so the tally is "what this device has predicted".
 */
export default function GuessGame() {
  const { guessGame } = siteConfig
  const [guesses, setGuesses] = useLocalState('bs.guesses', [])
  const [form, setForm] = useState({ name: '', gender: 'surprise', weight: '', date: '' })
  const [error, setError] = useState('')

  if (!guessGame.enabled) return null

  function submit(e) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Add your name so we know whose guess this is.')
      return
    }
    setError('')
    setGuesses((prev) => [{ ...form, name: form.name.trim(), at: Date.now() }, ...prev].slice(0, 60))
    setForm({ name: '', gender: 'surprise', weight: '', date: '' })
  }

  const total = guesses.length
  const tally = GENDER.map((g) => ({
    ...g,
    count: guesses.filter((x) => x.gender === g.value).length,
  }))

  return (
    <Section
      id="guess"
      eyebrow="Just for fun"
      title={guessGame.title}
      sub={guessGame.subtitle}
    >
      <div className="panel" style={{ maxWidth: 620, margin: '0 auto' }}>
        <form onSubmit={submit}>
          {error && <p className="form-err">{error}</p>}

          <div className="field">
            <label htmlFor="guess-name">Your name</label>
            <input
              id="guess-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Who's guessing?"
            />
          </div>

          <div className="field">
            <label>Boy or girl?</label>
            <div className="choices">
              {GENDER.map((g) => (
                <button
                  type="button"
                  key={g.value}
                  className={`choice${form.gender === g.value ? ' is-on' : ''}`}
                  onClick={() => setForm({ ...form, gender: g.value })}
                  aria-pressed={form.gender === g.value}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 16 }}>
            <div className="field">
              <label htmlFor="guess-weight">Birth weight (kg)</label>
              <input
                id="guess-weight"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                placeholder="e.g. 3.2"
                inputMode="decimal"
              />
            </div>
            <div className="field">
              <label htmlFor="guess-date">Arrival date</label>
              <input
                id="guess-date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
          </div>

          <button className="btn btn--solid" type="submit" style={{ width: '100%' }}>
            Lock in my guess
          </button>
          <p className="form-note">Saved on this device — bring it to the party to compare!</p>
        </form>

        {total > 0 && (
          <>
            <div className="divider" aria-hidden="true" style={{ marginTop: 30 }}>
              <span>✦</span>
            </div>

            <div className="tally">
              {tally.map((row) => (
                <div className="tally__row" key={row.value}>
                  <div className="tally__top">
                    <span>{row.label}</span>
                    <span style={{ color: 'var(--ink-faint)' }}>
                      {row.count} of {total}
                    </span>
                  </div>
                  <div className="tally__bar">
                    <div
                      className="tally__fill"
                      style={{ width: total ? `${(row.count / total) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="form-note">
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => setGuesses([])}
                style={{ marginTop: 10 }}
              >
                Clear guesses
              </button>
            </p>
          </>
        )}
      </div>
    </Section>
  )
}
