/**
 * Editorial line reveal: each word rides up from behind a mask, one
 * after another, the way a printed line settles onto the page.
 * The whole string stays in the accessibility tree as one label.
 */
export default function SplitText({ text, as: Tag = 'span', className = '', delay = 0 }) {
  const words = String(text).split(' ')

  return (
    <Tag className={`split ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span className="split__mask" key={`${word}-${i}`} aria-hidden="true">
          <span className="split__word" style={{ transitionDelay: `${delay + i * 0.07}s` }}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
