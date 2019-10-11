import {storeLastVisitedCard, retrieveLastVisitedCard} from './localStorage';

describe('localStorage', () => {
    it('should have no last visited cards history', () => {
        const bucketKey = 'the_first_bucket';
        const searchHistory = retrieveLastVisitedCard({bucketKey});

        expect(searchHistory).toBeUndefined();
    });

    it ('should store the last visited card key with its index', () => {
        const bucketKey = 'the_first_bucket';

        const lastVisitedCardKey = 'this_key';

        const lastVisitedCardIndex = 1;

        const expectedLastVisitedCardStored = {
            cardKey: lastVisitedCardKey,
            index: lastVisitedCardIndex,
        };

        storeLastVisitedCard({bucketKey, lastVisitedCardKey, lastVisitedCardIndex});

        expect(retrieveLastVisitedCard({bucketKey})).toEqual(expectedLastVisitedCardStored);

        localStorage.clear();
    });

    it ('should not return anything from another bucket', () => {
        const bucketKey = 'the_first_bucket';

        const anotherBucketKey = 'the_second_bucket';

        const lastVisitedCardKey = 'this_key';

        const lastVisitedCardIndex = 1;

        storeLastVisitedCard({bucketKey, lastVisitedCardKey, lastVisitedCardIndex});

        expect(retrieveLastVisitedCard(anotherBucketKey)).toBeUndefined();
    });
});
