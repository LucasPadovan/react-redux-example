const path = require('path');
/* eslint-disable import/unambiguous */
/* eslint-disable import/no-commonjs */

module.exports = {
    env: {
        jest: true,
        browser: true,
        node: true
    },
    plugins: [
        'babel'
    ],
    rules: {
        "react/jsx-no-bind": {
            "allowArrowFunctions": true
        },
        "no-shadow": "off",
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                packageDir: __dirname
            }
        ],
    },
    settings: {
        react: {
            version: '16.7',
        },
        'import/resolver': {
            webpack: {
                config: path.join(__dirname, 'webpack.config.js'),
                resolve: {
                    modules: ['node_modules', 'packages']
                }
            },
        },
    },
};
