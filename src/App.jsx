import { useState, useRef } from 'react'
import EntranceOverlay from './components/EntranceOverlay'
import FloatingPetals from './components/FloatingPetals'
import SparkleCanvas from './components/SparkleCanvas'
import MusicToggle from './components/MusicToggle'
import HeroSection from './components/HeroSection'
import LoveLetter from './components/LoveLetter'
import Gallery from './components/Gallery'
import Reasons from './components/Reasons'
import BirthdayWishes from './components/BirthdayWishes'
import Finale from './components/Finale'
import Countdown from './components/Countdown'
import CursorHeart from './components/CursorHeart'
import './App.css'

function App() {
  const [entered, setEntered] = useState(false)
  const audioRef = useRef(null)

  const handleEnter = () => {
    setEntered(true)

    // Start music on user gesture (this bypasses browser autoplay block)
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.4
      audio.play().catch(() => {
        // If it still fails, user can use the toggle
      })
    }
  }

  return (
    <>
      {/* 
        🎵 MUSIC FILE: 
        Place your Happy Birthday MP3 in the /public folder as "birthday-music.mp3"
        Or change the src below to any URL you want!
      */}
      <audio ref={audioRef} id="bg-music" loop preload="auto">
        <source src="/birthday-music.mp3" type="audio/mpeg" />
      </audio>

      <CursorHeart />
      <FloatingPetals />
      <SparkleCanvas />

      {!entered && <EntranceOverlay onEnter={handleEnter} />}

      {entered && (
        <>
          <MusicToggle audioRef={audioRef} />
          <main className="main-content">
            <HeroSection />
            <Countdown />
            <LoveLetter />
            <Gallery />
            <Reasons />
            <BirthdayWishes />
            <Finale />
            <footer className="site-footer">
              <p>Made with 🤎 just for you, Doyin</p>
              <p className="footer-sub">From John, with love</p>
            </footer>
          </main>
        </>
      )}
    </>
  )
}

export default App
