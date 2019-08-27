import { assign, uniqBy } from 'lodash'
import * as actions from './actions'
import { handleActions } from 'redux-actions'

const defaultState = {
    shops: [],
    shiftSettings: [],
    employees: []
}

const ShiftsReducer = handleActions({
    [actions.ADD_SHOPS]: (state, action) => assign({}, state, {
        shops: action.payload
    }),
    [actions.ADD_SHIFT_SETTINGS]: (state, action) => assign({}, state, {
        shiftSettings: uniqBy(state.shiftSettings.concat(action.payload), st => st.id)
    }),
    [actions.ADD_EMPLOYEES]: (state, action) => assign({}, state, {
        employees: action.payload
    })
}, defaultState)

export default ShiftsReducer