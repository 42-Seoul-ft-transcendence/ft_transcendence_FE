import BackGroundImage from './BackGroundImage';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

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
  const [otpAuthUrl, setOtpAuthUrl] = useState("");
	const navigate = useNavigate()

  useEffect(() => {
		const accessToken = localStorage.getItem("accessToken")

    fetch("/api/auth/otp/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOtpAuthUrl(data.otpauth_url);
				localStorage.setItem("accessToken", data.accessToken)
				localStorage.setItem("refreshToken", data.refreshToken)
      })
      .catch((err) => {
				console.error("OTP 등록 오류:", err)
				alert("OTP 등록 오류")
				navigate("/")
			});
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2>OTP 등록</h2>
      {otpAuthUrl ? (
        <QRCodeSVG value={otpAuthUrl} size={200} />
      ) : (
        <p>QR 코드 로딩 중...</p>
      )}
      <p>QR 코드를 스캔하여 OTP 앱에 등록하세요.</p>
    </div>
  );
};

export default RegisterPage