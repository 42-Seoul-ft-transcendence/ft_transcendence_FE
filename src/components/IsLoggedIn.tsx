const IsLoggedIn = (): boolean => {
	// local storage 에서 "userid" 와 "accessToken" 유무 확인
	if (!!localStorage.getItem("userId"))
		return true
	else
		return false
	// 서버에 accessToken 보내서 인증받기
	// 성공시 return true
	// 실패시 return false
	return true
}

export default IsLoggedIn