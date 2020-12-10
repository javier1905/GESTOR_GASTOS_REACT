import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useModal from '../MODAL/useModal'
import Modal from '../MODAL/modal'
import FormOperation from '../FORM_OPERATION/formOperation'
import ListOperations from '../LIST_OPERATIONS/listOperations'
import { getListOperations, getListCategories } from '../../SERVICE/service'

import './dashboardOperations.css'

const DashboardOperations = () => {
	const [listOperations, setlistOperations] = useState([])
	const [listCategorias, setlistCategorias] = useState([])
	const [show, openModal, closeModal] = useModal(false)

	const history = useHistory()

	const userLogin = useSelector(store => store.userLogin)

	const refreshListOperations = useCallback(async () => {
		const result = await getListOperations(userLogin.idUsuario)
		if (result.data.opOK) setlistOperations(result.data.listOperaciones)
	}, [userLogin])

	useEffect(() => {
		refreshListOperations()
	}, [refreshListOperations])

	useEffect(() => {
		;(async () => {
			const result = await getListCategories(userLogin.idUsuario)
			if (result.data.logOK === false) return history.push('/login')
			if (result.data.opOK) setlistCategorias(result.data.listCategorias)
		})()
	}, [userLogin, history])

	return (
		<div className='container_dashboardOperations'>
			<h2>Operation board</h2>
			<button onClick={_ => openModal()}>add Operation</button>
			<Modal show={show} closeModal={closeModal}>
				<FormOperation
					listCategorias={listCategorias}
					refreshListOperations={refreshListOperations}
				/>
			</Modal>
			<ListOperations
				refreshListOperations={refreshListOperations}
				listOperations={listOperations}
				listCategorias={listCategorias}
			/>
		</div>
	)
}

export default DashboardOperations
