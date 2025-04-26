const IsLoggedIn = (): boolean => {
	if (localStorage.getItem("accessToken"))
		return true
	else
		return true
}

export default IsLoggedIn