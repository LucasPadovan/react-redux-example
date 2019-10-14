export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';

/**
 * Despite being simple, this function will launch a message with the name UPDATE_MESSAGES
 * and some information attached to it, in this case the `payload` that wil be
 * the content of what we will be receiving in the function stated in the reducers like
 * redux/messages/reducer.js
 * Here also, the content will be an array with messages.
 */
export const updateMessages = (content) => ({
    type: UPDATE_MESSAGES,
    payload: content,
});

/**
 * This function will get the current state of the store, get some values
 * and will dispatch another function that continues the redux flow to
 * actually do something with the store.
 */
export const addNewMessage = ({
    content,
    date,
    profilePicture,
    userName,
} = {}) => (
    (dispatch, getState) => {
        const {
            messages,
        } = getState();

        const payload = [
            ...messages.content,
            {
                content,
                date,
                profilePicture,
                userName,
            }
        ];
        
        return dispatch(updateMessages(payload));
    }
);
