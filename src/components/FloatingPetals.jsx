import { useEffect, useRef, useCallback } from 'react'
import './FloatingPetals.css'

// Rich variety of roses, flowers, hearts, and petals
const PETAL_ITEMS = [
  // Rose petal - pink
  `<svg viewBox="0 0 40 40" width="56" height="56"><defs><radialGradient id="pg1" cx="30%" cy="30%"><stop offset="0%" stop-color="#f7a8c4"/><stop offset="100%" stop-color="#c4365a"/></radialGradient></defs><ellipse cx="20" cy="22" rx="14" ry="18" fill="url(#pg1)" opacity="0.85"/></svg>`,
  // Rose petal - deep red
  `<svg viewBox="0 0 30 30" width="44" height="44"><defs><radialGradient id="pg3" cx="30%" cy="30%"><stop offset="0%" stop-color="#e85a7a"/><stop offset="100%" stop-color="#8b1a3a"/></radialGradient></defs><ellipse cx="15" cy="16" rx="10" ry="14" fill="url(#pg3)" opacity="0.8"/></svg>`,
  // Smaller soft petal
  `<svg viewBox="0 0 30 30" width="36" height="36"><defs><radialGradient id="pg2" cx="40%" cy="30%"><stop offset="0%" stop-color="#fde4ee"/><stop offset="100%" stop-color="#e8527a"/></radialGradient></defs><ellipse cx="15" cy="16" rx="10" ry="14" fill="url(#pg2)" opacity="0.75"/></svg>`,
  // Heart
  `<svg viewBox="0 0 30 30" width="44" height="44"><path d="M15 26 C5 18,0 10,8 5 C12 2,15 6,15 10 C15 6,18 2,22 5 C30 10,25 18,15 26Z" fill="#e8527a" opacity="0.7"/></svg>`,
  // Gold petal
  `<svg viewBox="0 0 30 30" width="40" height="40"><defs><radialGradient id="pg4" cx="30%" cy="30%"><stop offset="0%" stop-color="#f0cc7a"/><stop offset="100%" stop-color="#d4a853"/></radialGradient></defs><ellipse cx="15" cy="16" rx="9" ry="13" fill="url(#pg4)" opacity="0.7"/></svg>`,
  // Emoji alternatives (rendered as text in divs)
  'EMOJI:🌹',
  'EMOJI:🌸',
  'EMOJI:🌺',
  'EMOJI:🌷',
  'EMOJI:💐',
  'EMOJI:🌹',
  'EMOJI:💕',
  'EMOJI:🌸',
  'EMOJI:🪻',
  'EMOJI:🌹',
  'EMOJI:🪷',
  'EMOJI:🌹',
]

export default function FloatingPetals() {
  const containerRef = useRef(null)

  const createPetal = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const item = PETAL_ITEMS[Math.floor(Math.random() * PETAL_ITEMS.length)]
    const petal = document.createElement('div')
    petal.classList.add('petal')

    if (item.startsWith('EMOJI:')) {
      // Emoji flower/rose
      const emoji = item.replace('EMOJI:', '')
      petal.textContent = emoji
      petal.classList.add('petal-emoji')
      petal.style.fontSize = (32 + Math.random() * 32) + 'px'
    } else {
      // SVG petal
      petal.innerHTML = item
    }

    const startX = Math.random() * window.innerWidth
    const drift = (Math.random() - 0.5) * 250
    const rotation = Math.random() * 720 - 360
    const duration = 7 + Math.random() * 10
    const delay = Math.random() * 2

    petal.style.left = startX + 'px'
    petal.style.setProperty('--drift', drift + 'px')
    petal.style.setProperty('--rotation', rotation + 'deg')
    petal.style.animationDuration = duration + 's'
    petal.style.animationDelay = delay + 's'

    container.appendChild(petal)
    setTimeout(() => petal.remove(), (duration + delay) * 1000)
  }, [])

  useEffect(() => {
    const interval = setInterval(createPetal, 500)
    // Initial burst
    for (let i = 0; i < 10; i++) {
      setTimeout(createPetal, i * 150)
    }
    return () => clearInterval(interval)
  }, [createPetal])

  return <div ref={containerRef} className="petals-container" />
}
