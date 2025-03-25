import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import IsLoggedIn from "../components/IsLoggedIn"
import Login from "../components/Login"

const LoginPage = () => {
	checkIfLoggedIn()

	return (
		<>
			<p>Login page</p>
			<GoogleOAuthProvider clientId="159654952348-o1bu0cmsii9la17th5ih0c9flh4svoqu.apps.googleusercontent.com">
				<Login />
			</GoogleOAuthProvider>
			
		</>
	)
}

const checkIfLoggedIn = () => {
	const navigate = useNavigate()
	useEffect(() => {
    	if (IsLoggedIn())
		navigate("/lobby")
  	}, [navigate])	
}

export default LoginPage