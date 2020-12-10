import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getUserLogin } from '../../SERVICE/service'
import setUserLogin from '../../REDUX/action/setUserLogin'

const Auth = ({ children }) => {
	const [isAuth, setisAuth] = useState(true)

	const disptach = useDispatch()

	useEffect(() => {
		;(async function () {
			const result = await getUserLogin()
			if (result.data.logOK) {
				disptach(setUserLogin(result.data.usuario))
				setisAuth(true)
			} else {
				disptach(setUserLogin({ idUsuario: '', emailUsuario: '' }))
				setisAuth(false)
			}
		})()
	}, [disptach])

	return isAuth ? <>{children}</> : <Redirect to='/login' />
}
export default Auth
