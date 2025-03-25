import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../components/Input"
import Button from "../components/Button"

const RegisterPage = () => {
	const [userid, setUserid] = useState<string>("")

	return (
		<>
			<p>Register page</p>
			<InputNickName setUserid={setUserid} />
			<ConfirmNickName userid={userid} />
		</>
	)
}

const InputNickName = ({ setUserid }: { setUserid: React.Dispatch<React.SetStateAction<string>> }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserid(event.target.value);
	}

	return (
		<Input 
			type="text" 
			placeholder="닉네임" 
			maxLength={10}  
			onChange={handleChange}
		/>
	)
}

const ConfirmNickName = ({ userid }: { userid: string }) => {
	const navigate = useNavigate()

	const handleLogin = () => {
		if (!userid.trim())
			return {}
		localStorage.setItem("userId", userid)
		localStorage.setItem("authToken", "user-session-token")
		navigate("/lobby")
	}

	return (
		<Button
			text="확인"
			onClick={handleLogin}
		/>
	)
}
export default RegisterPage