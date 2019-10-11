import {combineReducers} from 'redux';

export default combineReducers({
    lat: (state = []) => state,
    locationId: (state = []) => state,
    locationSlug: (state = []) => state,
    long: (state = []) => state,
});
