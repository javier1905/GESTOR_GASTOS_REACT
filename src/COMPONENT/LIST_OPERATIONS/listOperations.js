import { memo } from 'react'
import PropTypes from 'prop-types'

import Operation from '../OPERATION/operation'

import './listOperations.css'

const ListOperations = memo(({ listOperations, listCategorias, refreshListOperations }) => {
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

ListOperations.propTypes = {
	listOperations: PropTypes.array.isRequired,
	listCategorias: PropTypes.array.isRequired,
}
