import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import ConnectedMessages from './ConnectedMessages';

import Navbar from '../components/Navbar';

import './Page.scss';


export default class Page extends Component {
    render() {
        return (
            <div>
                <Navbar classNames="navbar" />

                <Container maxWidth="lg">
                    <Typography variant="h1">
                        React redux
                    </Typography>
                    <Typography variant="h2">
                        With simple messages board
                    </Typography>

                    <ConnectedMessages />
                </Container>
            </div>
        );
    }
}
