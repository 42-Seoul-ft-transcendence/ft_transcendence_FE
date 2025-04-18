import BackGroundImage from './BackGroundImage'
import { useEffect, useState } from 'react'
import Header from './Header'

interface GameRoom {
  id: string;
  name: string;
  players: number;
}

const RoomListPage = () => {
  const [rooms, setRooms] = useState<GameRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
		fetch("/api/rooms", {
			method: "GET",
			headers: { "content-Type": "application/json" },
			body: JSON.stringify({ 
				userId: localStorage.getItem("userId"),
				accessToken: localStorage.getItem("accessToken") })
		})
		.then((res) => {
			if (!res.ok)
				throw new Error("게임방을 불러오지 못했습니다.")
			return res.json()
		})
		.then(( data: GameRoom[] ) => setRooms(data))
		.finally(() => setLoading(false))
		.catch((err) => setError(err.message))
  }, [])

  if (loading) return <p>불러오는 중...</p>
  // if (error) return <p>에러: {error}</p>

  return (
		<>
			<BackGroundImage>
				<Header />
				<ul className="space-y-2">
					{rooms.map((room) => (
						<li
						key={room.id}
						className="p-4 border rounded hover:bg-gray-100 cursor-pointer"
						onClick={() => console.log(`${room.id} 참가 요청`)}
						>
							<strong>{room.name}</strong> – {room.players}명 참여 중
						</li>
					))}
				</ul>
			</BackGroundImage>
		</>
  );
};

export default RoomListPage