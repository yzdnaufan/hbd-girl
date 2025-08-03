import React, { useState } from 'react'
import './App.css'
import MainPage from './components/MainPage'
import Countdown from './components/Countdown'
import ImageCarousel from './components/ImageCarousel'
import Wish from './components/Wish'
import AudioControls from './components/AudioControls'
import Particles from './components/Particles'

const PAGES = {
  MAIN: 'main',
  COUNTDOWN: 'countdown',
  CAROUSEL: 'carousel',
  WISH: 'wish'
}

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.MAIN)
  const [showParticles, setShowParticles] = useState(false)
  const [isCountdownExpired, setIsCountdownExpired] = useState(false)

  const navigateToPage = (page) => {
    setCurrentPage(page)
    // Show particles on countdown, carousel, and wish pages
    if (page === PAGES.COUNTDOWN || page === PAGES.CAROUSEL || page === PAGES.WISH) {
      setShowParticles(true)
    } else {
      setShowParticles(false)
    }
  }

  const goToMain = () => {
    navigateToPage(PAGES.MAIN)
    // Reset countdown expired state when going back to main
    setIsCountdownExpired(false)
  }
  const goToCountdown = () => navigateToPage(PAGES.COUNTDOWN)
  const goToCarousel = () => navigateToPage(PAGES.CAROUSEL)
  const goToWish = () => navigateToPage(PAGES.WISH)

  const handleCountdownExpired = (expired) => {
    setIsCountdownExpired(expired)
  }

  return (
    <div className="app">
      {showParticles && <Particles isBirthday={isCountdownExpired} />}
      <AudioControls autoPlay={isCountdownExpired} />
      
      {currentPage === PAGES.MAIN && (
        <MainPage onNext={goToCountdown} />
      )}
      
      {currentPage === PAGES.COUNTDOWN && (
        <Countdown onNext={goToCarousel} onCountdownExpired={handleCountdownExpired} />
      )}
      
      {currentPage === PAGES.CAROUSEL && (
        <ImageCarousel onNext={goToWish} />
      )}
      
      {currentPage === PAGES.WISH && (
        <Wish onRestart={goToMain} />
      )}
    </div>
  )
}

export default App