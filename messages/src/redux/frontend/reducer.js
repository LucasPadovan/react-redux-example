import {combineReducers} from 'redux';

import {SET_LOADING, SET_LOADING_MESSAGES} from './actions';

const isLoading = (state = false, {type, payload}) => {
    let newState = state;

    if (type === SET_LOADING) {
        newState = payload;
    }

    return newState;
};

const isLoadingMessages = (state = false, {type, payload}) => {
    let newState = state;

    if (type === SET_LOADING_MESSAGES) {
        newState = payload;
    }

    return newState;
};

export default combineReducers({
    isLoading,
    isLoadingMessages,
});
