import React from 'react'
import './modal.css'

const Modal = ({ show, closeModal, children }) => {
	const handleCloseModal = e => closeModal()

	const handlePrevenClose = e => e.stopPropagation()

	return (
		<div className={`container_modal ${show ? '' : 'hiddenModal'}`} onClick={handleCloseModal}>
			<div className='contend_modal' onClick={handlePrevenClose}>
				<button id='btn_closeModal' onClick={handleCloseModal}>
					x
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal
