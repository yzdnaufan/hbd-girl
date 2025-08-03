import React from 'react'
import '../styles/MainPage.css'

const MainPage = ({ onNext }) => {
  return (
    <div className="page main-page">
      <div className="main-content">
        <h1 className="main-title">🎉 Birthday Celebration</h1>
        <p className="subtitle">Get ready for something special!</p>
        <button className="btn" onClick={onNext}>
          Start the Magic ✨
        </button>
      </div>
    </div>
  )
}

export default MainPage