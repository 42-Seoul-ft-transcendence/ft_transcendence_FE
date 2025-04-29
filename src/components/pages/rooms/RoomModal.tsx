import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchWithAuth from '../../utils/fetchWithAuth'
import BasicButton from '../../common/BasicButton'
import Modal from '../../common/Modal'
import BlackProfile from '../../../assets/black_profile.svg'

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

type Props = {
  player1?: participants | null
	player2?: participants | null
}

function RoomModal({ isOpen, onClose, roomId }: ModalProps) {
	if (!isOpen) return null // 모달이 닫혀 있으면 렌더링 안 함
  
	const	[participants, setParticipants] = useState<participants[]>([])
	const [roomType, setRoomType] = useState<string>("2P")
	const	[inRoom, setInRoom] = useState<boolean>(false)
	const navigate = useNavigate()

	async function updateRoomInfo() {
		try {
			const res = await fetchWithAuth(`${import.meta.env.VITE_API_BASE}/ft/api/tournaments/${roomId}`)
			if (!res.ok) {
				const errorData = await res.json()
				throw new Error(errorData.message)
			}

			const data = await res.json()
			setRoomType(data.type)
			setParticipants(data.participants)
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
			handleExit()
		}
	}

	useEffect(() => {
		updateRoomInfo()
		setInRoom(true)

    const intervalId = setInterval(updateRoomInfo, 3000)
    // 컴포넌트가 언마운트 될 때 인터벌 정리
    return () => clearInterval(intervalId)
  }, []);

	const handleExit = () => {
		setInRoom(false)
		fetchWithAuth(`${import.meta.env.VITE_API_BASE}/ft/api/tournaments/${roomId}/join`, {
			method: "DELETE"})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(errorData => {
					throw new Error(errorData.message)
				})
			}
		})
		.catch((error) => {
			if (error instanceof Error) {
				alert(error.message)
			}
			else alert("오류가 발생했습니다.")
			navigate("/lobby")
			return
		})
		.finally(() => onClose())
	}

	return (
		<Modal isOpen={inRoom} onClose={handleExit} backgroundClick={false} className="w-[600px] h-[350px]">
			<div className="relative flex flex-col justify-center">
				<h1 className="flex justify-center text-yellow text-4xl mb-[10px]">Wating...</h1>
				<div className="relative flex flex-col items-center justify-center w-[600px] h-[200px] gap-[15px]">
					<PlayerProfile player1={participants[0] ? participants[0] : null} player2={participants[1] ? participants[1] : null}/>
					{roomType === "4P" &&
						<PlayerProfile player1={participants[2] ? participants[2] : null} player2={participants[3] ? participants[3] : null}/>}
				</div>
			</div>
			<BasicButton onClick={handleExit} className="!text-2xl !w-1/3 !h-1/5 cursor-pointer transition-transform hover:scale-105">Quit</BasicButton>
		</Modal>
	)
}

const PlayerProfile = ({player1 = null, player2 = null}: Props) => {
	return (
		<div className="flex justify-center gap-[4vh]">
			<div className="relative flex items-center justify-center flex-col">
				<div className="relative w-1/3">
					<img
						className="size-full"
						src={BlackProfile} />
					{player1 && <img
						className="absolute inset-0 size-full rounded-full object-cover overflow-hidden"
						src={player1.image} />}
				</div>
				<p className="text-white text-center text-2xl">{player1 ? player1.name : "???"}</p>
			</div>
			<p className="relative flex items-center justify-center text-2xl pb-3">VS</p>
			<div className="relative flex items-center justify-center flex-col">
				<div className="relative w-1/3">
					<img
						className="size-full"
						src={BlackProfile} />
					{player2 && <img
						className="absolute inset-0 size-full rounded-full object-cover overflow-hidden"
						src={player2.image} />}
					</div>
				<p className="text-white text-center text-2xl">{player2 ? player2.name : "???"}</p>
			</div>
		</div>
	)
}

export default RoomModal