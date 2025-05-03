import { useEffect, useRef, useState } from 'react'

type Props = {
	isMulti: boolean
	leftScore: number
	rightScore: number
}

const GameHeader = ({ isMulti, leftScore, rightScore }: Props) => {
	const timer = useRef(0)
	const [minute, setMinute] = useState<string>("")
	const [second, setSecond] = useState<string>("")

	useEffect(() => {
		const interval = setInterval(() => {
			timer.current += 1
			setMinute(String(Math.trunc(timer.current / 60)).padStart(2, "0"))
			setSecond(String(Math.trunc(timer.current % 60)).padStart(2, "0"))
		}, 1000)

		return () => clearInterval(interval)
	}, [])
	return (
		<div className="relative fixed top-0 flex justify-between w-[90vw] max-w-[1100px] h-auto mb-10">
			<div className="relative w-1/4 max-w-[200px]">
        <img
          src="/src/assets/game/mode.svg"
          className="h-full w-auto object-cover" />
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">{isMulti ? "4" : "2"}P Game</div>
      </div>
			<div className="absolute left-1/2 transform -translate-x-1/2 flex max-w-[300px]">
				<div className="relative">
					<img
						src="/src/assets/game/leftScore.svg"
						className="h-full w-auto object-cover" />
					<p className="absolute text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">{leftScore}</p>
				</div>
				<div className="relative">
					<img
						src="/src/assets/game/rightScore.svg"
						className="h-full w-auto object-cover" />
					<p className="absolute text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">{rightScore}</p>
				</div>
			</div>
			<div className="relative items-center bg-[#444242] border-solid border-[5px] border-black border-2 h-full w-1/5 max-w-[150px]">
				<p className="absolute text-white text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
					{minute} : {second}
				</p>
			</div>
		</div>
	)
}

export default GameHeader