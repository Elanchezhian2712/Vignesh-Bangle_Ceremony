import useReveal from '../hooks/useReveal.js'
import { Kolam, PaisleyDivider } from './Ornaments.jsx'
import SplitText from './SplitText.jsx'

/** A revealing <section> with a kolam behind its heading. */
export default function Section({
  id,
  eyebrow,
  title,
  sub,
  divider = true,
  kolam = true,
  tight = false,
  dark = false,
  children,
}) {
  const ref = useReveal()

  return (
    <section
      id={id}
      ref={ref}
      className={`section reveal${tight ? ' section--tight' : ''}${dark ? ' section--dark' : ''}`}
    >
      {(eyebrow || title) && (
        <header className="sec-head">
          {kolam && (
            <span className="sec-head__kolam" aria-hidden="true">
              <Kolam size={190} />
            </span>
          )}
          {eyebrow && <p className="sec-eyebrow">{eyebrow}</p>}
          {title && <SplitText as="h2" className="sec-title" text={title} delay={0.05} />}
          {divider && (
            <div className="sec-divider" aria-hidden="true">
              <PaisleyDivider width={230} />
            </div>
          )}
          {sub && <p className="sec-sub">{sub}</p>}
        </header>
      )}
      {children}
    </section>
  )
}
