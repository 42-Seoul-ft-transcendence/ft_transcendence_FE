import { useNavigate } from 'react-router-dom'
import BackGroundImage from './BackGroundImage'
import React, { useState } from 'react'

const VerifyPage = () => {
	const [otpCode, setOtpCode] = useState<string>("")
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOtpCode(event.target.value)
	}

	const handleVerify = () => {
		if (!otpCode.trim())
			return {}
		return (
			VerifyOTP(otpCode)
		)
	}

	return (
		<>
			<BackGroundImage>
				<input 
					type="password"
					maxLength={4}
					onChange={handleChange}
					onKeyDown={e => {
						if (e.key === "Enter")
							handleVerify()
					}}
				/>
			</BackGroundImage>
		</>
	)
}

const VerifyOTP = (otpCode: string) => {
	const navigate = useNavigate()
	const userId = localStorage.getItem("userId")

	fetch("/api/auth/otp/verify", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ userId, otp: otpCode }),
	})
	.then((res) => res.json())
	.then((data) => {
		if (data.ok)
			navigate("/lobby")
		else {
			alert("OTP 인증 실패")
			navigate("/")
		}
	})
	.catch(() => {
		alert("OTP 인증 오류")
		navigate("/")
	})
}

export default VerifyPage