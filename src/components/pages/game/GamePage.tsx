import BackGroundImage from '../../common/BackGroundImage'
import GameHeader from './GameHeader'
import GameBoard from './GameBoard'
import UserProfile from './UserProfile'
import { participants } from '../../../types/Tournament'

const GamePage = () => {
	let player1: participants = {id: 1, name: "jokuhus", image: "https://lh3.googleusercontent.com/a/ACg8ocJ3mFKfnrydFKz5YvAfWM_24IlSCGk1kF1P4HMgsKz9Pj0_7w=s96-c"}
	let player2: participants = {id: 2, name: "1", image: "https://lh3.googleusercontent.com/a/ACg8ocJ3mFKfnrydFKz5YvAfWM_24IlSCGk1kF1P4HMgsKz9Pj0_7w=s96-c"}

	return (
		<>
			<BackGroundImage backgroundImageUrl='/src/assets/background/background_basic.png'>
				<GameHeader isMulti={true} leftScore={3} rightScore={1}/>
				<GameBoard />
				<UserProfile player1={player1} player2={player2}/>
			</BackGroundImage>
		</>
	)
}


export default GamePage