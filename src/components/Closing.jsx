import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'
import { Lotus, PaisleyDivider } from './Ornaments.jsx'
import { PhoneIcon } from './Icons.jsx'

function Gifts() {
  if (!siteConfig.gifts.enabled) return null
  return (
    <Section id="gifts" eyebrow="A small note" title="Gifts &amp; Blessings">
      <div className="gift">
        <Lotus className="gift__orn orn--float" size={40} petals={8} />
        <p className="gift__msg">{siteConfig.gifts.message}</p>
      </div>
    </Section>
  )
}

function Contacts() {
  if (!siteConfig.contacts.length) return null
  return (
    <Section id="contact" tight eyebrow="Questions?" title="Reach Us">
      <div className="contacts stagger">
        {siteConfig.contacts.map((c) => (
          <a
            className="ccard"
            key={c.phone}
            href={`tel:${c.phone.replace(/[^\d+]/g, '')}`}
            aria-label={`Call ${c.name} on ${c.phone}`}
          >
            <span className="ccard__ico" aria-hidden="true">
              <PhoneIcon s={19} />
            </span>
            <span>
              <span className="ccard__n">{c.name}</span>
              <span className="ccard__p">{c.phone}</span>
            </span>
          </a>
        ))}
      </div>
    </Section>
  )
}

export default function Closing() {
  const { couple, hero } = siteConfig

  return (
    <>
      <Gifts />
      <Contacts />

      <footer className="closing">
        <div className="closing__orn" aria-hidden="true">
          <PaisleyDivider width={200} />
        </div>

        <p className="closing__names">
          {couple.fatherName} <em>&amp;</em> {couple.motherName}
        </p>

        <p className="closing__meta">
          {hero.dateLabel}
          <br />
          {hero.cityLabel}
        </p>

        <p className="closing__love">With Love</p>
      </footer>
    </>
  )
}
