import {getUserMessages} from './api';

export const getMessagesContent = () => (
    (dispatch) => (
        getUserMessages().then((response) => {
            const {
                entities: {
                    events: likedEvents,
                } = {},
                result: {
                    events: likedEventIds,
                },
            } = getTransformedContent('events', response);

            dispatch(updateLikesEventBucket(likedEvents, likedEventIds));
        })
    )
);