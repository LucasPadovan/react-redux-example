import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

// eslint-disable-next-line no-console
process.on('unhandledRejection', (err) => console.error(err));

const CONSOLE_FAIL_TYPES = ['error', 'warn'];

const failOnConsole = (type, message) => {
    throw new Error(`Failing due to console.${type} while running test!\n\n${message}`);
};

CONSOLE_FAIL_TYPES.forEach((type) => {
    // eslint-disable-next-line no-console
    console[type] = failOnConsole.bind(null, type);
});

/*
The context module dynamically loads translation files.
This relies on `require.context` which is a Webpack feature not available to
Jest during tests runs.
So this line ensures this module is always mocked for all tests.
*/
jest.mock('../../messages/src/translations');
jest.mock('../../messages/src/translations/context');
