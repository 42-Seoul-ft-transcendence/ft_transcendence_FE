import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchWithAuth from '../../utils/fetchWithAuth'
import BasicButton from '../../common/BasicButton'
import Modal from '../../common/Modal'

interface participants {
	id: number
	name: string
	image: string
}

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	roomId: number
}

function RoomModal({ isOpen, onClose, roomId }: ModalProps) {
	if (!isOpen) return null // 모달이 닫혀 있으면 렌더링 안 함
  
	const	[participants, setParticipants] = useState<participants[]>([])
	const [roomTitle, setRoomTitle] = useState<string>("")
	const [roomType, setRoomType] = useState<string>("2P")
	const navigate = useNavigate()

	useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await fetchWithAuth(`${import.meta.env.VITE_API_BASE}/ft/api/tournaments/${roomId}`)
        if (!res.ok) {
					const errorData = await res.json()
          throw new Error(errorData.message)
        }

        const data = await res.json()
				setRoomTitle(data.name)
				setRoomType(data.type)
				setParticipants(data.participants)
        
        console.log('업데이트된 데이터:', data)
      } catch (error) {
        if (error instanceof Error) {
					alert(error.message)
      	}
				handleExit()
			}
		}, 100)
    // 컴포넌트가 언마운트 될 때 인터벌 정리
    return () => clearInterval(intervalId)
  }, []);

	const handleExit = () => {
		fetchWithAuth(`${import.meta.env.VITE_API_BASE}/ft/api/tournaments/${roomId}/join`, {
			method: "DELETE"})
		.then((res) => {
			if (!res.ok) throw new Error()
			return
		})
		.catch(() => {
			alert("오류가 발생했습니다.")
			navigate("/lobby")
		})
		.finally(() => onClose())
	}

	return (
		<Modal isOpen={isOpen} onClose={handleExit} backgroundClick={false}>
			<h1>방제: {roomTitle}</h1>
			<p>{roomType}</p>
			<BasicButton onClick={handleExit}>Exit Room</BasicButton>
		</Modal>
	)
}

export default RoomModal