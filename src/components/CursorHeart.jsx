import { useEffect, useRef } from 'react'
import './CursorHeart.css'

export default function CursorHeart() {
  const cursorRef = useRef(null)

  useEffect(() => {
    // Only on devices with hover
    if (window.matchMedia('(hover: none)').matches) return

    const cursor = cursorRef.current
    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0
    let animId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.opacity = '1'
    }

    const onMouseClick = (e) => {
      const emojis = ['💕', '✨', '🌹', '💖', '💗']
      for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div')
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)]
        particle.style.cssText = `
          position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
          font-size: ${14 + Math.random() * 14}px; pointer-events: none; z-index: 99998;
        `
        document.body.appendChild(particle)

        const angle = (Math.PI * 2 / 6) * i + Math.random() * 0.5
        const dist = 40 + Math.random() * 60
        const tx = Math.cos(angle) * dist
        const ty = Math.sin(angle) * dist

        particle.animate([
          { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
          { transform: `translate(${tx}px, ${ty}px) scale(1.2)`, opacity: 1, offset: 0.5 },
          { transform: `translate(${tx}px, ${ty + 20}px) scale(0)`, opacity: 0 }
        ], { duration: 800 + Math.random() * 400, easing: 'ease-out', fill: 'forwards' })
          .onfinish = () => particle.remove()
      }
    }

    function animate() {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
      animId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('click', onMouseClick)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('click', onMouseClick)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <div ref={cursorRef} className="cursor-heart">💕</div>
}
