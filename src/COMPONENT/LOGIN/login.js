import React, { useState } from 'react'
import Cookie from 'universal-cookie'
import { Redirect } from 'react-router-dom'
import { login } from '../../SERVICE/service'
import { showAlert } from '../ALERT/alert'
import Loading from '../LOADING/loading'

import './login.css'

const Login = () => {
	const [emailUsuario, setemailUsuario] = useState('')
	const [pwUsuario, setpwUsuario] = useState('')
	const [logOK, setlogOK] = useState(false)
	const [loading, setloading] = useState(false)

	const handleChange = e => {
		const { name, value } = e.target
		if (name === 'emailUsuario') setemailUsuario(value)
		else setpwUsuario(value)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setloading(true)
		const result = await login(emailUsuario, pwUsuario)
		if (result) setloading(false)
		if (result.data.logOK) {
			const cookie = new Cookie()
			cookie.set('token', result.data.token, { path: '/' })
			setlogOK(true)
		} else showAlert('error', result.data.message)
	}
	return (
		<div>
			<div className='container_login'>
				<form onSubmit={handleSubmit} className='form_login'>
					<h2>Login</h2>
					<label className='label_form_login' htmlFor='txt_emailUsuario'>
						Email
					</label>
					<input
						value={emailUsuario}
						onChange={handleChange}
						name='emailUsuario'
						id='txt_emailUsuario'
						type='email'
						required
					/>
					<label className='label_form_login' htmlFor='txt_pwUsuario'>
						Password
					</label>
					<input
						value={pwUsuario}
						onChange={handleChange}
						name='pwUsuario'
						id='txt_pwUsuario'
						type='password'
						required
					/>
					<button type='submit'>INICIAR SESION</button>
				</form>

				{logOK && <Redirect to='/home' />}

				{loading && (
					<div className='cont_loaging'>
						<Loading />
					</div>
				)}
			</div>
		</div>
	)
}
export default Login
