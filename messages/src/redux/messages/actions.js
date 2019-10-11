export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const updateMessages = ({messages}) => ({
    type: UPDATE_MESSAGES,
    payload: {
        content: [
            {}
        ],
    },
});

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
