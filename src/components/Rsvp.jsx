import { useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'
import useLocalState from '../hooks/useLocalState.js'
import { guestName } from '../utils/share.js'

const ATTENDING = [
  { value: 'yes', label: '🎉 Joyfully attending' },
  { value: 'no', label: '💌 Sending blessings' },
]

export default function Rsvp() {
  const { rsvp, events } = siteConfig
  const [sent, setSent] = useLocalState('bs.rsvp.sent', null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({
    name: guestName(),
    phone: '',
    attending: 'yes',
    guests: '1',
    which: events[0]?.id ?? '',
    message: '',
  })

  if (!rsvp.enabled) return null

  const manyEvents = events.length > 1

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function summary() {
    const event = events.find((e) => e.id === form.which)
    const attending = form.attending === 'yes' ? 'Attending' : 'Unable to attend'
    return [
      'RSVP — Baby Shower',
      `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      `Response: ${attending}`,
      form.attending === 'yes' && `Guests: ${form.guests}`,
      form.attending === 'yes' && event && `Event: ${event.name} (${event.dateLabel})`,
      form.message && `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  async function submit(e) {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) {
      setError('Please tell us your name.')
      return
    }

    if (rsvp.mode === 'formspree' && rsvp.formspreeEndpoint) {
      setBusy(true)
      try {
        const res = await fetch(rsvp.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...form, summary: summary() }),
        })
        if (!res.ok) throw new Error('Request failed')
        setSent({ name: form.name, attending: form.attending })
      } catch {
        setError('Could not send just now. Please try again, or call us directly.')
      } finally {
        setBusy(false)
      }
      return
    }

    // Default: hand off to WhatsApp with the message pre-filled.
    const url = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(summary())}`
    window.open(url, '_blank', 'noopener')
    setSent({ name: form.name, attending: form.attending })
  }

  return (
    <Section
      id="rsvp"
      eyebrow="Your reply"
      title="Will You Join Us?"
      sub={rsvp.deadlineLabel}
    >
      <div className="panel" style={{ maxWidth: 620, margin: '0 auto' }}>
        {sent ? (
          <div className="toast-ok">
            <div className="toast-ok__icon" aria-hidden="true">
              {sent.attending === 'yes' ? '🎉' : '💌'}
            </div>
            <h3 className="toast-ok__title">Thank you, {sent.name}!</h3>
            <p className="toast-ok__msg">
              {sent.attending === 'yes'
                ? 'We cannot wait to celebrate with you. See you there!'
                : 'We will miss you — thank you for your blessings.'}
            </p>
            <button className="btn btn--ghost btn--sm" onClick={() => setSent(null)}>
              Send another response
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            {error && <p className="form-err">{error}</p>}

            <div className="grid-2">
              <div className="field">
                <label htmlFor="rsvp-name">Your name</label>
                <input
                  id="rsvp-name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="e.g. Meena Rajan"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="rsvp-phone">Phone (optional)</label>
                <input
                  id="rsvp-phone"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="+91 …"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="field">
              <label>Will you be there?</label>
              <div className="choices">
                {ATTENDING.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`choice${form.attending === opt.value ? ' is-on' : ''}`}
                    onClick={() => update('attending', opt.value)}
                    aria-pressed={form.attending === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {form.attending === 'yes' && (
              <div className={manyEvents ? 'grid-2' : undefined}>
                <div className="field">
                  <label htmlFor="rsvp-guests">Number of guests</label>
                  <select
                    id="rsvp-guests"
                    value={form.guests}
                    onChange={(e) => update('guests', e.target.value)}
                  >
                    {['1', '2', '3', '4', '5', '6+'].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Only worth asking when there is more than one ceremony. */}
                {manyEvents && (
                  <div className="field">
                    <label htmlFor="rsvp-which">Which event</label>
                    <select
                      id="rsvp-which"
                      value={form.which}
                      onChange={(e) => update('which', e.target.value)}
                    >
                      {events.map((ev) => (
                        <option key={ev.id} value={ev.id}>
                          {ev.name} — {ev.dateLabel}
                        </option>
                      ))}
                      <option value="all">All events</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="field">
              <label htmlFor="rsvp-msg">A note for the parents-to-be</label>
              <textarea
                id="rsvp-msg"
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Optional — a line of blessing or a dietary note"
                maxLength={500}
              />
            </div>

            <button className="btn btn--solid" type="submit" disabled={busy} style={{ width: '100%' }}>
              {busy ? 'Sending…' : 'Send RSVP'}
            </button>

            <p className="form-note">
              {siteConfig.rsvp.mode === 'whatsapp'
                ? 'This opens WhatsApp with your reply ready to send.'
                : 'Your reply is sent straight to the family.'}
            </p>
          </form>
        )}
      </div>
    </Section>
  )
}
