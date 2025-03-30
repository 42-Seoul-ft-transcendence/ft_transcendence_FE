import React from 'react'
import BackGround from '../assets/background.png';

function MainPage() {
  return (
    <div>
        <img src={BackGround} className="w-full h-full object-cover" alt="background" />
    </div>
  )
}

export default MainPage