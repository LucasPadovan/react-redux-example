export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const updateMessages = ({content}) => ({
    type: UPDATE_MESSAGES,
    payload: {
        content,
    },
});

export const addNewMessage = ({
    content,
    date,
    profilePicture,
    userName,
}) => (
    (dispatch, getState) => {
        const {
            messages,
        } = getState();

        const payload = [
            messages.content,
            ...{
                content,
                date,
                profilePicture,
                userName,
            }
        ];

        dispatch(updateMessages(payload));
    }
);

export const runSearch = (term) => (
    (dispatch, getState) => {
        const {
            location: {slug},
        } = getState();
        const locationString = trim(slug) || 'local';

        let url = `/search/${locationString}/all-events`;

        if (term) {
            // url = getCanonicalSearchUrl({
            //     slug: locationString,
            //     q: term,
            // });
        }

        setWindowLocation(url);
    }
);
