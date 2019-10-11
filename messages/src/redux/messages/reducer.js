import {combineReducers} from 'redux';

import {
    UPDATE_PAGE_CONTENT,
} from '../messages/actions';


const content = (state = [], {type, payload, meta}) => {
    let nextState = state;

    if (type === UPDATE_PAGE_CONTENT) {
        nextState = payload;
    }

    return nextState;
};

export default combineReducers({
    content,
});
