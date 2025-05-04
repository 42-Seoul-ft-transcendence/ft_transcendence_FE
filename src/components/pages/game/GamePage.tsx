import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BackGroundImage from '../../common/BackGroundImage'
import GameHeader from './GameHeader'
import GameBoard, { PaddleControl } from './GameBoard'
import UserProfile from './UserProfile'
import BasicButton from '../../common/BasicButton'
import fetchWithAuth from '../../utils/fetchWithAuth'
import BlackProfile from '../../../assets/black_profile.svg'
import { match, wsGameInfo } from '../../../types/Tournament'

type Props = {
	match: match | undefined
	isMulti: boolean
	tournamentId: string | null
}

const GamePage = () => {
	const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
	const navigate = useNavigate()
	const tournamentId = searchParams.get("tournamentId")
	const matchId = searchParams.get("matchId")

	const socketRef = useRef<WebSocket | null>(null)
	const [match, setMatch] = useState<match>()
	const [isMulti, setIsMulti] = useState<boolean>(false)
	const [matchStatus, setMatchStatus] = useState<string>("")
	const [board, setBaord] = useState<wsGameInfo>()

	useEffect(() => {
		if (!tournamentId || !matchId)
		{
			alert("잘못된 접근입니다.")
			navigate("/lobby", {replace: true})
		}

		const getTournamentInfo = async () => {
			try {
				const res = await fetchWithAuth(`${import.meta.env.VITE_API_BASE}/ft/api/tournaments/${tournamentId}`)
				if (!res.ok) {
					const errorData = await res.json()
					throw new Error(errorData.message)
				}
	
				const data = await res.json()
			
				if (data.type === "4P")
					setIsMulti(true)
				for (const match of data.matches)
				{
					if (match.id === matchId)
						setMatch(match)
				}
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message)
				}
				navigate("/lobby", {replace: true})
			}
		}

		getTournamentInfo()
	}, [])

	useEffect(() => {
		const str = `${import.meta.env.VITE_API_BASE}`
		const api_base = str.replace("http://", "")

		const ws = new WebSocket(`ws://${api_base}/ft/ws/match/${matchId}`)
		socketRef.current = ws

		const accessToken = localStorage.getItem("accessToken")
		if (!accessToken)
		{
			alert("로그인이 필요합니다.")
			navigate("/")
		}

		ws.onopen = () => {
			console.log("✅ WebSocket 연결 성공");
			ws.send(JSON.stringify({ "type" : "authenticate",
															 "token" : accessToken }))
		}
	
		ws.onmessage = (event) => {
			console.log("📨 메시지 수신:", event.data);
			if (event.data.type === "game_start")
				setMatchStatus("IN_PROGRESS")
			else if (matchStatus === "IN_PROGRESS" && event.data.type === "game_update")
				setBaord(event.data.data)
			else if (event.data.type === "game_end")
				setMatchStatus("END")
		}

		ws.onerror = (err) => {
			console.error("❌ WebSocket 에러", err);
			alert("오류가 발생했습니다.")
			navigate("/lobby")
		}

		ws.onclose = (e) => {
			console.warn("🔌 WebSocket 연결 종료", e);
		}
	
		return () => {
			console.log("🧹 WebSocket cleanup");
			ws.close()
		}
	}, [])

	PaddleControl(socketRef.current)

	return (
		<>
			<BackGroundImage backgroundImageUrl='/src/assets/background/background_basic.png'>
				{matchStatus === "END" ? <MatchResult match={match} isMulti={isMulti} tournamentId={tournamentId}/> : (
					<div className="relative flex flex-col w-full">
						<GameHeader isMulti={true} leftScore={3} rightScore={1}/>
						<GameBoard board={board}/>
						<UserProfile match={match}/>
					</div>
				)}
			</BackGroundImage>
		</>
	)
}

const MatchResult = ({ match, isMulti, tournamentId }: Props) => {
	const navigate = useNavigate()
	const [isWinner, setIsWinner] = useState<boolean>(false)
	
	const userId = localStorage.getItem("userId")
	for (const player of match!.players)
	{
		if (player.id + "" === userId)
			setIsWinner(player.isWinner)
	}

	const handleButton = () => {
		if (!isMulti)
			navigate("/lobby", {replace: true})
		navigate(`/round2/${tournamentId}`, {replace: true})
	}

	return (
		<div className="relative flex flex-col items-center w-80% h-80% border rounded bg-[#D9FBF6] gap-[3vh]">
			<h1 className="text-white">You&nbsp;{isWinner ? "Win!" : "Lose..."}</h1>
			<div className="flex justify-center gap-[4vh]">
				<div className="relative flex items-center justify-center flex-col">
					<div className="relative w-1/3">
						<img
							className="size-full"
							src={BlackProfile} />
						<img
							className="absolute inset-0 size-full rounded-full object-cover overflow-hidden"
							src={match!.players[0].image} />
					</div>
					<p className="text-white text-center text-2xl">{match!.players[0].name}</p>
				</div>
				<p className="relative flex items-center justify-center text-2xl text-yellow">
					{match!.players[0].score}&nbsp;:&nbsp;{match!.players[1].score}
				</p>
				<div className="relative flex items-center justify-center flex-col">
					<div className="relative w-1/3">
						<img
							className="size-full"
							src={BlackProfile} />
						<img
							className="absolute inset-0 size-full rounded-full object-cover overflow-hidden"
							src={match!.players[1].image} />
						</div>
					<p className="text-white text-center text-2xl">{match!.players[1].name}</p>
				</div>
			</div>
			<BasicButton onClick={handleButton}>{isMulti ? "Next" : "Back&nbsp;to&nbsp;Lobby"}</BasicButton>
		</div>
	)
}

export default GamePage