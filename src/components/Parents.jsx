import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'
import { Bangles, Lotus } from './Ornaments.jsx'

function Parent({ photo, name, role, sub, fallback }) {
  return (
    <div className="parent">
      <div className="parent__ring">
        <div className="parent__photo">
          {photo ? (
            <img src={photo} alt={name} loading="lazy" />
          ) : (
            <span aria-hidden="true">{fallback}</span>
          )}
        </div>
      </div>

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
      <div className="parents stagger">
        <Parent
          photo={couple.fatherPhoto}
          name={couple.fatherName}
          role="Father-to-be"
          sub={couple.fatherParents}
          fallback="🪷"
        />

        <div className="parents__knot" aria-hidden="true">
          <Lotus size={44} petals={6} />
        </div>

        <Parent
          photo={couple.motherPhoto}
          name={couple.motherName}
          role="Mother-to-be"
          sub={couple.motherParents}
          fallback="🌸"
        />
      </div>
    </Section>
  )
}
