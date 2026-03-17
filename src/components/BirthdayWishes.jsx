import { useScrollReveal } from '../hooks/useScrollReveal'
import './BirthdayWishes.css'

const wishes = [
  'I wish you boundless happiness that overflows into every area of your life',
  'I wish you the strength to conquer every challenge and to shine even brighter',
  'I wish you all the good things you deserve — and trust me, you deserve a lot',
  'I wish you adventures that fill your soul and memories that last a lifetime',
  'I wish you peace of mind, knowing you are appreciated more than you know',
]

function WishItem({ text, index }) {
  const [ref, isVisible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`wish-item anim ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="wish-candle">🕯️</div>
      <p>{text}</p>
    </div>
  )
}

export default function BirthdayWishes() {
  const [headerRef, headerVisible] = useScrollReveal()

  return (
    <section id="wishes" className="wishes-section">
      <div className="section-container">
        <div className={`section-header anim ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
          <span className="section-tag">Birthday Wishes</span>
          <h2 className="section-title">My Wishes <span className="accent">For You</span></h2>
        </div>
        <div className="wishes-container">
          {wishes.map((w, i) => (
            <WishItem key={i} text={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
