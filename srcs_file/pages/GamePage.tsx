import { useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "../components/Button"

const Game = () => {
	const navigate = useNavigate()
	const { gameid } = useParams()
	const game = true // params.gameid ? data[params.gameid] : undefiend // [API]: gameid 로 게임 정보 받아오기
	const currentUserId = localStorage.getItem("userId")
	const isMember = true // game 멤버 인지 체크

	const hasCheckedGame = useRef(false)
	const hasCheckedMember = useRef(false)

	useEffect(() => {
		if (hasCheckedGame.current) return
		hasCheckedGame.current = true

		if (!game) {
		  alert("존재하지 않는 게임입니다. 로비로 이동합니다."); // 알림 표시
		  navigate("/lobby"); // 로비로 리다이렉트
		}
	}, [navigate]);

	useEffect(() => {
		if (hasCheckedMember.current) return
		hasCheckedMember.current = true

		// 현재 유저가 참가자가 아닌 경우
		if (!currentUserId || !isMember) {
		  alert("참가자가 아닙니다. 로비로 이동합니다."); // 알림 표시
		  navigate("/lobby"); // 로비로 리다이렉트
		}
	}, [currentUserId, navigate]);

	return (
		<>
			<h2>game page</h2>
			<p>Game No. : {gameid}</p>
			<ExitGameButton />
		</>
	)
}

const ExitGameButton = () => {
	const navigate = useNavigate()

	const handleExistGame = () => {
		navigate("/lobby")
	}
	
	return (
		<Button text="기권" onClick={handleExistGame} />
	)
}
export default Game