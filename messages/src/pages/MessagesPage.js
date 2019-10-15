import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';

import reducer from '../redux/rootReducer';

import {configureInitialState, configureStore} from '../utils/store';

import ConnectedPage from '../containers/ConnectedPage';

export default class MessagesPage extends React.Component {
    static propTypes = {
        locations: PropTypes.shape({
            places: PropTypes.arrayOf(PropTypes.object),
        }),
        messages: PropTypes.shape({
            content: PropTypes.arrayOf(
                PropTypes.shape({
                    content: PropTypes.string.isRequired,
                    date: PropTypes.string,
                    profilePicture: PropTypes.string,
                    userName: PropTypes.string,
                }),
            ),
        }),
    }

    constructor(props) {
        super(props);

        /**
         * Let's create a store with redux-thunk and set the initial state
         * If you need to add or modify objects in the store, remember to start
         * adding them to the 'configureInitialState' method
         */
        this._store = configureStore({
            reducer,
            initialState: configureInitialState(props),
            middleware: [
                thunk,
            ],
        });
    }

    render() {
        return (
            <Provider store={this._store}>
                <ConnectedPage {...this.props} />
            </Provider>
        );
    }
}
