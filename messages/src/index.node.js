/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./App').default;

module.exports = function render(props) {
    return ReactDOMServer.renderToString(<App {...props} />);
};
