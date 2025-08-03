import { useState, useEffect } from 'react'

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })
  const [message, setMessage] = useState('The celebration is coming soon!')
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    // Prevent effect from running if targetDate is invalid
    if (!targetDate || !(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
      console.error('Invalid target date provided to useCountdown')
      return
    }

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        })
        setMessage("🎉 It's your birthday! 🎉")
        setIsExpired(true)
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      })

      // Update message based on time remaining
      if (days === 0 && hours === 0 && minutes === 0) {
        setMessage("🎂 Almost there! Just seconds left!")
      } else if (days === 0 && hours === 0) {
        setMessage("🎈 Less than an hour to go!")
      } else if (days === 0) {
        setMessage("🌟 Your birthday is today!")
      } else {
        setMessage("The celebration is coming soon!")
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 2000) // Reduced frequency from 1000ms to 2000ms

    return () => clearInterval(interval)
  }, [targetDate.getTime()]) // Use getTime() to create a stable dependency

  return { timeLeft, message, isExpired }
}

export default useCountdown