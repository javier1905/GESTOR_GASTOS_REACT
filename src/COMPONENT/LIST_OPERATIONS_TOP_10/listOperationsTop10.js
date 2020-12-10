import moment from 'moment'

import './listOperationsTop10.css'

const ListOperationsTop10 = ({ listOperations }) => {
	return (
		<div className='container_listOperationsTop10'>
			<table id='table_operationTop10'>
				<thead>
					<tr>
						<th>Fecha</th>
						<th>Concepto</th>
						<th>Monto</th>
						<th>Categoria</th>
						<th>Tipo</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(listOperations) ? (
						listOperations
							.filter((_, i) => i < 10)
							.map((operation, index) => {
								return (
									<tr key={operation.idOperacion}>
										<td>{moment(operation.fechaOperacion).utc().format('DD/MM/YY')}</td>
										<td>{operation.conceptoOperacion}</td>
										<td>{`$ ${parseFloat(operation.montoOperacion).toFixed(2)}`}</td>
										<td>{operation.descripcionCategoria}</td>
										<td>{operation.tipoOperacion ? 'Ingreso' : 'Egreso'}</td>
									</tr>
								)
							})
					) : (
						<tr>
							<td></td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default ListOperationsTop10
