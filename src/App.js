import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './REDUX/store'

import Main from './COMPONENT/MAIN/main'
import Login from './COMPONENT/LOGIN/login'
import SignUp from './COMPONENT/SIGNUP/signUp'

import './app.css'

const App = () => {
	return (
		<>
			<Provider store={store}>
				<Router>
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
					</Switch>
				</Router>
			</Provider>
		</>
	)
}

export default App
