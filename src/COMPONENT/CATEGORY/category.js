import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import Modal from '../MODAL/modal'
import useModal from '../MODAL/useModal'
import FormCategory from '../FORM_CATEGORY/formCategory'
import { deleteCategory } from '../../SERVICE/service'
import { showAlert } from '../ALERT/alert'

const Category = memo(({ category, refreshListCategories }) => {
	const [show, openModal, closeModal] = useModal(false)

	const history = useHistory()

	const handleUpdateCategoria = e => openModal()

	const handleRemoveCategoria = e => {
		;(async () => {
			const result = await deleteCategory(category.idCategoria)
			if (result.data.logOK === false) return history.push('/login')
			if (result.data.opOK) {
				showAlert('successful', result.data.message)
				refreshListCategories()
			} else showAlert('error', result.data.message)
		})()
		deleteCategory(category.idCategoria)
	}

	return (
		<tr>
			<td>{category.idCategoria}</td>
			<td>{category.descripcionCategorias}</td>
			<td>
				<button onClick={handleUpdateCategoria}>
					<FontAwesomeIcon icon={faPencilAlt} />
				</button>
			</td>
			<td>
				<button onClick={handleRemoveCategoria}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
				<Modal show={show} closeModal={closeModal}>
					<FormCategory
						show={show}
						closeModal={closeModal}
						category={category}
						refreshListCategories={refreshListCategories}
					/>
				</Modal>
			</td>
		</tr>
	)
})

export default Category

Category.propTypes = {
	category: PropTypes.shape({
		idCategoria: PropTypes.number,
		descripcionCategorias: PropTypes.string,
	}).isRequired,
}
