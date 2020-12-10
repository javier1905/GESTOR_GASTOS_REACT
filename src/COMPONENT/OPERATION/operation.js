import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

import Modal from '../MODAL/modal'
import useModal from '../MODAL/useModal'
import FormOperation from '../FORM_OPERATION/formOperation'
import { deleteOperation } from '../../SERVICE/service'
import { showAlert } from '../ALERT/alert'

const Operation = memo(({ operation, refreshListOperations, listCategorias }) => {
	const [show, openModal, closeModal] = useModal(false)

	const history = useHistory()

	const handleUpdateOperation = e => openModal()

	const handleRemoveOperation = e => {
		;(async () => {
			const result = await deleteOperation(operation.idOperacion)

			if (result.data.logOK === false) return history.push('/login')
			if (result.data.opOK) {
				showAlert('successful', result.data.message)
				refreshListOperations()
			} else showAlert('error', result.data.message)
		})()
	}

	return (
		<tr>
			<td>{operation.idOperacion}</td>
			<td>{moment.utc(operation.fechaOperacion).format('DD/MM/YYYY')}</td>
			<td>{operation.conceptoOperacion}</td>
			<td>{`$ ${parseFloat(operation.montoOperacion).toFixed(2)}`}</td>
			<td>{operation.tipoOperacion ? 'Ingreso' : 'Egreso'}</td>
			<td>{operation.descripcionCategoria}</td>
			<td>
				<button onClick={handleUpdateOperation}>
					<FontAwesomeIcon icon={faPencilAlt} />
				</button>
			</td>
			<td>
				<button onClick={handleRemoveOperation}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
				<Modal show={show} closeModal={closeModal}>
					<FormOperation
						show={show}
						closeModal={closeModal}
						operation={operation}
						refreshListOperations={refreshListOperations}
						listCategorias={listCategorias}
					/>
				</Modal>
			</td>
		</tr>
	)
})

export default Operation

Operation.propTypes = {
	operation: PropTypes.shape({
		idOperacion: PropTypes.number,
		fechaOperacion: PropTypes.string,
		conceptoOperacion: PropTypes.string,
		montoOperacion: PropTypes.number,
		tipoOperacion: PropTypes.bool,
		descripcionCategoria: PropTypes.string,
	}).isRequired,
	listCategorias: PropTypes.array.isRequired,
}
