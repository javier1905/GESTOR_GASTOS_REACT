import { useEffect, useState, useCallback } from 'react'
import { getListCategories } from '../../SERVICE/service'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useModal from '../MODAL/useModal'
import Modal from '../MODAL/modal'
import FormCategory from '../FORM_CATEGORY/formCategory'
import ListCategories from '../LIST_CATEGORIES/listCategories'

import './dashboardCategories.css'

const DashboardCategories = () => {
	const [listCategories, setlistCategories] = useState([])
	const [show, openModal, closeModal] = useModal(false)

	const history = useHistory()

	const userLogin = useSelector(store => store.userLogin)

	const refreshListCategories = useCallback(async () => {
		const result = await getListCategories(userLogin.idUsuario)
		if (result.data.logOK) return history.push('/login')
		if (result.data.opOK) setlistCategories(result.data.listCategorias)
	}, [userLogin, history])

	useEffect(() => {
		refreshListCategories()
	}, [refreshListCategories])

	return (
		<div className='container_dashboardCategories'>
			<h2>Category board</h2>
			<button onClick={_ => openModal()}>add Category</button>
			<Modal show={show} closeModal={closeModal}>
				<FormCategory refreshListCategories={refreshListCategories} />
			</Modal>
			<ListCategories
				refreshListCategories={refreshListCategories}
				listCategories={listCategories}
			/>
		</div>
	)
}

export default DashboardCategories
