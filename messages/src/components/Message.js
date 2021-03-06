import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';

import './Message.scss';

const Message = ({
    content,
    date,
    profilePicture,
    userName,
}) => (
    <Card className="message-container">
        <div className="message-container__aside">
            <div className="message-container__user-name">{userName}</div>
            <div className="message-container__profile-picture">{profilePicture}</div>
        </div>
        <div className="message-container__content">
            <div className="message-container__date">{date}</div>
            <div className="message-container__body">{content}</div>
        </div>
    </Card>
);

Message.propTypes = {
    content: PropTypes.string.isRequired,
    date: PropTypes.string,
    profilePicture: PropTypes.string,
    userName: PropTypes.string,
};

export default Message;
