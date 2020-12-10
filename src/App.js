import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './REDUX/store'

import Menu from './COMPONENT/MENU/menu'
import Main from './COMPONENT/MAIN/main'
import Home from './COMPONENT/HOME/home'
import Login from './COMPONENT/LOGIN/login'
import SignUp from './COMPONENT/SIGNUP/signUp'

import DashboardOperations from './COMPONENT/DASHBOARD_OPERATIONS/dashboardOperations'
import DashboardCategories from './COMPONENT/DASHBOARD_CATEGORIES/dashboardCategories'
import Auth from './COMPONENT/AUTH/auth'

import './app.css'

const App = () => {
	return (
		<>
			<Provider store={store}>
				<Router>
					<div className='margint_top'></div>
					<Menu />
					<Switch>
						<Route exact path='/'>
							<Main />
						</Route>
						<Route path='/login'>
							<Login />
						</Route>
						<Route path='/signup'>
							<SignUp />
						</Route>
						<Route path='/home'>
							<Auth>
								<Home />
							</Auth>
						</Route>
						<Route path='/operations'>
							<Auth>
								<DashboardOperations />
							</Auth>
						</Route>
						<Route path='/category'>
							<Auth>
								<DashboardCategories />
							</Auth>
						</Route>
					</Switch>
				</Router>
			</Provider>
		</>
	)
}

export default App
