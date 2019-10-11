import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';

const isDevMode = () => (process.env.NODE_ENV === 'development' && process.env.REACT_APP_TARGET === 'web');

/**
 * Configures a new redux store with dev mode capabilities
 * @property {import('redux').Reducer<{}>} reducer Reducer to use
 * @property {object} initialState Initial state
 * @property {import('redux').Middleware[]} middleware Array of middleware
 */
export const configureStore = (({
    reducer,
    initialState,
    middleware = [thunk],
}) => {
    let _middleware = applyMiddleware(...middleware);

    if (isDevMode) {
        _middleware = 
        composeWithDevTools(
            applyMiddleware(...middleware, createLogger({collapsed: true})),
        );
    }

    return (
        createStore(
            reducer,
            initialState,
            _middleware,
        )
    )
});

export const configureInitialState = (props) => {
    const {
        env: {
            domain,
        } = {},
        messages,
        user: {
            isAuthenticated,
            userId,
        } = {},
        userLocation: {
            lat,
            locationId,
            locationSlug,
            long,
        } = {},
    } = props;

    /**
     * Any key existing in this object should have a key in
     * redux/rootReducer.js > combineReducer method
     */
    return {
        env: {
            domain,
        },
        frontend: {
            isLoading: false,
            isLoadingMessages: false,
        },
        messages,
        user: {
            isAuthenticated,
            userId,
        },
        userLocation: {
            lat,
            locationId,
            locationSlug,
            long,
        },
    };
};
