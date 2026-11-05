import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'
import { googleCalendarUrl } from '../utils/calendar.js'
import { Arch, Bangles, Floral, PaisleyDivider } from './Ornaments.jsx'

function EventCard({ event }) {
  return (
    <article className="event">
      <div className="event__body">
        <Arch strokeWidth={1.4} />

        <span className="event__crest" aria-hidden="true">
          <Bangles size={62} rings={4} />
        </span>

        <h3 className="event__name">{event.name}</h3>
        {event.subtitle && <span className="event__sub">{event.subtitle}</span>}

        <div className="event__rule" aria-hidden="true">
          <PaisleyDivider width={190} />
        </div>

        <div className="event__when">
          <b>{event.dateLabel}</b>
          <i aria-hidden="true" />
          <span>{event.timeLabel}</span>
        </div>

        {event.venue && <p className="event__venue">{event.venue}</p>}
        <p className="event__addr">{event.address}</p>

        {event.note && <p className="event__note">{event.note}</p>}

        <div className="event__actions no-print">
          {event.mapUrl && (
            <a
              className="btn btn--solid btn--sm"
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions
            </a>
          )}
          <a
            className="btn btn--ghost btn--sm"
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Calendar
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Events() {
  const many = siteConfig.events.length > 1

  return (
    <Section
      id="events"
      eyebrow={many ? 'Programme' : 'The occasion'}
      title={many ? 'Celebrations' : 'The Ceremony'}
      sub="We would be honoured to have you with us."
      dark
    >
      <Floral className="band__floral band__floral--tl" size={230} />
      <Floral className="band__floral band__floral--br" size={230} />

      <div className="timeline stagger">
        {siteConfig.events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </Section>
  )
}
