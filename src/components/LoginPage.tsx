import BackGround from '../assets/background.png';

const LoginPage = () => {
	return (
		<>
			<div 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    	>
				<h1>Login Page</h1>
			</div>
		</>
	)
}

export default LoginPage