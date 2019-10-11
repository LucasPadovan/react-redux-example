import {combineReducers} from 'redux';

export default combineReducers({
    isAuthenticated: (state = {}) => state,
    userId: (state = 0) => state,
});
