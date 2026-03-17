import { useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Reasons.css'

const reasons = [
  { icon: '✨', title: 'That Smile', desc: 'The way your face lights up when you smile could outshine every star in the sky. It\'s honestly one of the first things I noticed about you.' },
  { icon: '💝', title: 'Your Golden Heart', desc: 'Your kindness and compassion for others is so genuine. You have this amazing way of making everyone around you feel valued.' },
  { icon: '🔥', title: 'Your Ambition', desc: 'The way you chase your dreams with such passion and determination is incredibly inspiring. It\'s really admirable.' },
  { icon: '😂', title: 'Your Sense of Humor', desc: 'You make me laugh like nobody else. Our conversations flow so naturally and I genuinely never want them to end.' },
  { icon: '👑', title: 'Your Elegance', desc: 'Grace personified. Whether dressed up or in the simplest outfit, you carry yourself beautifully.' },
  { icon: '🌟', title: 'Your Energy', desc: 'There\'s something about your vibe that just makes everything feel lighter. Being around you is always a good time.' },
]

function ReasonCard({ reason, index }) {
  const [ref, isVisible] = useScrollReveal()
  const cardRef = useRef(null)

  // 3D tilt effect
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const card = cardRef.current
    if (!card) return

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const rx = (y - rect.height / 2) / rect.height * -8
      const ry = (x - rect.width / 2) / rect.width * 8
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`
    }
    const onLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={(el) => { cardRef.current = el; ref.current = el }}
      className={`reason-card anim ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="reason-icon">{reason.icon}</div>
      <div className="reason-number">{String(index + 1).padStart(2, '0')}</div>
      <h3>{reason.title}</h3>
      <p>{reason.desc}</p>
    </div>
  )
}

export default function Reasons() {
  const [headerRef, headerVisible] = useScrollReveal()

  return (
    <section id="reasons" className="reasons-section">
      <div className="section-container">
        <div className={`section-header anim ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
          <span className="section-tag">From My Heart</span>
          <h2 className="section-title">Why You&apos;re <span className="accent">Extraordinary</span></h2>
        </div>
        <div className="reasons-grid">
          {reasons.map((r, i) => (
            <ReasonCard key={i} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
