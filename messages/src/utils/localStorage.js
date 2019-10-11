const LOCAL_STORAGE_KEY = 'article_organizer_cards';

/**
 * Stores in localStorage the last visited card and its index.
 * @param {string} bucketKey
 * @param {string} lastVisitedCardKey
 * @param {integer} lastVisitedCardIndex
 */
export const storeLastVisitedCard = ({bucketKey, lastVisitedCardKey, lastVisitedCardIndex}) => {
    const bucketLastVisitedKey = {
        [`${bucketKey}`]: {
            cardKey: lastVisitedCardKey,
            index: lastVisitedCardIndex,
        },
    };

    const lastVisitedCards = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedLastVisitedCards = {
        ...JSON.parse(lastVisitedCards),
        ...bucketLastVisitedKey,
    };

    localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(parsedLastVisitedCards),
    );
};

/**
 * Returns the last visited organizer article card stored in a certain bucket.
 * @param {string} bucketKey
 * Returns:
 * * {cardKey (string), index (integer)}
 */
export const retrieveLastVisitedCard = ({bucketKey}) => {
    const lastVisitedCards = localStorage.getItem(LOCAL_STORAGE_KEY);

    let response;

    if (lastVisitedCards) {
        response = JSON.parse(lastVisitedCards)[bucketKey];
    }

    return response;
};
