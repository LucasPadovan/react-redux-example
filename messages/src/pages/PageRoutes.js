import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import HomePage from './HomePage';
import MessagesPage from './MessagesPage';


/**
 * Each route will have to be explicitly declared with the component you will render
 * on each one.
 * As we are using webpack as our dev server, each one of these routes will also have
 * to be declared in the config file.
 * For production environments some other configuration will be necessary (to be completed later).
 * Let's go to webpack.config.js and find the `messagesAppResponse` object.
 */
export default function PageRoutes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/"
                    exact={true}
                    render={
                        (routerProps) => <HomePage {...props} {...routerProps} />
                    }
                />
                <Route
                    path="/messages"
                    render={
                        (routerProps) => <MessagesPage {...props} {...routerProps} />
                    }
                />
            </Switch>
        </BrowserRouter>
    )
}

