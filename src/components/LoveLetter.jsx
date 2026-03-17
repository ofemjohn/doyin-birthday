import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './LoveLetter.css'

export default function LoveLetter() {
  const [ref, isVisible] = useScrollReveal(0.2)
  const [typed, setTyped] = useState(false)
  const bodyRef = useRef(null)

  const paragraphs = [
    "I know we haven't known each other for very long, but Doyin, you've already made such an incredible impact on me. Getting to know you has felt like discovering something truly special.",
    "Your smile, your energy, the way you light up every room — I genuinely look forward to every conversation we have. You walked into my life and suddenly everything just felt brighter.",
    "I wanted to do something a little different for your birthday — something that shows you just how much I appreciate you being in my life.",
    "Happy Birthday, Doyin. I'm really glad I get to celebrate this day with you, and I can't wait to see what's ahead.",
  ]

  useEffect(() => {
    if (!isVisible || typed) return
    setTyped(true)

    const body = bodyRef.current
    if (!body) return
    const pElements = body.querySelectorAll('.letter-p')

    function typeParagraph(idx) {
      if (idx >= pElements.length) return
      const p = pElements[idx]
      const text = paragraphs[idx]
      p.style.opacity = '1'
      let charIdx = 0

      function typeChar() {
        if (charIdx < text.length) {
          p.textContent = text.substring(0, charIdx + 1)
          charIdx++
          setTimeout(typeChar, 12)
        } else {
          setTimeout(() => typeParagraph(idx + 1), 300)
        }
      }
      typeChar()
    }
    typeParagraph(0)
  }, [isVisible, typed])

  return (
    <section id="love-letter" className="love-letter-section">
      <div className="section-container">
        <div className={`letter-wrapper anim ${isVisible ? 'visible' : ''}`} ref={ref}>
          <div className="letter-card">
            <div className="letter-glow" />
            <div className="letter-top-line" />
            <div className="letter-seal">💌</div>
            <div className="letter-header">
              <span className="letter-to">Dear Doyin,</span>
            </div>
            <div className="letter-body" ref={bodyRef}>
              {paragraphs.map((_, i) => (
                <p key={i} className="letter-p" style={{ opacity: 0 }} />
              ))}
              <p className="letter-signature" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease 5s' }}>
                Warmly,<br />
                <span className="signature-name">— John 🤎</span>
              </p>
            </div>
            <div className="letter-footer">
              <div className="wax-seal">
                <span>❤️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
