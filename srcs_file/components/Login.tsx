import { GoogleLogin } from "@react-oauth/google"
import { CredentialResponse } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  const handleSuccess = (response: CredentialResponse) => {
    console.log("Google 로그인 성공:", response);
    // 백엔드로 토큰 전송하여 검증
    fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => console.log("백엔드 응답:", data))
      .catch((err) => console.error("Google 로그인 오류:", err))
      navigate("/register")
  };

  const handleFailure = (error: any) => {
    console.error("Google 로그인 실패:", error);
  };

  return (
    <div className="fixed justify-center items-center h-screen">
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};

export default Login;
