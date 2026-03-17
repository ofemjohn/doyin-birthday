import { useEffect, useRef } from 'react'

export default function SparkleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Sparkle {
      constructor(w, h) {
        this.canvasW = w
        this.canvasH = h
        this.reset()
      }
      reset() {
        this.x = Math.random() * this.canvasW
        this.y = Math.random() * this.canvasH
        this.size = Math.random() * 2 + 0.5
        this.opacity = 0
        this.maxOpacity = Math.random() * 0.7 + 0.3
        this.fadeSpeed = Math.random() * 0.02 + 0.005
        this.phase = 'in'
        this.holdTime = 0
        this.maxHold = Math.random() * 60 + 20
        this.color = Math.random() > 0.5 ? 'rgba(212,168,83,' : 'rgba(247,168,196,'
      }
      update() {
        if (this.phase === 'in') {
          this.opacity += this.fadeSpeed
          if (this.opacity >= this.maxOpacity) { this.opacity = this.maxOpacity; this.phase = 'hold' }
        } else if (this.phase === 'hold') {
          this.holdTime++
          if (this.holdTime >= this.maxHold) this.phase = 'out'
        } else {
          this.opacity -= this.fadeSpeed
          if (this.opacity <= 0) this.reset()
        }
      }
      draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color + this.opacity + ')'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = this.color + (this.opacity * 0.15) + ')'
        ctx.fill()
      }
    }

    const count = Math.min(60, Math.floor(window.innerWidth * window.innerHeight / 20000))
    const sparkles = Array.from({ length: count }, () => new Sparkle(canvas.width, canvas.height))

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sparkles.forEach(s => { s.update(); s.draw(ctx) })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 5
      }}
    />
  )
}
