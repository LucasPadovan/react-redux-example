import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ConnectedMessages from './ConnectedMessages';

import './Page.scss';


export default class Page extends Component {
    static propTypes = {
        handleSearch: PropTypes.func,
    }

    render() {
        return (
            <div>
                <h1>Bienvenidos a mi pagina de nadas</h1>

                <ConnectedMessages />
            </div>
        );
    }
}
