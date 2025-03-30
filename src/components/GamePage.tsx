import BackGround from '../assets/background.png';


const GamePage = () => {
	return (
		<>
			<div 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    	>
				<h1>Game Page</h1>
			</div>
		</>
	)
}

export default GamePage