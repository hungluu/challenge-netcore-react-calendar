﻿//import { assign } from 'lodash'
//import * as actions from './actions'
import { handleActions } from 'redux-actions'

const defaultState = {
    shiftSettings: []
}

const ShopsReducer = handleActions({
    //[actions.UPDATE_MESSAGE]: (state, action) => assign({}, state, {
    //    message: action.payload
    //})
}, defaultState)

export default ShopsReducer