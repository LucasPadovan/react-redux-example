export const UPDATE_PAGE_CONTENT = 'UPDATE_PAGE_CONTENT';
export const updatePageContent = ({messages}) => ({
    type: UPDATE_PAGE_CONTENT,
    payload: {
        messages,
        firstMessage: messages[0],
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
