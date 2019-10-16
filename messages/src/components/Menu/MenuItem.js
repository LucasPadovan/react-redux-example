import React from 'react';
import {Link} from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';


const SimpleMenuItem = ({
    iconType,
    label,
    link,
    onClick,
}) => (
    <MenuItem onClick={onClick}>
        <Link to={link}>
            {label}
        </Link>
    </MenuItem>
);

export default SimpleMenuItem;
