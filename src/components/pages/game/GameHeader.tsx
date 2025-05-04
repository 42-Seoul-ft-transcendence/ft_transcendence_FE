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
		<div className="relative fixed top-0 flex justify-between aspect-[1440/88] w-[90vw] max-w-[1440px] left-1/2 transform -translate-x-1/2 mb-5">
			<div className="relative w-1/5 max-w-[300px]">
        <img
          src="/src/assets/game/mode.svg"
          className="absolute bottom-0 w-full object-cover bottom-0" />
        <div className="absolute left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-1/2 text-[3vw] inline-flex">{isMulti ? "4" : "2"}P&nbsp;Game</div>
      </div>
			<div className="absolute left-1/2 transform -translate-x-1/2 flex aspect-[324/88] max-w-[324px]">
				<div className="relative">
					<img
						src="/src/assets/game/leftScore.svg"
						className="w-[10vw] h-auto object-cover" />
					<p className="absolute text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[4vw]">{leftScore}</p>
				</div>
				<div className="relative">
					<img
						src="/src/assets/game/rightScore.svg"
						className="w-[10vw] h-auto object-cover" />
					<p className="absolute text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[4vw]">{rightScore}</p>
				</div>
			</div>
			<div className="relative items-center bg-[#444242] border-solid border-[5px] border-black border-2 w-[10vw] h-auto">
				<p className="absolute text-white text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[3vw]">
					{minute}&nbsp;:&nbsp;{second}
				</p>
			</div>
		</div>
	)
}

export default GameHeader