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
        addNewMessage: PropTypes.func,
    };

    render() {
        const {messages, addNewMessage} = this.props;

        if (isEmpty(messages)) {
            return <div>Algo habias</div>;
        }

        return (
            <div className="messages">
                <button onClick={addNewMessage.bind(null, {
                    content: 'Hola',
                    date: 'hoy',
                    profilePicture: 'sin',
                    userName: 'Padovan',
                })}>
                    Add new message
                </button>
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
