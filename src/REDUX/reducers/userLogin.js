import { type as USER_LOGIN } from '../action/setUserLogin'
const defaulrState = { idUsuario: '', emailUsuario: '' }

const userLogin = (state = defaulrState, { type, payload }) => {
	switch (type) {
		case USER_LOGIN:
			return payload

		default:
			return state
	}
}

export default userLogin
