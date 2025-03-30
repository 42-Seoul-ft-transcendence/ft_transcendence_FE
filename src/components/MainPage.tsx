import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import BackGround from '../assets/background.png';
import GameStart from '../assets/start_button.svg';
import Logo from '../assets/logo.svg';

function MainPage() {
  return (
    <div 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
				<div className="flex flex-col items-center justify-between h-full gap-[10vh]">
					{/* <img src={BackGround} className="w-full h-full object-cover" alt="background" /> */}
					<img 
						src={Logo}
						className="w-[50vw] max-w-[1000px] h-auto object-contain"
						style={{ marginTop: "15vh" }}
						alt="logo" />
					<GameStartButton />
				</div>
    </div>
  )
}

const GameStartButton = () => {
	const navigate = useNavigate()

	const handleGameStart = () => {
		navigate("/lobby")
	}
	return (
		<button 
			onClick={handleGameStart} 
			className="w-[30vw] max-w-[1000px] h-auto"
			style={{ marginBottom: "25vh" }}
		>
			<img src={GameStart} alt="gameStartButton" className="w-full h-full object-contain" />
		</button>
	)
}

export default MainPage