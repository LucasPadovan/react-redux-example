import React, {Component} from 'react';

import PageRoutes from './pages/PageRoutes';


/**
 * We often need to declare multiple routes in our page so we create a
 * new file where all routes will be declared.
 */
export default class ReactReduxApp extends Component {
    render() {
        return (
            <PageRoutes {...this.props} />
        );
    }
}
