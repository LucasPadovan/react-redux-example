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

        /**
         * This function comes from the ConnectedMessages component so if you want to add
         * more functions that modify the store you should go to containers/ConnectedMessages.js
         * to follow the guide.
         */
        addNewMessage: PropTypes.func,
    };

    render() {
        const {messages, addNewMessage} = this.props;

        if (isEmpty(messages)) {
            return <div>Algo habia</div>;
        }

        return (
            <div className="messages">
                <button onClick={addNewMessage.bind(null, {
                    content: 'a new message',
                    date: 'another date',
                    profilePicture: 'profile pic',
                    userName: 'Sebastian',
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
