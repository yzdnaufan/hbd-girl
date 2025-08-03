import React, { useMemo, useEffect } from 'react'
import useCountdown from '../hooks/useCountdown'
import '../styles/Countdown.css'

const Countdown = ({ onNext, onCountdownExpired }) => {
  // Set your birthday date here (YYYY-MM-DD HH:MM:SS)
  // Using useMemo to prevent recreation of Date object on every render
  const birthdayDate = React.useMemo(() => new Date('2025-08-12 00:00:00'), [])
  const [showRestriction, setShowRestriction] = React.useState(false)
  const [showYay, setShowYay] = React.useState(false)
  const [showNay, setShowNay] = React.useState(false)
  const { timeLeft, message, isExpired } = useCountdown(birthdayDate)

  const [password, setPassword] = React.useState('')
  const [passwordError, setPasswordError] = React.useState(true)

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === '12082002') {
      setPasswordError(false)
      setShowYay(true)
    } else {
      setPasswordError(true)
      setShowNay(true)
        setTimeout(() => {
            setShowNay(false)
        }, 3000) // Reset after 3 seconds
    }
  }


  const handleRestriction = () => {
    setShowRestriction(true)
    setTimeout(() => {
      setShowRestriction(false)
    }, 3000) // Hide restriction message after 3 seconds

    console.log(passwordError);
    
  }


  // Notify parent when countdown expires
  useEffect(() => {
    console.log("Password?",passwordError);
    if (onCountdownExpired) {
      onCountdownExpired(isExpired)
    }
  }, [isExpired, onCountdownExpired, passwordError])

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
        

        {/* Add text box for password */}

        {isExpired && (
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              className="password-input"
            />
            <button type="submit" className="btn">Unlock</button>

            {showNay && <p className="restriction-text"> Clue: tgl lahir DDMMYYYY</p>}
            {showYay && <p className="restriction-text"> Password benar yay!</p>}
          </form>
        )}

        {showNay && (
                <p className="restriction-text">
                    Passwordnya masih salah, coba lagi ya! 😅
                </p>
        )}


        {showRestriction && (
          <p className="restriction-text">
            Eak dah dibuka duluan ni pasti, dasar ga sabaran.  Sabar sist, please wait for your special day! 🎉
          </p>
        )}
        
        <button className="btn" onClick={(isExpired && !passwordError)? onNext : handleRestriction} >
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