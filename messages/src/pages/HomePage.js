import React from 'react';
import {Link} from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Navbar from '../components/Navbar';

import './HomePage.scss';


export default class MessagesPage extends React.Component {
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
                    <Link to="/messages">
                        Ir a los mensajes
                    </Link>
                </Container>
            </div>
        );
    }
}
