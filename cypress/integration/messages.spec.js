/* eslint-disable no-undef */
/* eslint-disable import/unambiguous */
/* eslint-disable jest/consistent-test-it */
/* eslint-disable jest/valid-expect */
import defaultContext from '../../messages/src/__fixtures__/fakeContext.json.js';

const visitPage = (serverData) => {
    cy.visit('/', {
        onBeforeLoad: (win) => {
            // eslint-disable-next-line no-param-reassign
            win.__SERVER_DATA__ = serverData;
        },
    });
};

context('Messages', () => {
    beforeEach(() => {
        // 1. Mock out routes
        cy.server({force404: true});
    });

    context('Homepage', () => {
        it('will render the homepage correctly', () => {
            visitPage(defaultContext);

            cy.get('#root').should('exist');
        });
    });
});
