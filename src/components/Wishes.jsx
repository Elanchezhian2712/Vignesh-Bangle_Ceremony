import { useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'
import useLocalState from '../hooks/useLocalState.js'

const SEEDS = [
  { text: 'May your little one bring you endless joy and sleepless nights worth every second.', by: 'Aunt Meena' },
  { text: 'Wishing you a smooth journey and a healthy, happy baby.', by: 'The Ramesh family' },
]

/**
 * Guest wishes. Stored per-browser; hook this to a backend
 * (Firebase / Supabase / a Google Sheet webhook) to make it shared.
 */
export default function Wishes() {
  const [wishes, setWishes] = useLocalState('bs.wishes', SEEDS)
  const [form, setForm] = useState({ by: '', text: '' })
  const [error, setError] = useState('')

  if (!siteConfig.wishes.enabled) return null

  function submit(e) {
    e.preventDefault()
    if (!form.text.trim() || !form.by.trim()) {
      setError('Please add both your name and your wish.')
      return
    }
    setError('')
    setWishes((prev) =>
      [{ by: form.by.trim(), text: form.text.trim(), at: Date.now() }, ...prev].slice(0, 60),
    )
    setForm({ by: '', text: '' })
  }

  return (
    <Section
      id="wishes"
      eyebrow="Blessings"
      title="Wishes for the Baby"
      sub="Leave a note the little one can read one day."
    >
      <div className="panel" style={{ maxWidth: 620, margin: '0 auto' }}>
        <form onSubmit={submit}>
          {error && <p className="form-err">{error}</p>}

          <div className="field">
            <label htmlFor="wish-by">Your name</label>
            <input
              id="wish-by"
              value={form.by}
              onChange={(e) => setForm({ ...form, by: e.target.value })}
              placeholder="From…"
            />
          </div>

          <div className="field">
            <label htmlFor="wish-text">Your wish</label>
            <textarea
              id="wish-text"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="A blessing, an old proverb, or advice for new parents…"
              maxLength={280}
            />
          </div>

          <button className="btn btn--solid" type="submit" style={{ width: '100%' }}>
            Add my wish
          </button>
        </form>
      </div>

      {wishes.length > 0 ? (
        <div className="wishes">
          {wishes.map((w, i) => (
            <blockquote className="wish" key={`${w.by}-${w.at ?? i}`}>
              <p className="wish__text">&ldquo;{w.text}&rdquo;</p>
              <span className="wish__by">— {w.by}</span>
            </blockquote>
          ))}
        </div>
      ) : (
        <p className="wishes__empty">Be the first to leave a wish 🌸</p>
      )}
    </Section>
  )
}
