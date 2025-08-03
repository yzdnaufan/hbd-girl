import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '../styles/ImageCarousel.css'

const ImageCarousel = ({ onNext }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Sample slides - replace with your actual images
  const slides = [
    {
      id: 1,
      content: '🎂 Happy Moments',
      background: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
      src: '/images/photo1.jpeg', alt: 'Birthday memory 1'
    },
    {
      id: 2,
      content: '🎈 Great Times',
      background: 'linear-gradient(45deg, #a8edea, #fed6e3)',
      src: '/images/photo2.jpeg', alt: 'Birthday memory 2'
    },
    {
      id: 3,
      content: '🎉 Celebrations',
      background: 'linear-gradient(45deg, #ffecd2, #fcb69f)',
      src: '/images/photo3.jpeg', alt: 'Birthday memory 3'
    },
    {
      id: 4,
      content: '🌟 Special Days',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      src: '/images/photo4.jpeg', alt: 'Birthday memory 4'
    },
    {
      id: 5,
      content: '💝 Precious Memories',
      background: 'linear-gradient(45deg, #97ff6bff, #0ce8daff)',
      src: '/images/photo5.jpeg', alt: 'Birthday memory 5'
    },
    {
      id: 6,
      content: '💝 Cute Picture',
      background: 'linear-gradient(45deg, #41e81bff, #7a280aff)',
      src: '/images/photo6.jpeg', alt: 'Birthday memory 6'
    },
    {
      id: 7,
      content: '💝 Cute Picture',
      background: 'linear-gradient(45deg, #f74201ff, #6d0e5cff)',
      src: '/images/photo7.jpeg', alt: 'Birthday memory 7'
    }
  ]

  // Auto-advance slides with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Increased from 3000 to 4000 for less frequent updates

    return () => clearInterval(interval)
  }, [slides.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [slides.length])

  // Touch/swipe support
  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
      
      if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="page carousel-page">
      <div className="carousel-content">
        <h2 className="carousel-title">📸 Memory Lane</h2>
        
        <div className="carousel-container">
          <button className="carousel-nav-btn prev" onClick={goToPrevious}>
            <ChevronLeft size={24} />
          </button>
          
          <div className="carousel-slides">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ background: slide.background }}
              >
                {/* For text content */}
                {/* <div className="slide-content">{slide.content}</div> */}
                
                <img 
                  src={slide.src} 
                  alt={slide.alt}
                  className="slide-image"
                />
                {/* For real images, use this instead:
                <img 
                  src={slide.src} 
                  alt={slide.alt}
                  className="slide-image"
                />
                */}
              </div>
            ))}
          </div>
          
          <button className="carousel-nav-btn next" onClick={goToNext}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <button className="btn" onClick={onNext}>
          See Your Wish 💫
        </button>
      </div>
    </div>
  )
}

export default ImageCarousel