import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackGroundImage from '../../common/BackGroundImage'
import fetchWithAuth from '../../utils/fetchWithAuth'
import Modal from '../../common/Modal'
import BlackProfile from '../../../assets/black_profile.svg'
import { participant } from '../../../types/Tournament'

type Props = {
  player1?: participant | null
	player2?: participant | null
}

const RoundTwoPage = () => {
	const	[player1, setPlayer1] = useState<participant>()
	const	[player2, setPlayer2] = useState<participant>()
	const navigate = useNavigate()

	const { tournamentId } = useParams<{ tournamentId?: string }>()

	useEffect(() => {
		if (!tournamentId || isNaN(+tournamentId)) {
			alert("잘못된 접근입니다.")
			navigate("/lobby", { replace: true })
			return
		}
	}, [tournamentId])

	async function updateRoomInfo() {
		try {
			const res = await fetchWithAuth(`${import.meta.env.VITE_API_BASE}/ft/api/tournaments/${tournamentId}`)
			if (!res.ok) {
				const errorData = await res.json()
				throw new Error(errorData.message)
			}

			const data = await res.json()
			for (const player of data.participants)
			{
				if (player.id === Number(localStorage.getItem("userId")))
					setPlayer1(player)
			}

			if (data.matches[2]?.status === "IN_PROGRESS")
			{
				for (const player of data.matches[2].players)
				{
					if (player.id === Number(localStorage.getItem("userId")))
						navigate(`/game?tournamentId=${data.id}&matchId=${data.matches[2].id}`)
					else
						setPlayer2(player)
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
			handleExit()
		}
	}

	useEffect(() => {
		updateRoomInfo()

    const intervalId = setInterval(updateRoomInfo, 3000)
    // 컴포넌트가 언마운트 될 때 인터벌 정리
    return () => clearInterval(intervalId)
  }, []);

	const handleExit = () => {}

	return (
		<>
			<BackGroundImage backgroundImageUrl='/src/assets/background/background_basic.png'>
			<Modal isOpen={true} onClose={handleExit} backgroundClick={false} className="w-[600px] h-[350px]">
				<div className="relative flex flex-col justify-center">
					<h1 className="flex justify-center text-yellow text-4xl mb-[10px]">Round&nbsp;2</h1>
					<div className="relative flex flex-col items-center justify-center w-[600px] h-[200px] gap-[15px]">
						<PlayerProfile player1={player1 ? player1 : null} player2={player2 ? player2 : null}/>
					</div>
				</div>
			</Modal>
			</BackGroundImage>
		</>
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

export default RoundTwoPage