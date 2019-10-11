import {connect} from 'react-redux';

import Messages from '../components/Messages';

import {getMessagesContent} from '../redux/messages/selectors';

const _mapStateToProps = ({messages, isLoading}) => ({
    messages: getMessagesContent({messages}),
    isLoading,
});

export default connect(
    _mapStateToProps,
)(Messages);
