import {combineReducers} from 'redux';

import {UPDATE_MESSAGES} from '../messages/actions';

/**
 * Catches actions by type and decides what to do with the payload.
 * The action `type` is triggered by dispatched functions.
 * The `payload` structure is defined in the action. Check: redux/messages/actions.js
 * * Check that the action `type` is also part of the function in order to match with this function.
 * * `content` here is an array so the default value for the `state` will be an empty array.
 */
const content = (state = [], {type, payload}) => {
    let nextState = state;

    if (type === UPDATE_MESSAGES) {
        nextState = payload;
    }

    return nextState;
};

/**
 * Each of the keys added to combineReducer will be part of an object that will exist
 * under the name where this reducer is imported in the rootReducer.js
 * Hopefully the object returned here has proptypes defined. If so, check that each method
 * returns the same type that is expected.
 */
export default combineReducers({
    content,
});
