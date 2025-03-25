const IsLoggedIn = (): boolean => {
	const isLoggedIn = !!localStorage.getItem("authToken")

	return (
		isLoggedIn ? true : false
	)
}
export default IsLoggedIn