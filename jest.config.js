/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */

module.exports = {
    'verbose': true,
    'setupFilesAfterEnv': [
        '<rootDir>/config/jest/setup.js',
    ],
    'moduleNameMapper': {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/jest/__mocks__/fileMock.js',
        '\\.(css|scss)$': 'identity-obj-proxy',
        'isomorphic-fetch': 'fetch-mock',
        'node-fetch': 'fetch-mock',
    },
    'testPathIgnorePatterns': [
        '<rootDir>/node_modules/',
        '<rootDir>/packages/',
        '<rootDir>/build/',
    ],
    'moduleDirectories': [
        '<rootDir>/node_modules/',
        '<rootDir>/packages/',
    ],
    'testMatch': ['**/*.unit.spec.js'],
    'rootDir': __dirname,
};
