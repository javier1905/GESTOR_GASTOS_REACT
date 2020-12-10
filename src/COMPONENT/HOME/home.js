import { useEffect, useState } from 'react'
import { getListOperations } from '../../SERVICE/service'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBalanceScaleRight } from '@fortawesome/free-solid-svg-icons'

import './home.css'
import ListOperationsTop10 from '../LIST_OPERATIONS_TOP_10/listOperationsTop10'

const Home = () => {
	const [listOperations, setlistOperations] = useState([])
	const [valance, setvalance] = useState(0)
	const userLogin = useSelector(store => store.userLogin)

	useEffect(() => {
		;(async () => {
			const result = await getListOperations(userLogin.idUsuario)
			if (result.data.opOK) setlistOperations(result.data.listOperaciones)
		})()
	}, [userLogin])

	useEffect(() => {
		let valance = 0
		// si el tipo de operacion es TRUE es un INGRESO y si FALSE es in EGRESO
		listOperations.forEach(operation => {
			if (operation.tipoOperacion) valance += operation.montoOperacion
			else valance -= operation.montoOperacion
		})
		setvalance(valance)
	}, [listOperations])

	return (
		<div className='container_home'>
			<div className='balace_actual'>
				<FontAwesomeIcon icon={faBalanceScaleRight} />
				<p>Balance actual</p>
				<h3>{`$ ${parseFloat(valance).toFixed(2)}`}</h3>
			</div>
			<ListOperationsTop10 listOperations={listOperations} />
		</div>
	)
}

export default Home
