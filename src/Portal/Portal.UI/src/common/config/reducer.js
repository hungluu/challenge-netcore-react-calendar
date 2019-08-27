import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { routerReducer } from 'react-router-redux'

import ShiftsReducer from '../../shifts/config/reducer'

const defaultState = {}

const AppReducer = handleActions({
    // actions
}, defaultState)

export default combineReducers({
    app: AppReducer,
    shifts: ShiftsReducer,
    routing: routerReducer
})