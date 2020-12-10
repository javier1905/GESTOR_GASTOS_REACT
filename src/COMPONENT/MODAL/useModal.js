import { useState, useEffect } from 'react'

function useModal(initialValue = false) {
	const [show, setshow] = useState(initialValue)

	useEffect(() => {
		const body = document.querySelector('body')
		show ? body.classList.add('stopScroll') : body.classList.remove('stopScroll')
	}, [show])

	const openModal = () => setshow(true)

	const closeModal = () => setshow(false)

	return [show, openModal, closeModal]
}

export default useModal
