/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
/* eslint-disable import/no-self-import */
/* eslint-disable no-self-import */
/* eslint-disable no-commonjs */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');

const DotenvPlugin = require('webpack-dotenv-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const request = require('request-promise-native');
const bodyParser = require('body-parser');


const isDevEnv = (env, target) => env === 'development' && target === 'web';

const getDevtool = (env, target) => {
    if (isDevEnv(env, target)) {
        return 'cheap-module-eval-source-map';
    }
    return 'source-map';
};

const getEntry = (env, target, appName) => {
    let entryList = [];

    if (target === 'web') {
        entryList = [
            '@babel/polyfill',
            path.resolve(__dirname, appName, 'src/index.js'),
        ];
    } else if (target === 'node') {
        entryList = [
            ...entryList,
            path.resolve(__dirname, appName, 'src/index.node.js'),
        ];
    }

    return {
        [appName]: entryList,
    };
};

const presetEntry = {
    messages: [ '@babel/polyfill', path.resolve(__dirname, 'messages', 'src', 'index.js')],
};

const getOutput = (env, target, appName) => {
    let output = {
        path: path.resolve(__dirname, appName, 'build'),
        filename: `${appName}.${target}.js`,
    };

    if (target === 'node') {
        output = {
            ...output,
            libraryTarget: 'commonjs2',
        };
    }

    return output;
};

const nullSassRules = {
    test: /\.scss$/,
    use: 'null-loader',
};

const getModuleRules = (env, target) => {
    let rules = [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            },
            exclude: /node_modules/,
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                'image-webpack-loader',
            ],
        },
    ];

    if (target === 'web') {
        rules = [
            ...rules,
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ];
    } else if (target === 'node') {
        rules = [
            ...rules,
            nullSassRules,
        ];
    }

    return rules;
};

const getPlugins = (env, target) => {
    let plugins = [
        new webpack.EnvironmentPlugin({
            NODE_ENV: env,
            REACT_APP_TARGET: target === 'web' ? 'web' : 'server',
        }),
    ];

    if (env === 'development' && target === 'web') {
        plugins = [
            ...plugins,
            new DotenvPlugin({
                sample: path.resolve(__dirname, '.env.sample'),
                path: path.resolve(__dirname, '.env'),
            }),
        ];
    }


    if (target === 'web') {
        plugins = [
            ...plugins,
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ];
    }

    return plugins;
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = ({env = 'development', target = 'web', appName} = {}) => {
    // Don't pollute jenkins logs
    if (env !== 'development') {
        // eslint-disable-next-line no-console
        console.log('Building environment using:', JSON.stringify({env, target, appName}, null, 4));
    }

    return {
        target,
        mode: env,
        devtool: getDevtool(env, target),
        entry: appName ? getEntry(env, target, appName) : presetEntry,
        output: appName ? getOutput(env, target, appName) : {filename: '[name].web.js', path: path.join(__dirname, 'build')},
        module: {
            rules: getModuleRules(env, target),
        },
        plugins: getPlugins(env, target),
        devServer: {
            host: 'localhost',
            port: 1234,
            historyApiFallback: true,
            allowedHosts: [
                'localhost',
            ],
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            },
            // https: {
            //     key: fs.readFileSync(path.resolve(__dirname, 'app.key')),
            //     cert: fs.readFileSync(path.resolve(__dirname, 'app.crt')),
            // },
            before: (app) => {
                app.use(bodyParser.json());

                app.post('/api/v3/destination/organizers/:organizer_id/follow/', (req, res) => {
                    res.json({
                        'action_performed': true,
                        'followed_by_you': true,
                    });
                });

                app.all('/api/v3/*', (req, res) => {
                    // proxy localhost:1234/api/v3/search/ to www.eventbriteapi.com/v3/search/
                    // set token in the .env file at the root directory of this app
                    const apiPath = req.originalUrl.replace('/api', '');

                    request({
                        url: `https://www.${process.env.EB_HOST}api.com${apiPath}`,
                        headers: {
                            'Authorization': `Bearer ${process.env.EB_API_TOKEN}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        method: req.method,
                        body: JSON.stringify(req.body),
                    }).then((response) => {
                        res.status(200).send(response);
                    }, console.error);
                });

                app.get('/', (req, res) => {
                    res.set('Content-Type', 'text/html');
                    res.end(`
                        <!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                <title>Messages app</title>
                                <link href="/messages.css" rel="stylesheet">
                            </head>
                            <body>
                                <div id="root"></div>
                                <script src="/messages.web.js"></script>
                            </body>
                        </html>
                    `);
                });
            },
        },
        resolve: {
            extensions: ['.js', '.scss', '.css', '.md', '.json'],
            modules: [
                'node_modules',
            ],
        },
    };
};
