import { useEffect, useState, useCallback } from 'react'
import { getListOperations } from '../../SERVICE/service'
import { useSelector } from 'react-redux'

import useModal from '../MODAL/useModal'
import Modal from '../MODAL/modal'
import FormOperation from '../FORM_OPERATION/formOperation'
import ListOperations from '../LIST_OPERATIONS/listOperations'

import './dashboardOperations.css'

const DashboardOperations = () => {
	const [listOperations, setlistOperations] = useState([])
	const [show, openModal, closeModal] = useModal(false)

	const userLogin = useSelector(store => store.userLogin)

	const refreshListOperations = useCallback(async () => {
		const result = await getListOperations(userLogin.idUsuario)
		if (result.data.opOK) setlistOperations(result.data.listOperaciones)
	}, [userLogin])

	useEffect(() => {
		refreshListOperations()
	}, [refreshListOperations])

	return (
		<div className='container_dashboardOperations'>
			<h2>Operation board</h2>
			<button onClick={_ => openModal()}>add Operation</button>
			<Modal show={show} closeModal={closeModal}>
				<FormOperation refreshListOperations={refreshListOperations} />
			</Modal>
			<ListOperations
				refreshListOperations={refreshListOperations}
				listOperations={listOperations}
			/>
		</div>
	)
}

export default DashboardOperations
