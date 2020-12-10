import React, { useState } from 'react'

import { signUp } from '../../SERVICE/service'
import { showAlert } from '../ALERT/alert'
import Loading from '../LOADING/loading'

import './singUp.css'
import { Redirect } from 'react-router-dom'

const SignUp = () => {
	const [emailUsuario, setemailUsuario] = useState('')
	const [pwUsuario, setpwUsuario] = useState('')
	const [loading, setloading] = useState(false)
	const [SuccessfulRegistration, setSuccessfulRegistration] = useState(false)

	const handleChange = e => {
		const { name, value } = e.target
		if (name === 'emailUsuario') setemailUsuario(value)
		else if (name === 'pwUsuario') setpwUsuario(value)
	}

	const handleSubmit = async e => {
		setloading(true)
		e.preventDefault()
		const result = await signUp(emailUsuario, pwUsuario)
		if (result) setloading(false)
		if (result.data.opOK) {
			showAlert('exitoso', result.data.message)
			setemailUsuario('')
			setpwUsuario('')
			setTimeout(() => {
				setSuccessfulRegistration(true)
			}, 2000)
		} else showAlert('error', result.data.message)
	}

	return (
		<>
			<div className='container_singup'>
				<form onSubmit={handleSubmit}>
					<h2>Sign Up</h2>
					<label>
						Email
						<input name='emailUsuario' type='email' value={emailUsuario} onChange={handleChange} />
					</label>
					<label>
						Password
						<input name='pwUsuario' type='password' value={pwUsuario} onChange={handleChange} />
					</label>
					<button type='submit'>Registraste</button>
				</form>
				{loading && (
					<div className='cont_loaging'>
						<Loading />
					</div>
				)}
				{SuccessfulRegistration && <Redirect to='/login' />}
			</div>
		</>
	)
}

export default SignUp
