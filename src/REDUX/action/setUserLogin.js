export const type = 'USUARIO'

const SetUserLogin = userLogin => {
	return {
		type,
		payload: userLogin,
	}
}

export default SetUserLogin
