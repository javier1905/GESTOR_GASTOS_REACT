import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const MenuLoggetOut = () => {
	const history = useHistory()
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
				<button id='btn_Home-Main' onClick={e => history.push('/')}>
					Main
				</button>
			</div>
			<div className='container_btn_sing_mobile'>
				<button onClick={despliegaMenu} id='btn_despliegaMenu'>
					<FontAwesomeIcon icon={faBars} />
				</button>
				<div className='subMeni_mobile' ref={subMenuMobile}>
					<button name='login' onClick={handleOnClickMobile} id='btn_singIn_mobile'>
						Sign In
					</button>
					<button name='signup' onClick={handleOnClickMobile} id='btn_singUp_mobile'>
						Sign Up
					</button>
				</div>
			</div>
			<div className='container_btn_sing_web'>
				<button name='login' onClick={handleOnClickWeb} id='btn_singIn'>
					Sign In
				</button>
				<button name='signup' onClick={handleOnClickWeb} id='btn_singUp'>
					Sign Up
				</button>
			</div>
		</div>
	)
}

export default MenuLoggetOut
