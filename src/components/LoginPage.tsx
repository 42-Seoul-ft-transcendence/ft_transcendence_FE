import { GoogleOAuthProvider, TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackGroundImage from './BackGroundImage'
import Logo from '../assets/logo.svg';
import LoginButton from '../assets/login_button.svg'
import IsLoggedIn from './IsLoggedIn';

const LoginPage = () => {
	const navigate = useNavigate()
	useEffect(() => {
		if (IsLoggedIn())
			navigate("/lobby")
	},[navigate])

	return (
		<>
			<BackGroundImage>
				<div className="flex flex-col items-center justify-between h-full gap-[5vh]">
					<img 
					src={Logo}
					className="w-[50vw] max-w-[1000px] h-auto object-contain mt-[25vh]"
					alt="logo" />
					<GoogleOAuthProvider
						clientId="159654952348-o1bu0cmsii9la17th5ih0c9flh4svoqu.apps.googleusercontent.com">
							<Login />
					</GoogleOAuthProvider>
				</div>
			</BackGroundImage>
		</>
	)
}

const Login = () => {
	const navigate = useNavigate()

	const handleSuccess = (response: TokenResponse) => {
		fetch("/api/auth/google", {
			method: "POST",
			headers: { "content-Type": "application/json" },
			body: JSON.stringify({ token: response.access_token }),
		})
		.then((res) => res.json())
		.then((data) => {
			localStorage.setItem("userId", data.userId)
			localStorage.setItem("accessToken", data.accessToken)
			if (data.newUser) {
				navigate("/register")
			}
			else {
				navigate("/verify")
			}
		})
		.catch((err) => {
			console.error("login error:", err)
			alert("로그인 오류")
			navigate("/")
		})
	}

	const login = useGoogleLogin({
		onSuccess: handleSuccess,
		scope: "openid email profile",
	})

	return (
			<button 
				onClick={() => login()}
				className="w-[30vw] max-w-[1000px] h-auto mb-[35vh]"
			>
      	<img src={LoginButton} alt="Google 로그인" className="w-full h-full object-contain" />
    	</button>
	)
}

export default LoginPage