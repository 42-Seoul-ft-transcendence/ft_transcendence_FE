import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Modal } from "../components/Modal"
import Button from "../components/Button"

const LobbyPage = () => {
	const [isCreatingRoom, setIsCreatingRoom] = useState(false)
	const navigate = useNavigate()
	const handleLogout = () => {
		localStorage.removeItem("authToken")
		localStorage.removeItem("userId")
		navigate('/')
	  }
	  const userid = localStorage.getItem('userId')

	// 방 생성 함수 (예제)
  	const handleCreateRoom = () => {
    	const newRoomId = Math.random().toString(36).substring(7) // [API]: 랜덤 ID 생성 (실제 서버 요청 필요)
    	navigate(`/room/${newRoomId}`) // 방 페이지로 이동
  	}


	return (
		<>
			<Link to={`/mypage/${userid}`} style={{ color: 'green' }}>Mypage</Link>
			<Button 
				text="로그아웃"
				onClick={handleLogout}
				className="mt-2 px-2 py-1 bg-gray-500 hover:bg-gray-700"
			/>
			<div className="p-6">
      			<h1 className="text-2xl">로비</h1>
				{!isCreatingRoom && (
					<Button
						text="방 만들기"
        				onClick={() => setIsCreatingRoom(true)}
        				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      				/>
				)}
      			{/* 모달 컴포넌트 사용 */}
      			<Modal isOpen={isCreatingRoom} onClose={() => setIsCreatingRoom(false)}>
        			<h2 className="text-xl text-black opacity-100">방 생성</h2>
        			<p className="text-black opacity-100">설정을 입력하세요.</p>
        			<Button
						text="생성"
          				onClick={handleCreateRoom}
          				className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        			/>
      			</Modal>
    		</div>
		</>
	)
}
export default LobbyPage