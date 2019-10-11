import {combineReducers} from 'redux';

import frontendReducer from './frontend/reducer';
import messagesReducer from './messages/reducer';
import userReducer from './user/reducer';
import userLocationReducer from './userLocation/reducer';

/**
 * If you have changed anything in the configureInitialState
 * you should have a reducer corresponding to that change
 */
export default combineReducers({
    env: (state = []) => state,
    frontend: frontendReducer,
    messages: messagesReducer,
    userLocation: userLocationReducer,
    user: userReducer,
});
