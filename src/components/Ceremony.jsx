import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'
import { googleCalendarUrl } from '../utils/calendar.js'
import { Bangles, PaisleyDivider } from './Ornaments.jsx'
import { CalendarIcon, ClockIcon, PinIcon } from './Icons.jsx'

function Fact({ icon, label, value, sub }) {
  return (
    <div className="fact">
      <span className="fact__ico" aria-hidden="true">{icon}</span>
      <span>
        <span className="fact__l">{label}</span>
        <span className="fact__v">
          {value}
          {sub && <small>{sub}</small>}
        </span>
      </span>
    </div>
  )
}

export default function Ceremony() {
  const event = siteConfig.events[0]
  if (!event) return null

  return (
    <Section
      id="ceremony"
      sides
      eyebrow="The occasion"
      title="The Ceremony"
      sub="We would be honoured to have you with us."
    >
      <article className="event">
        <span className="event__badge" aria-hidden="true">
          <Bangles size={34} rings={3} />
        </span>

        <h3 className="event__name">{event.name}</h3>
        {event.tamil && (
          <p className="event__tamil" lang="ta">{event.tamil}</p>
        )}
        {event.subtitle && <span className="event__sub">{event.subtitle}</span>}

        <div className="event__rule" aria-hidden="true">
          <PaisleyDivider width={170} />
        </div>

        <div className="facts">
          <Fact icon={<CalendarIcon s={17} />} label="Date" value={event.dateLabel} />
          <Fact icon={<ClockIcon s={17} />} label="Time" value={event.timeLabel} />
          <Fact
            icon={<PinIcon s={17} />}
            label="Venue"
            value={event.venue || event.address}
            sub={event.venue ? event.address : undefined}
          />
        </div>

        {event.note && <p className="event__note">{event.note}</p>}

        <div className="btn__row event__cta no-print">
          {event.mapUrl && (
            <a
              className="btn btn--fill"
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          )}
          <a
            className="btn"
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Calendar
          </a>
        </div>
      </article>
    </Section>
  )
}
