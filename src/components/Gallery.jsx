import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Gallery.css'

/*
  📸 DOYIN'S PHOTOS & VIDEO:
*/

const media = [
  { 
    src: '/doyin-1.jpg',
    caption: 'That Smile 😍'
  },
  { 
    src: '/doyin-video.mp4',
    isVideo: true,
    caption: 'In Her Element 🥺' 
  },
  { 
    src: '/doyin-2.jpg',
    caption: 'Stunning ✨' 
  },
  { 
    src: '/open-arms.jpg',
    caption: 'Living Free 🌊' 
  },
  { 
    src: '/doyin-3.jpg',
    caption: 'Birthday Girl 🎂' 
  },
  { 
    src: '/morroco1.jpg',
    caption: 'All The Colours 🌈' 
  },
  { 
    src: '/morroco2.jpg',
    caption: 'Beautiful Out There 🌿' 
  },
  { 
    src: '/morroco3.jpg',
    caption: 'Squad Goals 💫' 
  }
]

export default function Gallery() {
  const [ref, isVisible] = useScrollReveal()
  const trackRef = useRef(null)
  const [selectedMedia, setSelectedMedia] = useState(null)

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedMedia(null)
    }
    if (selectedMedia) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedMedia])

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-glow-bg" />
      <div className="section-container">
        <div className={`section-header anim ${isVisible ? 'visible' : ''}`} ref={ref}>
          <span className="section-tag">The Beautiful You</span>
          <h2 className="section-title">Capturing <span className="accent">Your Beauty</span></h2>
          <p className="section-subtitle">A masterpiece in every frame</p>
        </div>
        
        <div className="gallery-carousel-container">
          <div className="gallery-track" ref={trackRef}>
            {[...media, ...media, ...media].map((item, i) => (
              <div 
                key={i} 
                className={`gallery-card ${item.isVideo ? 'is-video' : ''}`}
                onClick={() => setSelectedMedia(item)}
              >
                <div className="gallery-image-wrapper">
                  {item.isVideo ? (
                    <>
                      <video src={item.src} muted loop autoPlay playsInline />
                      <div className="video-icon-badge">▶</div>
                    </>
                  ) : (
                    <img src={item.src} alt={item.caption} loading="lazy" />
                  )}
                  <div className="gallery-overlay">
                    <p className="gallery-caption">{item.caption}</p>
                    <span className="gallery-click-hint">Click to enlarge</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <div className={`gallery-modal ${selectedMedia ? 'open' : ''}`} onClick={() => setSelectedMedia(null)}>
        <button className="modal-close" onClick={() => setSelectedMedia(null)}>×</button>
        {selectedMedia && (
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {selectedMedia.isVideo ? (
              <video 
                src={selectedMedia.src} 
                controls 
                autoPlay 
                playsInline
                className="modal-media-element"
              />
            ) : (
              <img 
                src={selectedMedia.src} 
                alt={selectedMedia.caption} 
                className="modal-media-element"
              />
            )}
            <p className="modal-caption">{selectedMedia.caption}</p>
          </div>
        )}
      </div>
    </section>
  )
}
