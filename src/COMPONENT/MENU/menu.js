import { useSelector } from 'react-redux'

import './menu.css'
import MenuLoggedIn from './MENU_LOGGET_IN/menuLoggetInt'
import MenuLoggetOut from './MENU_LOGGET_OUT/menuLoggetOut'

const Menu = () => {
	const userLogin = useSelector(store => store.userLogin)

	return userLogin.emailUsuario === '' ? <MenuLoggetOut /> : <MenuLoggedIn />
}

export default Menu
