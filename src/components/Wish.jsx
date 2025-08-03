import React from 'react'
import '../styles/Wish.css'

const Wish = ({ onRestart }) => {
  return (
    <div className="page wish-page">
      <div className="wish-content">
        <div className="celebration">🎊🎉🎊</div>
        
        <h2 className="wish-title">Happy Birthday!</h2>
        
        <p className="wish-message">
          HBD ya al! 🎂 May your day be filled with joy, laughter, and all the things you love.
          Semoga diumur yang ke-23 ini kamu semakin sukses, bahagia, dan dikelilingi oleh orang-orang yang mencintaimu.
          You are an amazing person, and you deserve all the best that life has to offer.
          Dan aku sangat bersyukur bisa kenal kamu. I will always love you and support you in everything you do.
          You deserve all the best that life has to offer. Have an absolutely amazing birthday! 🎂✨
        </p>

        <div className="wish-extras">
          <div className="birthday-icons">
            🎂 🎈 🎁 🌟 💝 🎊 🎉 🌺
          </div>
        </div>
        
        <button className="btn" onClick={onRestart}>
          Celebrate Again 🎊
        </button>
      </div>
    </div>
  )
}

export default Wish