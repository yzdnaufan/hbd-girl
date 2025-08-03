import React, { useMemo, useEffect } from 'react'
import useCountdown from '../hooks/useCountdown'
import '../styles/Countdown.css'

const Countdown = ({ onNext, onCountdownExpired }) => {
  // Set your birthday date here (YYYY-MM-DD HH:MM:SS)
  // Using useMemo to prevent recreation of Date object on every render
  const birthdayDate = React.useMemo(() => new Date('2025-08-12 00:00:00'), [])
  const [showRestriction, setShowRestriction] = React.useState(false)
  const { timeLeft, message, isExpired } = useCountdown(birthdayDate)


  const handleRestriction = () => {
    setShowRestriction(true)
    setTimeout(() => {
      setShowRestriction(false)
    }, 3000) // Hide restriction message after 3 seconds
    
  }

  // Notify parent when countdown expires
  useEffect(() => {
    if (onCountdownExpired) {
      onCountdownExpired(isExpired)
    }
  }, [isExpired, onCountdownExpired])

  return (
    <div className="page countdown-page">
      <div className="countdown-content">
        <h2 className="countdown-title">🎂 Birthday Countdown</h2>
        
        <div className="countdown-container">
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>

        <p className="birthday-message">{message}</p>

        {showRestriction && (
          <p className="restriction-text">
            Eak dah dibuka duluan ni pasti, dasar ga sabaran.  Sabar sist, please wait for your special day! 🎉
          </p>
        )}
        
        <button className="btn" onClick={isExpired? onNext : handleRestriction} >
          {isExpired ? 'Celebrate Now! 🎊' : 'Continue 🎈'}
        </button>

        {isExpired && (
          <p className="restriction-text">
            Enjoy the song ya! 🎉
          </p>
        )}
      </div>
    </div>
  )
}

export default Countdown