import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Cookie from 'universal-cookie'
import { useDispatch } from 'react-redux'

import setUserLogin from '../../../REDUX/action/setUserLogin'

const MenuLoggedIn = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const subMenuMobile = useRef()

	const despliegaMenu = e => {
		subMenuMobile.current.classList.value.split(' ').forEach(clas => {
			if (clas === 'showSubmenu') {
				subMenuMobile.current.classList.remove('showSubmenu')
				subMenuMobile.current.classList.add('hideSubmenu')
				return
			} else if (clas === 'hideSubmenu') {
				subMenuMobile.current.classList.remove('hideSubmenu')
				subMenuMobile.current.classList.add('showSubmenu')
				return
			} else subMenuMobile.current.classList.add('showSubmenu')
		})
	}

	const handleSignOut = e => {
		despliegaMenu()
		const cookie = new Cookie()
		dispatch(setUserLogin({ idUsuario: '', emailUsuario: '' }))
		cookie.remove('token')
		history.push('/')
	}

	const handleOnClickMobile = e => {
		const { name } = e.target
		history.push(`/${name}`)
		despliegaMenu()
	}

	const handleOnClickWeb = e => {
		const { name } = e.target
		history.push(`/${name}`)
	}

	return (
		<div className='container_headerHome'>
			<div className='container_tiruloHeader'>
				<button id='btn_Home-Main' onClick={e => history.push('/home')}>
					Home
				</button>
			</div>
			<div className='container_btn_sing_mobile'>
				<button onClick={despliegaMenu} id='btn_despliegaMenu'>
					<FontAwesomeIcon icon={faBars} />
				</button>
				<div className='subMeni_mobile' ref={subMenuMobile}>
					<button name='category' onClick={handleOnClickMobile} id='btn_singIn_mobile'>
						Category
					</button>
					<button name='operations' onClick={handleOnClickMobile} id='btn_singUp_mobile'>
						Operations
					</button>

					<button onClick={e => handleSignOut()} id='btn_singOut'>
						Sign Out
					</button>
				</div>
			</div>
			<div className='container_btn_sing_web'>
				<button name='category' onClick={handleOnClickWeb} id='btn_singIn'>
					Category
				</button>
				<button name='operations' onClick={handleOnClickWeb} id='btn_singUp'>
					Operations
				</button>

				<button onClick={e => handleSignOut()} id='btn_singOut'>
					Sign Out
				</button>
			</div>
		</div>
	)
}

export default MenuLoggedIn
