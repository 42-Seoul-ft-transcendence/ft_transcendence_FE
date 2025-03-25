import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

const MainPage = () => {
	return (
		<GameStart />
	)
}

const GameStart = () => {

	const navigate = useNavigate()

	const handleGameStart = () => {
		navigate("/lobby")
	}

	return (
		<Button 
			text="Game Start" 
			onClick={handleGameStart}
			className="bg-green-500 hover:bg-green-700"
		/>
	)
}

export default MainPage