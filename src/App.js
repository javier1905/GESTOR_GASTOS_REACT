import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './REDUX/store'

import Main from './COMPONENT/MAIN/main'

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
					</Switch>
				</Router>
			</Provider>
		</>
	)
}

export default App
