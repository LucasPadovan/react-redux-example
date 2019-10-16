import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Menu from './Menu/Menu';

import './Navbar.scss';


const Navbar = () => (
    <AppBar position="static">
        <Toolbar>
            <Menu />

            <Typography variant="h6" className="navbar__title">
                React redux examples
            </Typography>
            
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
);

export default Navbar;
