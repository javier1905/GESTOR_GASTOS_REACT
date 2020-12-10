import Cookie from 'universal-cookie'
import axios from 'axios'

const urlApi = process.env.REACT_APP_URL_API

export const login = async (emailUsuario, pwUsuario) => {
	try {
		return await axios.post(`${urlApi}/api/login`, {
			emailUsuario,
			pwUsuario,
		})
	} catch (e) {
		const data = { opOK: false, message: e.message }
		return { data }
	}
}

export const getUserLogin = async () => {
	const token = new Cookie().get('token')
	try {
		return await axios.get(`${urlApi}/api/getuserlogin`, {
			headers: { Authorization: `Bearer ${token}` },
		})
	} catch (e) {
		const data = { opOK: false, message: e.message, logOK: false }
		return { data }
	}
}

export const signUp = async (emailUsuario, pwUsuario) => {
	try {
		return await axios.post(`${urlApi}/api/signup`, {
			emailUsuario,
			pwUsuario,
		})
	} catch (e) {
		return { opOK: false, message: e.message }
	}
}

export const getListCategories = async idUsuario => {
	const token = new Cookie().get('token')
	try {
		return await axios.post(
			`${urlApi}/api/category/list`,
			{ idUsuario },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
	} catch (e) {
		if (axios.isCancel(e)) {
		} else {
			const data = { opOK: false, message: e.message, logOK: true }
			return { data }
		}
	}
}

export const saveCategory = async (idUsuario, descripcionCategoria) => {
	const token = new Cookie().get('token')
	try {
		return await axios.post(
			`${urlApi}/api/category/save`,
			{ idUsuario, descripcionCategoria },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
	} catch (e) {
		const data = { opOK: false, message: e.message, logOK: true }
		return { data }
	}
}

export const updateCategory = async (idCategoria, descripcionCategoria) => {
	const token = new Cookie().get('token')
	try {
		return await axios.put(
			`${urlApi}/api/category/update`,
			{ idCategoria, descripcionCategoria },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
	} catch (e) {
		const data = { opOK: false, message: e.message, logOK: true }
		return { data }
	}
}

export const deleteCategory = async idCategoria => {
	const token = new Cookie().get('token')
	try {
		return await axios.put(
			`${urlApi}/api/category/delete`,
			{ idCategoria },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
	} catch (e) {
		const data = { opOK: false, message: e.message, logOK: true }
		return { data }
	}
}

export const getListOperations = async idUsuario => {
	const token = new Cookie().get('token')
	try {
		return await axios.post(
			`${urlApi}/api/operation/list`,
			{ idUsuario },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
	} catch (e) {
		const data = { opOK: false, message: e.message, logOK: true }
		return { data }
	}
}

export const saveOperation = async (
	conceptoOperacion,
	montoOperacion,
	fechaOperacion,
	tipoOperacion,
	idUsuario,
	idCategoria
) => {
	const token = new Cookie().get('token')
	try {
		return await axios.post(
			`${urlApi}/api/operation/save`,
			{ conceptoOperacion, montoOperacion, fechaOperacion, tipoOperacion, idUsuario, idCategoria },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
	} catch (e) {
		const data = { opOK: false, message: e.message, logOK: true }
		return { data }
	}
}

export const updateOperation = async (
	idOperacion,
	conceptoOperacion,
	montoOperacion,
	fechaOperacion,
	idCategoria
) => {
	const token = new Cookie().get('token')
	try {
		return await axios.put(
			`${urlApi}/api/operation/update`,
			{ idOperacion, conceptoOperacion, montoOperacion, fechaOperacion, idCategoria },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
	} catch (e) {
		const data = { opOK: false, message: e.message, logOK: true }
		return { data }
	}
}

export const deleteOperation = async idOperacion => {
	const token = new Cookie().get('token')
	try {
		return await axios.put(
			`${urlApi}/api/operation/delete`,
			{ idOperacion },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
	} catch (e) {
		const data = { opOK: false, message: e.message, logOK: true }
		return { data }
	}
}
