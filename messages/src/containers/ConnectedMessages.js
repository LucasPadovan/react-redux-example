import {connect} from 'react-redux';

import Messages from '../components/Messages';

import {addNewMessage} from '../redux/messages/actions';
import {getMessagesContent} from '../redux/messages/selectors';

const _mapStateToProps = ({messages, isLoading}) => ({
    messages: getMessagesContent({messages}),
    isLoading,
});

const _mapDispatchToProps = {
    addNewMessage,
};

export default connect(
    _mapStateToProps,
    _mapDispatchToProps,
)(Messages);
