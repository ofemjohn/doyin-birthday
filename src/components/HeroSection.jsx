import { useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './HeroSection.css'

export default function HeroSection() {
  const [ref, isVisible] = useScrollReveal()
  const contentRef = useRef(null)

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current
      if (!el) return
      const scrollY = window.scrollY
      if (scrollY < window.innerHeight) {
        const opacity = 1 - scrollY / (window.innerHeight * 0.8)
        const translateY = scrollY * 0.3
        el.style.transform = `translateY(${translateY}px)`
        el.style.opacity = Math.max(0, opacity)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="hero" className="hero-section" ref={ref}>
      <div className="hero-bg-overlay" />
      <div className="hero-roses-left" />
      <div className="hero-roses-right" />
      <div className="hero-content" ref={contentRef}>
        <div className={`hero-badge anim ${isVisible ? 'visible' : ''}`}>
          <div className="hero-heart-3d">
            <div className="heart-3d-inner">❤️</div>
          </div>
        </div>
        <p className={`hero-pre-title anim ${isVisible ? 'visible' : ''}`}>✨ March 29th ✨</p>
        <h1 className={`hero-title anim ${isVisible ? 'visible' : ''}`}>
          <span className="title-line">Happy</span>
          <span className="title-line title-accent">Birthday</span>
          <span className="title-line title-name">Doyin</span>
        </h1>
        <div className={`hero-divider anim ${isVisible ? 'visible' : ''}`}>
          <span className="divider-rose">🌹</span>
          <span className="divider-line" />
          <span className="divider-heart">💖</span>
          <span className="divider-line" />
          <span className="divider-rose">🌹</span>
        </div>
        <p className={`hero-subtitle anim ${isVisible ? 'visible' : ''}`}>
          Celebrating someone truly special today
        </p>
        <div className={`scroll-indicator anim ${isVisible ? 'visible' : ''}`}>
          <div className="scroll-mouse">
            <div className="scroll-dot" />
          </div>
          <span>Scroll Down</span>
        </div>
      </div>
    </section>
  )
}
