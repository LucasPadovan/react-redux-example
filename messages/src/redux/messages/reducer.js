import {combineReducers} from 'redux';

import {UPDATE_MESSAGES} from '../messages/actions';


/**
 * Catches actions by type and decides what to do with the payload.
 * The action `type` is triggered by dispatched functions.
 * The `payload` structure is defined in the action. Check: redux/messages/actions.js
 * * Check that the action `type` is also part of the function in order to match with this function.
 */
const content = (state = [], {type, payload}) => {
    let nextState = state;

    if (type === UPDATE_MESSAGES) {
        nextState = payload;
    }

    return nextState;
};

export default combineReducers({
    content,
});
