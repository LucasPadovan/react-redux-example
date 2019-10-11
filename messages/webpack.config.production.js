/* eslint-disable */
const webpackConfig = require('../webpack.config');

module.exports = [
    webpackConfig({env: 'production', target: 'web', appName: 'messages'}),
    webpackConfig({env: 'production', target: 'node', appName: 'messages'}),
];
