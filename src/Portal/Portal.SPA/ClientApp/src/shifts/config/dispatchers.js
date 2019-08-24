import {
    UPDATE_MESSAGE
} from './actions'

export const updateMessage = function (message) {
    return dispatch => dispatch(UPDATE_MESSAGE(message))
}