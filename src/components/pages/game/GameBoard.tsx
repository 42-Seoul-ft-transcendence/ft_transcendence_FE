import { useEffect, useRef } from 'react'
import { wsGameInfo } from '../../../types/Tournament'

type Props = {
	board: wsGameInfo | undefined
}

const GameBoard = ({ board }: Props) => {
	const ballRef = useRef<HTMLImageElement>(null)
  const leftPaddleRef = useRef<HTMLImageElement>(null)
  const rightPaddleRef = useRef<HTMLImageElement>(null)
	const frameRef = useRef<number>(0)


	useEffect(() => {
    const animate = () => {
      if (ballRef.current) {
        ballRef.current.style.left = `${board?.ball.x}%`
        ballRef.current.style.top = `${board?.ball.y}%`
      }
			if (leftPaddleRef.current) {
        leftPaddleRef.current.style.top = `${board?.player1.y}%`
      }
			if (rightPaddleRef.current) {
        rightPaddleRef.current.style.top = `${board?.player2.y}%`
      }


      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

		return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    }
  }, [])

	return (
		<div className="relative aspect-[144/53] w-[90vw] max-w-[1440px] h-auto left-1/2 transform -translate-x-1/2">
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

export function PaddleControl(ws: WebSocket | null) {
  const keyPressedRef = useRef<"ArrowUp" | "ArrowDown" | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "ArrowUp" || e.key === "ArrowDown") && keyPressedRef.current !== e.key) {
        keyPressedRef.current = e.key
        sendDirection(e.key === "ArrowUp" ? "up" : "down")
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === keyPressedRef.current) {
        keyPressedRef.current = null
        sendDirection("stop")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const sendDirection = (direction: "up" | "down" | "stop") => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "move_paddle", data: direction }))
    }
  }

  return null // 이 컴포넌트는 입력만 처리
}

export default GameBoard