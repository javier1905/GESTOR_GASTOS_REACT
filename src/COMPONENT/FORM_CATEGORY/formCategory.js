import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { saveCategory, updateCategory } from '../../SERVICE/service'
import { showAlert } from '../ALERT/alert'

import './formCategory.css'

const FormCategory = ({ category, closeModal, show, refreshListCategories }) => {
	const [descripcionCategoria, setdescripcionCategoria] = useState('')
	const userLogin = useSelector(state => state.userLogin)

	const history = useHistory()

	const handleChange = e => setdescripcionCategoria(e.target.value)

	useEffect(() => category && show && setdescripcionCategoria(category.descripcionCategorias), [
		category,
		show,
	])

	const handleSubmit = e => {
		e.preventDefault()
		if (!category) {
			// save
			;(async () => {
				const result = await saveCategory(userLogin.idUsuario, descripcionCategoria)
				if (result.data.logOK === false) return history.push('/login')
				if (result.data.opOK) {
					refreshListCategories()
					setdescripcionCategoria('')
					showAlert('successful', result.data.message)
				} else showAlert('error', result.data.message)
			})()
		} else {
			// update
			;(async () => {
				const result = await updateCategory(category.idCategoria, descripcionCategoria)
				if (result.data.logOK === false) return history.push('/login')
				if (result.data.opOK) {
					setdescripcionCategoria('')
					showAlert('successful', result.data.message)
					refreshListCategories()
					closeModal()
				} else showAlert('error', result.data.message)
			})()
		}
	}

	return (
		<div className='container_formCategory'>
			<form onSubmit={handleSubmit}>
				<h2>Category</h2>
				<label htmlFor='txt_descripcion'>Descripcion</label>
				<input
					value={descripcionCategoria}
					onChange={handleChange}
					id='txt_descripcion'
					type='text'
					required
				/>
				<button id='btn_submit_category' type='submit'>
					{category ? 'Update' : 'Save'}
				</button>
			</form>
		</div>
	)
}

export default FormCategory

FormCategory.propTypes = {
	category: PropTypes.shape({
		idCategoria: PropTypes.number,
		descripcionCategorias: PropTypes.string,
	}),
}
