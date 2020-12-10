import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Operation from '../OPERATION/operation'
import { getListCategories } from '../../SERVICE/service'

import './listOperations.css'

const ListOperations = memo(({ listOperations, refreshListOperations }) => {
	const [listCategorias, setlistCategorias] = useState([])
	const userLogin = useSelector(state => state.userLogin)

	const history = useHistory()

	useEffect(() => {
		;(async () => {
			const result = await getListCategories(userLogin.idUsuario)

			if (result.data.logOK === false) return history.push('/login')
			if (result.data.opOK) setlistCategorias(result.data.listCategorias)
		})()
	}, [userLogin, history])

	return (
		<div className='container_listOperations'>
			<table id='table_operations'>
				<thead>
					<tr>
						<th>Id</th>
						<th>Fecha</th>
						<th>Concepto</th>
						<th>Monto</th>
						<th>Tipo</th>
						<th>Categoria</th>
						<th>Editar</th>
						<th>Eliminar</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(listOperations) ? (
						listOperations.map(operation => (
							<Operation
								refreshListOperations={refreshListOperations}
								key={operation.idOperacion}
								operation={operation}
								listCategorias={listCategorias}
							/>
						))
					) : (
						<tr>
							<td colSpan='4'></td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
})

export default ListOperations
