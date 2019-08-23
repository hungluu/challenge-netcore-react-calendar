import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { routerReducer } from 'react-router-redux'

import ShopsReducer from '../../shifts/config/reducer'

const defaultState = {}

const AppReducer = handleActions({
    // actions
}, defaultState)

export default combineReducers({
    app: AppReducer,
    shops: ShopsReducer,
    routing: routerReducer
})