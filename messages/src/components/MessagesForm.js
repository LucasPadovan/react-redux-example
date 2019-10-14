import React, {Component, useState} from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import './MessagesForm.scss';


export default class MessagesForm extends Component {
    state = {
        content: 'Insert your message',
        date: '2019',
        profilePicture: 'Empty',
        userName: 'Your name',
    };

    _handleFormSubmit = (e) => {
        e.preventDefault();

        this.props.addNewMessage(this.state);
    }

    _handleInputChange = (event) => {
        const {name, value} = event.target
        
        this.setState({
            [name]: value,
        });
    }
    
    render() {
        const {
            content,
            date,
            profilePicture,
            userName,
        } = this.state;

        return (
            <Card className="messages__form">
                <form noValidate autoComplete="off" onSubmit={this._handleFormSubmit}>
                    <TextField
                        id="messages-username"
                        label="Username"
                        value={userName}
                        name="userName"
                        onChange={this._handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        id="messages-date"
                        label="Date"
                        value={date}
                        name="date"
                        onChange={this._handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        id="messages-content"
                        label="Message"
                        value={content}
                        name="content"
                        onChange={this._handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        id="messages-profile-picture"
                        label="Profile picture"
                        value={profilePicture}
                        name="profilePicture"
                        onChange={this._handleInputChange}
                        margin="normal"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Add new message
                    </Button>
                </form>
            </Card>
        );
    }
}
