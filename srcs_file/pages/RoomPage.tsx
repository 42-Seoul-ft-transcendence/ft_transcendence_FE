import { useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "../components/Button"

const RoomPage = () => {
	const navigate = useNavigate()
	const { roomid } = useParams<string>()
	const room = true //params.roomid ? data[params.roomid] : undefined //[API]: roomid 로 방 정보 받아오기
	const currentUserId = localStorage.getItem("userId")
	const isMember = true // room 멤버 인지 체크

	const hasCheckedRoom = useRef(false)
	const hasCheckedMember = useRef(false)

	useEffect(() => {
		if (hasCheckedRoom.current) return
		hasCheckedRoom.current = true

		if (!room) {
		  alert("존재하지 않는 방입니다. 로비로 이동합니다."); // 알림 표시
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
			<h2>room.title</h2>
			<p>Room No. : {roomid}</p>
			<p>room.description</p>
			<StartGameButton roomid={roomid}/>
			<ExitRoomButton />
		</>
	)
}

const StartGameButton = ({ roomid }: { roomid: string | undefined }) => {
	const navigate = useNavigate()

	const handleStartGame = () => {
		navigate(`/game/:${roomid}`)
	}

	return (
		<Button text="게임 시작" onClick={handleStartGame} />
	)
}

const ExitRoomButton = () => {
	const navigate = useNavigate()

	const handleExistRoom = () => {
		navigate("/lobby")
	}
	
	return (
		<Button text="방 나가기" onClick={handleExistRoom} />
	)
}

export default RoomPage