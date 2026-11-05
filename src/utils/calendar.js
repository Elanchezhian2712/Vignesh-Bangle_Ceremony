/** Build and download an .ics file for one event. */

function pad(n) {
  return String(n).padStart(2, '0')
}

/** '2026-11-14' + '10:00' -> '20261114T100000' (floating local time). */
function toStamp(date, time) {
  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = (time || '00:00').split(':').map(Number)
  return `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`
}

function escapeText(s = '') {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

export function buildIcs(event) {
  const start = toStamp(event.date, event.startTime)
  const end = toStamp(event.date, event.endTime || event.startTime)
  const uid = `${event.id || 'event'}-${Date.now()}@baby-shower`

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Baby Shower Invite//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toStamp(
      new Date().toISOString().slice(0, 10),
      new Date().toTimeString().slice(0, 5),
    )}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeText(event.name)}${event.subtitle ? ` - ${escapeText(event.subtitle)}` : ''}`,
    `LOCATION:${escapeText([event.venue, event.address].filter(Boolean).join(', '))}`,
    `DESCRIPTION:${escapeText(event.note || '')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadIcs(event) {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${(event.name || 'event').toLowerCase().replace(/\s+/g, '-')}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** Google Calendar link - handy on phones where .ics is awkward. */
export function googleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.name}${event.subtitle ? ` - ${event.subtitle}` : ''}`,
    dates: `${toStamp(event.date, event.startTime)}/${toStamp(
      event.date,
      event.endTime || event.startTime,
    )}`,
    details: event.note || '',
    location: [event.venue, event.address].filter(Boolean).join(', '),
    ctz: 'Asia/Kolkata',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
