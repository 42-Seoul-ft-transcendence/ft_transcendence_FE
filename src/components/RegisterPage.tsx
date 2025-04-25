import BackGroundImage from './BackGroundImage';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const API_BASE = "https://back-coffeego.com"

const RegisterPage = () => {
	return (
		<>
			<BackGroundImage>
				<OTPRegister />
			</BackGroundImage>
		</>
	)
}

const OTPRegister = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
	const navigate = useNavigate()
  useEffect(() => {
		const accessToken = localStorage.getItem("accessToken")

    fetch(`${API_BASE}/ft/api/auth/2fa/setup`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken }),
    })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("secret", data.secret)
      setQrCodeUrl(data.qrCodeUrl)
    })
    .catch((err) => {
			console.error("OTP 등록 오류:", err)
			alert("OTP 등록 오류")
			navigate("/")
		});
  }, []);

  const handleComplete = () => {
    navigate("/verify")
  }

  return (
    <div className="flex flex-col items-center">
      <h2>OTP 등록</h2>
      {qrCodeUrl ? (
        <QRCodeSVG value={qrCodeUrl} size={200} />
      ) : (
        <p>QR 코드 로딩 중...</p>
      )}
      <p>QR 코드를 스캔하여 OTP 앱에 등록하세요.</p>
      <button onClick={handleComplete}>인증하기</button>
    </div>
  );
};

export default RegisterPage