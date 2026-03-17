import { useRef } from 'react'
import './EntranceOverlay.css'

export default function EntranceOverlay({ onEnter }) {
  const overlayRef = useRef(null)

  const handleClick = () => {
    const overlay = overlayRef.current
    if (overlay) {
      overlay.classList.add('hidden')
      setTimeout(onEnter, 800)
    }
  }

  return (
    <div ref={overlayRef} className="entrance-overlay">
      <div className="entrance-content">
        <div className="entrance-heart-container">
          <div className="heart-3d-pulse">
            <span className="heart-main">❤️</span>
            <span className="heart-ring ring-1"></span>
            <span className="heart-ring ring-2"></span>
            <span className="heart-ring ring-3"></span>
          </div>
        </div>
        <div className="entrance-stars">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="entrance-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <h2 className="entrance-subtitle">A Special Message Awaits</h2>
        <p className="entrance-hint">Tap to unwrap your surprise</p>
        <button onClick={handleClick} className="enter-btn" id="enter-btn">
          <span>Open My Gift</span>
          <span className="btn-sparkle">✨</span>
        </button>
      </div>
    </div>
  )
}
