import siteConfig from '../config/siteConfig.js'
import Section from './Section.jsx'

/** A compact vertical timeline - the story, without the empty space. */
export default function Journey() {
  const { journey } = siteConfig
  if (!journey?.enabled || !journey.steps?.length) return null

  return (
    <Section
      id="journey"
      sides
      eyebrow="Our moments"
      title="Our Journey"
      sub="A few steps that brought us here."
    >
      <ol className="journey stagger">
        {journey.steps.map((step) => (
          <li className="step" key={step.title}>
            <span className="step__dot" aria-hidden="true" />
            <span className="step__when">{step.when}</span>
            <h3 className="step__t">{step.title}</h3>
            <p className="step__d">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
