import { useEffect, useRef } from 'react'

const GameBoard = () => {
	const ballRef = useRef<HTMLImageElement>(null)
  const leftPaddleRef = useRef<HTMLImageElement>(null)
  const rightPaddleRef = useRef<HTMLImageElement>(null)

	const positionRef = useRef({ x: 50, y: 50, dx: 0.2, dy: 0.1 })


	useEffect(() => {
    const animate = () => {
			const pos = positionRef.current

      pos.x += pos.dx
    	pos.y += pos.dy

    	if (pos.x < 3 || pos.x > 97) pos.dx *= -1
    	if (pos.y < 7 || pos.y > 93) pos.dy *= -1

      if (ballRef.current) {
        ballRef.current.style.left = `${pos.x}%`
        ballRef.current.style.top = `${pos.y}%`
      }

			console.log("x: ", pos.x)
			console.log("y: ", pos.y)

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [])

	return (
		<div className="relative w-[90vw] aspect-[144/53] max-w-[1100px]">
			<img 
				className="absolute top-0 left-0 w-full h-full object-cover z-0"
				src="/src/assets/game/board.svg" />
			<img
				ref={ballRef}
				src="/src/assets/game/ball.svg"
				className="absolute z-10"
				style={{
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
				}}
				alt="Ball"
			/>

			{/* 막대기 (예: 왼쪽) */}
			<img
				src="/src/assets/game/bar.svg"
				className="absolute z-10 h-1/5"
				style={{
					left: "2%",
					top: "50%",
					transform: "translateY(-50%)",
				}}
				alt="Left Paddle"
			/>

			{/* 막대기 (예: 오른쪽) */}
			<img
				src="/src/assets/game/bar.svg"
				className="absolute z-10 h-1/5"
				style={{
					right: "2%",
					top: "50%",
					transform: "translateY(-50%)",
				}}
				alt="Right Paddle"
			/>
		</div>
	)
}

export default GameBoard