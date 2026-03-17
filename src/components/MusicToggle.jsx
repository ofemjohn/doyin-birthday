import { useState, useEffect } from 'react'
import './MusicToggle.css'

export default function MusicToggle({ audioRef }) {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 1000)

    // Check if audio is already playing (started from entrance button)
    const audio = audioRef?.current
    if (audio && !audio.paused) {
      setPlaying(true)
    }

    // Listen for play/pause events
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    if (audio) {
      audio.addEventListener('play', onPlay)
      audio.addEventListener('pause', onPause)
      return () => {
        audio.removeEventListener('play', onPlay)
        audio.removeEventListener('pause', onPause)
      }
    }
  }, [audioRef])

  const toggle = () => {
    const audio = audioRef?.current
    if (!audio) return
    if (audio.paused) {
      audio.volume = 0.4
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  return (
    <button
      onClick={toggle}
      className={`music-toggle ${visible ? 'visible' : ''} ${playing ? 'playing' : ''}`}
      aria-label="Toggle background music"
      id="music-toggle"
    >
      <span className="music-icon">{playing ? '🎵' : '🔇'}</span>
      <span className="music-text">{playing ? 'Pause Music' : 'Play Music'}</span>
    </button>
  )
}
