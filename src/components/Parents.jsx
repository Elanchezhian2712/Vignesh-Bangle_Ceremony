import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'
import { BangleKnot } from './Ornaments.jsx'

function ParentInfo({ name, role, sub }) {
  return (
    <div className="parent">
      <h3 className="parent__name">{name}</h3>
      <p className="parent__role">{role}</p>
      {sub && <p className="parent__sub">{sub}</p>}
    </div>
  )
}

export default function Parents() {
  const { couple } = siteConfig

  return (
    <Section
      id="parents"
      eyebrow="With love from"
      title="The Parents-to-Be"
      sub="Two hearts, and a little one on the way."
    >
      <div className="parents--single stagger">
        <div className="couple-portrait">
          <div className="couple-portrait__photo">
            <img
              src={couple.couplePhoto}
              alt={`${couple.fatherName} & ${couple.motherName}`}
              decoding="async"
            />
          </div>
        </div>

        <div className="parents__details">
          <ParentInfo
            name={couple.fatherName}
            role="Father-to-be"
            sub={couple.fatherParents}
          />

          <div className="parents__knot" aria-hidden="true">
            <BangleKnot size={62} />
          </div>

          <ParentInfo
            name={couple.motherName}
            role="Mother-to-be"
            sub={couple.motherParents}
          />
        </div>
      </div>
    </Section>
  )
}
