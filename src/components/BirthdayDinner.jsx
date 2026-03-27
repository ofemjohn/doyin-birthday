import { useScrollReveal } from '../hooks/useScrollReveal'
import './BirthdayDinner.css'

export default function BirthdayDinner() {
  const [ref, isVisible] = useScrollReveal(0.15)

  return (
    <section id="birthday-dinner" className="dinner-section">
      {/* Subtle art background */}
      <div className="dinner-art-bg" />
      <div className="dinner-ambient-glow" />

      <div className="section-container">
        <div className={`dinner-layout anim ${isVisible ? 'visible' : ''}`} ref={ref}>
          
          {/* Photo side */}
          <div className="dinner-photo-frame">
            <div className="dinner-frame-border">
              <div className="dinner-frame-shine" />
              <img 
                src="/dinner.jpg" 
                alt="Doyin's Birthday Dinner" 
                className="dinner-image"
              />
            </div>
            <div className="dinner-photo-glow" />
          </div>

          {/* Text side */}
          <div className="dinner-text-side">
            <span className="dinner-tag">✨ The Night ✨</span>
            <h2 className="dinner-title">
              Birthday <span className="accent">Dinner</span>
            </h2>
            <div className="dinner-divider">
              <span className="divider-line" />
              <span className="divider-icon">🥂</span>
              <span className="divider-line" />
            </div>
            <p className="dinner-text">
              Looking absolutely stunning on your special night. 
              That smile, that elegance — you were born to shine, Doyin.
            </p>
            <div className="dinner-emoji-row">
              {['🎂', '🥂', '✨', '🌹', '💫'].map((e, i) => (
                <span 
                  key={i} 
                  className="dinner-emoji" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
