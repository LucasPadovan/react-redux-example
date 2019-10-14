import {connect} from 'react-redux';

import Messages from '../components/Messages';

import {addNewMessage} from '../redux/messages/actions';
import {getMessagesContent} from '../redux/messages/selectors';

const _mapStateToProps = ({messages, isLoading}) => ({
    messages: getMessagesContent({messages}),
    isLoading,
});

/**
 * We create a _mapDispatchToProps object to expose any number of actions that will be available
 * in the Messages component.
 * For now let's go to redux/messages/actions.js > addNewMessage function to see how the action
 * is dispatched to be executed properly.
 */
const _mapDispatchToProps = {
    addNewMessage,
};

export default connect(
    _mapStateToProps,
    _mapDispatchToProps,
)(Messages);
