import BackGroundImage from './BackGroundImage'
import CreateRoom from '../assets/create_room.svg'
import JoinRoom from '../assets/join_room.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import Header from './Header'

const LobbyPage = () => {
	const [roomList, setRoomList] = useState<boolean>(false)

	return (
		<>
			<BackGroundImage>
				<Header />
				{(!roomList && (
					<div className="flex gap-[10vh]">
						<CreateRoomButton />
						<JoinRoomButton setRoomList={setRoomList} />
					</div>)) || 
					<RoomList setRoomList={setRoomList} />}
			</BackGroundImage>
		</>
	)
}

const CreateRoomButton = () => {
	const navigate = useNavigate()
	const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false)
	const [roomTitle, setRoomTitle] = useState<string>("")
	const [isMultiGame, setIsMultiGame] = useState<boolean>(false)
	const [loading, setLoading] = useState(false)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRoomTitle(event.target.value);
	}

	const handleCreateRoom = () => {
		if (loading) return
			setLoading(true)
		if (!roomTitle.trim()) {
			alert("방 제목을 입력해주세요.")
			return
		}

		const accessToken = localStorage.getItem("accessToken")
		const userId = localStorage.getItem("userId")

		fetch("/api/room/create", {
			method: "POST",
			headers: { "content-Type": "application/json" },
			body: JSON.stringify({ 
				userId: userId,
				accessToken: accessToken,
				roomTitle: roomTitle,
				multiGame: isMultiGame })
		})
		.then((res) => res.json())
		.then((data) => {
			setIsCreatingRoom(false)
			navigate(`/room/${data.roomId}`)
		})
		.finally(() => setLoading(false))
		.catch(() => {
			alert("방 생성에 실패하였습니다. 잠시 후 다시 시도하여 주세요.")
			setIsCreatingRoom(false)
		})
	}

	return (
		<div>
			<button
				onClick={() => setIsCreatingRoom(true)}
				className="w-[25vw] max-w-[1000px] h-auto mb-[20vh]"
			>
				<img src={CreateRoom} alt="createRoomButton" className="w-full h-full object-contain" />
			</button>
			<Modal 
				isOpen={isCreatingRoom}
				onClose={() => setIsCreatingRoom(false)}
			>
				<div className="flex flex-col gap-[2vh]">
					<h1 className="text-xl text-black opacity-100">
						방 생성
					</h1>
					<input
						type="text"
						placeholder="방제"
						maxLength={20}
						onChange={handleChange}
						className="border-2 border-gray-100 rounded-md" />
					<div className="flex gap-[2vh]">
						<button
							className={`px-4 py-2 rounded-lg ${!isMultiGame ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
							onClick={() => setIsMultiGame(false)}
							>
							2인 게임
						</button>
						<button
							className={`px-4 py-2 rounded-lg ${isMultiGame ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
							onClick={() => setIsMultiGame(true)}
							>
							4인 게임
						</button>
					</div>
				</div>
				<button
					onClick={handleCreateRoom}
					disabled={loading}
					className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
				>
					생성
				</button>
			</Modal>
		</div>
	)
}

const JoinRoomButton = ({ setRoomList }: { setRoomList: React.Dispatch<React.SetStateAction<boolean>> }) => {
	return (
		<div>
			<button
				onClick={() => setRoomList(true)}
				className="w-[25vw] max-w-[1000px] h-auto mb-[20vh]"
			>
				<img src={JoinRoom} alt="JoinRoomButton" className="w-full h-full object-contain" />
			</button>
		</div>
	)
}

const RoomList = ({ setRoomList }: { setRoomList: React.Dispatch<React.SetStateAction<boolean>> }) => {
	return (
		<div>
			<button
				onClick={() => setRoomList(false)}
				className="w-[25vw] max-w-[1000px] h-auto mb-[20vh]"
			>
				뒤로 가기
			</button>
		</div>
	)
}

export default LobbyPage