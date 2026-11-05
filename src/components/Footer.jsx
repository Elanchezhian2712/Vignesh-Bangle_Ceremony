import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'
import { Bangles, PaisleyDivider } from './Ornaments.jsx'

function Gifts() {
  if (!siteConfig.gifts.enabled) return null
  return (
    <Section id="gifts" eyebrow="A small note" title="Gifts &amp; Blessings">
      <div className="gift">
        <div className="gift__orn" aria-hidden="true">
          <Bangles size={70} rings={4} spin />
        </div>
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
          <a className="contact" key={c.phone} href={`tel:${c.phone.replace(/\s/g, '')}`}>
            <b>{c.name}</b>
            <span>{c.phone}</span>
          </a>
        ))}
      </div>
    </Section>
  )
}

export default function Footer() {
  const { couple, credit, hero } = siteConfig

  return (
    <>
      <Gifts />
      <Contacts />

      <footer className="footer">
        <div className="footer__orn" aria-hidden="true">
          <PaisleyDivider width={260} />
        </div>
        <p className="footer__names">
          {couple.fatherName} {couple.joiner} {couple.motherName}
        </p>
        <p className="footer__line">
          {hero.dateLabel} · {hero.cityLabel}
        </p>
        <p className="footer__credit">{credit}</p>
      </footer>
    </>
  )
}
