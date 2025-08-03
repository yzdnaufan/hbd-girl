import React, { useEffect, useState, useCallback, useRef } from 'react'
import '../styles/Particles.css'

const Particles = ({ isBirthday = false }) => {
  const [particles, setParticles] = useState([])
  const intervalRef = useRef(null)
  const timeoutRefs = useRef(new Set())

  // Memoize particle creation to avoid recreating functions
  const createParticle = useCallback(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7']
    const birthdayEmojis = ['🎈', '🎉', '🎊', '🎂', '🎁', '🌟', '💝', '🎀']
    
    const baseParticle = {
      id: Date.now() + Math.random(), // More efficient than Math.random() alone
      left: Math.random() * 100,
      animationDuration: Math.random() * 2 + 2, // Reduced from 3+3 to 2+2
      animationDelay: Math.random() * 1, // Reduced from 2 to 1
    }

    if (isBirthday) {
      return {
        ...baseParticle,
        emoji: birthdayEmojis[Math.floor(Math.random() * birthdayEmojis.length)],
        type: 'emoji',
        size: Math.random() * 15 + 15, // Reduced from 20+20 to 15+15
      }
    } else {
      return {
        ...baseParticle,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: 'color',
        size: 6,
      }
    }
  }, [isBirthday])

  // Optimized particle removal with batching
  const removeParticle = useCallback((particleId) => {
    setParticles(prev => {
      const filtered = prev.filter(p => p.id !== particleId)
      // Only update state if there's actually a change
      return filtered.length !== prev.length ? filtered : prev
    })
  }, [])

  useEffect(() => {
    // Clear any existing intervals and timeouts
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
    timeoutRefs.current.clear()

    const addParticle = () => {
      // Limit maximum particles to prevent memory issues
      setParticles(prev => {
        if (prev.length >= (isBirthday ? 15 : 8)) { // Reduced limits
          return prev
        }

        const newParticle = createParticle()
        
        // Schedule removal with cleanup tracking
        const timeout = setTimeout(() => {
          removeParticle(newParticle.id)
          timeoutRefs.current.delete(timeout)
        }, (newParticle.animationDuration + newParticle.animationDelay) * 1000)
        
        timeoutRefs.current.add(timeout)
        
        return [...prev, newParticle]
      })
    }

    // Reduced frequency and use requestAnimationFrame for better performance
    const startParticleSystem = () => {
      intervalRef.current = setInterval(addParticle, isBirthday ? 400 : 600) // Increased intervals
    }

    startParticleSystem()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      // Clean up all pending timeouts
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
      timeoutRefs.current.clear()
      // Clear particles
      setParticles([])
    }
  }, [isBirthday, createParticle, removeParticle])

  return (
    <div className="particles">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`particle ${particle.type === 'emoji' ? 'particle-emoji' : 'particle-color'}`}
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.type === 'color' ? particle.color : 'transparent',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            fontSize: particle.type === 'emoji' ? `${particle.size}px` : 'inherit',
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.animationDelay}s`,
            // Use transform3d for hardware acceleration
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          {particle.type === 'emoji' ? particle.emoji : ''}
        </div>
      ))}
    </div>
  )
}

export default React.memo(Particles)
