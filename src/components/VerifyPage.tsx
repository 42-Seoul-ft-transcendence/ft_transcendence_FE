import { useNavigate } from 'react-router-dom'
import BackGroundImage from './BackGroundImage'
import { useState, useRef } from 'react'

const API_BASE = "https://back-coffeego.com"

const VerifyPage = () => {
	const navigate = useNavigate()
	const [otpCode, setOtpCode] = useState<string>("")

	const inputsRef = useRef<Array<HTMLInputElement | null>>([])
	const length = 6

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return

    const inputs = inputsRef.current
    inputs[index]!.value = value

    if (value && index < length - 1) {
      inputs[index + 1]?.focus()
    }

    const code = inputs.map(input => input?.value).join('')
		console.log("code: " + code)
		console.log("length: " + code.length)
    if (code.length <= length) {
      setOtpCode(code)
			console.log("otpCode: " + otpCode)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus()
			console.log("index: " + index)
			console.log("otpCode: " + otpCode)
    }
		else if (e.key == "Enter")
			handleVerify()
  }

	const handleVerify = () => {
		if (!otpCode.trim() || otpCode.length != length)
			return

		console.log("verify otp: " + otpCode)
		verifyOTP(otpCode, navigate)
	}

	return (
		<>
			<BackGroundImage>
				<div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
					{Array.from({ length }).map((_, i) => (
						<input
							key={i}
							type="text"
							inputMode="numeric"
							maxLength={1}
							ref={el => { inputsRef.current[i] = el }}
							onChange={e => handleChange(i, e.target.value)}
							onKeyDown={e => handleKeyDown(e, i)}
							onInput={e => {
								const input = e.currentTarget
								input.value = input.value.replace(/[^0-9]/g, '')
							}}
							style={{
								width: '2.5rem',
								height: '2.5rem',
								fontSize: '1.5rem',
								textAlign: 'center',
								border: '1px solid #ccc',
								borderRadius: '0.5rem',
							}}
						/>
					))}
				</div>
				<button 
					onClick={handleVerify}
					className="px-4 py-2 text-white bg-green-500 hover:bg-green-700 transition mt-4 rounded"
				>
					인증하기
				</button>
			</BackGroundImage>
		</>
	)
}

const verifyOTP = (otpCode: string, navigate: ReturnType<typeof useNavigate>) => {
	const accessToken = localStorage.getItem("accessToken")
	if (!accessToken) {
		alert("로그인이 필요합니다.")
		navigate("/")
		return
	}

	fetch(`${API_BASE}/ft/api/auth/2fa/verify`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token: accessToken, secret: otpCode }),
	})
	.then((res) => {
		if (!res.ok) throw new Error("HTTP 오류")
		return res.json()
	})
	.then((data) => {
		if (data.success)
			navigate("/lobby")
		else throw new Error()
	})
	.catch(() => {
		alert("OTP 인증 오류")
		navigate("/")
	})
}

export default VerifyPage