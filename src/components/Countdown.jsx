import { useScrollReveal } from '../hooks/useScrollReveal'
import './Countdown.css'

export default function Countdown() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="celebration" className="countdown-section">
      <div className="section-container">
        <div className={`countdown-wrapper anim ${isVisible ? 'visible' : ''}`} ref={ref}>
          <div className="celebration-badge">🎂</div>
          <h2 className="countdown-title">
            Today Is <span className="accent">Your Day!</span>
          </h2>
          <p className="countdown-subtitle">
            March 29th — A day worth celebrating
          </p>
          <div className="birthday-today-emojis">
            {['🎂', '🎉', '🎊', '👑', '🌹', '💖', '✨', '🎁'].map((e, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{e}</span>
            ))}
          </div>
          <p className="celebration-message">
            Today is all about you, Doyin. Happy Birthday! 🎉
          </p>
        </div>
      </div>
    </section>
  )
}
