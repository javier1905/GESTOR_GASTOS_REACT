import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { saveOperation, updateOperation } from '../../SERVICE/service'
import { showAlert } from '../ALERT/alert'
import Loading from '../LOADING/loading'

import './formOperation.css'

const FormOperation = ({ operation, closeModal, show, refreshListOperations, listCategorias }) => {
	const [conceptoOperacion, setconceptoOperacion] = useState('')
	const [montoOperacion, setmontoOperacion] = useState('')
	const [fechaOperacion, setfechaOperacion] = useState(moment().utc().format('yyyy-MM-DD'))
	const [tipoOperacion, settipoOperacion] = useState('false')
	const [idCategoria, setidCategoria] = useState('')
	const [loading, setloading] = useState(false)

	const userLogin = useSelector(state => state.userLogin)

	const history = useHistory()

	const cleanField = () => {
		setconceptoOperacion('')
		setmontoOperacion('')
		setfechaOperacion(moment().utc().format('yyyy-MM-DD'))
		settipoOperacion('false')
		setidCategoria('')
	}

	useEffect(() => {
		if (operation && show) {
			let tipo = operation.tipoOperacion === true ? 'true' : 'false'
			let fecha = moment(operation.fechaOperacion).utc().format('yyyy-MM-DD')

			setconceptoOperacion(operation.conceptoOperacion)
			setmontoOperacion(parseFloat(operation.montoOperacion).toFixed(2))
			setfechaOperacion(fecha)
			settipoOperacion(tipo)
			setidCategoria(operation.idCategoria)
		} else {
			cleanField()
		}
	}, [operation, show])

	const handleChange = e => {
		const { name, value } = e.target

		if (name === 'idCategoria') setidCategoria(value)
		else if (name === 'tipo') settipoOperacion(value)
		else if (name === 'concepto') setconceptoOperacion(value)
		else if (name === 'monto') setmontoOperacion(value)
		else setfechaOperacion(value)
	}

	const handleSubmit = e => {
		setloading(true)
		e.preventDefault()
		let tipo = tipoOperacion === 'true' ? true : false
		if (!operation) {
			// save
			;(async () => {
				const result = await saveOperation(
					conceptoOperacion,
					montoOperacion,
					fechaOperacion,
					tipo,
					userLogin.idUsuario,
					idCategoria
				)
				if (result) setloading(false)
				if (result.data.logOK === false) return history.push('/login')
				if (result.data.opOK) {
					refreshListOperations()
					cleanField()
					showAlert('successful', result.data.message)
				} else showAlert('error', result.data.message)
			})()
		} else {
			// update
			;(async () => {
				const result = await updateOperation(
					operation.idOperacion,
					conceptoOperacion,
					montoOperacion,
					fechaOperacion,
					idCategoria
				)
				if (result) setloading(false)
				if (result.data.logOK === false) return history.push('/login')
				if (result.data.opOK) {
					showAlert('successful', result.data.message)
					refreshListOperations()
					closeModal()
				} else showAlert('error', result.data.message)
			})()
		}
	}

	return (
		<div className='container_formOperation'>
			<form onSubmit={handleSubmit}>
				<h2>Operation</h2>
				<label htmlFor='txt_concepto'>Concepto</label>
				<input
					name='concepto'
					value={conceptoOperacion}
					onChange={handleChange}
					id='txt_concepto'
					type='text'
					required
				/>
				<label htmlFor='txt_concepto'>Monto</label>
				<input
					name='monto'
					value={montoOperacion}
					onChange={handleChange}
					id='txt_concepto'
					type='number'
					step={0.1}
					required
				/>
				<label htmlFor='dtp_fecha'>Fecha</label>
				<input value={fechaOperacion} onChange={handleChange} id='dtp_fecha' type='date' required />
				<div className='radio_group'>
					<div>
						<label htmlFor='rbtn_ingreso'>Ingreso</label>
						<input
							checked={tipoOperacion === 'true'}
							type='radio'
							name='tipo'
							id='rbtn_ingreso'
							value={true}
							onChange={handleChange}
							disabled={operation ? true : false}
						/>
					</div>
					<div>
						<label htmlFor='rbtn_egreso'>Egreso</label>
						<input
							checked={tipoOperacion === 'false'}
							type='radio'
							name='tipo'
							id='rbtn_egreso'
							value={false}
							onChange={handleChange}
							disabled={operation ? true : false}
						/>
					</div>
				</div>
				<label htmlFor='idCategoria'>Category</label>
				<select
					required
					name='idCategoria'
					id='list_categoria'
					value={idCategoria}
					onChange={handleChange}
				>
					<option value=''>VOID</option>
					{Array.isArray(listCategorias) &&
						listCategorias.map(category => {
							return (
								<option key={category.idCategoria} value={category.idCategoria}>
									{category.descripcionCategorias}
								</option>
							)
						})}
				</select>
				<button id='btn_submit_operation' type='submit'>
					{operation ? 'Update' : 'Save'}
				</button>
			</form>
			{loading && (
				<div className='cont_loaging'>
					<Loading />
				</div>
			)}
		</div>
	)
}

export default FormOperation
