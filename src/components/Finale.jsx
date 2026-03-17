import { useEffect, useCallback } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Finale.css'

export default function Finale() {
  const [ref, isVisible] = useScrollReveal(0.3)

  const launchConfetti = useCallback(() => {
    const colors = ['#c4365a', '#f7a8c4', '#d4a853', '#e8527a', '#fde4ee', '#f0cc7a']
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        const size = Math.random() * 8 + 4
        const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 200
        const color = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.cssText = `
          position: fixed; left: ${startX}px; top: 50%;
          width: ${size}px; height: ${size * 1.5}px;
          background: ${color}; border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
          pointer-events: none; z-index: 9999;
        `
        document.body.appendChild(confetti)

        const angle = Math.random() * Math.PI * 2
        const velocity = 200 + Math.random() * 300
        confetti.animate([
          { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
          { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity - 300}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
          duration: 1500 + Math.random() * 1000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fill: 'forwards'
        }).onfinish = () => confetti.remove()
      }, i * 20)
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      setTimeout(launchConfetti, 500)
    }
  }, [isVisible, launchConfetti])

  return (
    <section id="finale" className="finale-section">
      <div className="finale-bg" />
      <div className="section-container">
        <div className={`finale-content anim ${isVisible ? 'visible' : ''}`} ref={ref}>
          <div className="finale-hearts-burst">
            {['❤️', '💕', '💖', '💗', '❤️', '💕', '💖', '💗'].map((heart, i) => (
              <span
                key={i}
                className="burst-heart"
                style={{
                  '--angle': `${i * 45}deg`,
                  '--delay': `${i * 0.15}s`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {heart}
              </span>
            ))}
          </div>
          <h2 className="finale-title">You&apos;re Pretty <span className="accent">Amazing</span></h2>
          <p className="finale-text">
            Doyin, I know we&apos;re still getting to know each other, but I already feel so lucky
            to have you in my life. You&apos;re one of a kind, and I&apos;m really glad I get to
            be here celebrating your special day. Happy Birthday — here&apos;s to many more great
            moments together. 🥂
          </p>
          <div className="finale-emoji-burst">
            {['🌹', '💕', '🎂', '✨', '🎉', '💐', '🌹'].map((e, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
            ))}
          </div>
          <p className="finale-signature">
            Happy Birthday, Doyin 🤎<br />
            <span className="signature-heart">— John</span>
          </p>
        </div>
      </div>
    </section>
  )
}
