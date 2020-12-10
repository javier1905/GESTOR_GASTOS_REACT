import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userLogin from './reducers/userLogin'

const misReducers = combineReducers({ userLogin })

export default createStore(
	misReducers,
	composeWithDevTools(applyMiddleware(thunk)), //TODO: permite peticiones asincronas
	window.STATE_FROM_SERVER
)
