import React, { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import '../styles/AudioControls.css'

const AudioControls = ({ autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasAutoPlayAttempted, setHasAutoPlayAttempted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio('/audio/hbd.m4a')
    audioRef.current.loop = true
    audioRef.current.volume = 0.5
    
    const audio = audioRef.current

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    const handleError = () => {
      console.log('Audio file not found. Please add birthday-music.mp3 to public/audio/')
      setIsLoaded(false)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  // Handle auto-play when countdown expires
  useEffect(() => {
    if (autoPlay && isLoaded && !hasAutoPlayAttempted) {
      setHasAutoPlayAttempted(true)
      attemptAutoPlay()
    }
  }, [autoPlay, isLoaded, hasAutoPlayAttempted])

  const attemptAutoPlay = async () => {
    if (!audioRef.current || !isLoaded) return

    try {
      await audioRef.current.play()
      // isPlaying state will be updated by the 'play' event listener
    } catch (error) {
      console.log('Auto-play failed (browser restriction):', error.message)
      setIsPlaying(false)
    }
  }

  const toggleAudio = async () => {
    if (!audioRef.current || !isLoaded) {
      console.log('Audio not available')
      return
    }

    try {
      if (isPlaying) {
        audioRef.current.pause()
        // isPlaying state will be updated by the 'pause' event listener
      } else {
        await audioRef.current.play()
        // isPlaying state will be updated by the 'play' event listener
      }
    } catch (error) {
      console.log('Audio playback failed:', error.message)
      setIsPlaying(false)
      
      // Browser might require user interaction first
      if (error.name === 'NotAllowedError') {
        alert('Please interact with the page first to enable audio')
      }
    }
  }

  // Don't render if audio is not loaded
  if (!isLoaded) {
    return null
  }

  return (
    <div className="audio-controls">
      <button
        className="audio-btn"
        onClick={toggleAudio}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  )
}

export default AudioControls