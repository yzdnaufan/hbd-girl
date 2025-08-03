import React from 'react'
import '../styles/Wish.css'

const Wish = ({ onRestart }) => {
  return (
    <div className="page wish-page">
      <div className="wish-content">
        <div className="celebration">🎊🎉🎊</div>
        
        <h2 className="wish-title">Happy Birthday!</h2>
        
        <p className="wish-message">
          May your special day be filled with happiness, laughter, and all the things that bring you joy! 
          Here's to another year of wonderful adventures, precious memories, and dreams coming true. 
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