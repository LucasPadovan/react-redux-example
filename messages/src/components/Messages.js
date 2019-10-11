import React, {Component} from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import Message from './Message';


export default class Messages extends Component {
    static propTypes = {
        messages: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string.isRequired,
                date: PropTypes.string,
                profilePicture: PropTypes.string,
                userName: PropTypes.string,
            }),
        ),
    };

    render() {
        const {messages} = this.props;

        if (isEmpty(messages)) {
            return <div>Algo habias</div>;
        }

        return (
            <div className="messages">
                {
                    messages.map(({
                        content,
                        date,
                        profilePicture,
                        userName,
                    }) => (
                        <Message
                            key={content}
                            content={content}
                            date={date}
                            profilePicture={profilePicture}
                            userName={userName}
                        />
                    ))
                }
            </div>
        );
    }
}
