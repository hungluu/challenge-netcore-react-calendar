import { createStore, compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducer from './reducer'

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = typeof window.initialReduxState !== "undefined" ? window.initialReduxState : {}

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
}

const middlewares = [
    reduxThunk
]
const enhancers = [
    applyMiddleware(...middlewares)
]
const AppStore = createStore(reducer, initialState, composeEnhancers(...enhancers))

export default AppStore