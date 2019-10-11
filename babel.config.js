/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
module.exports = {
    'presets': [
        [
            '@babel/preset-env',
            {
                'targets': {
                    'browsers': [
                        'last 2 versions',
                    ],
                    'node': 'current',
                },
                'modules': false,
            },
        ],
        '@babel/preset-react',
    ],
    'env': {
        'test': {
            'plugins': ['transform-es2015-modules-commonjs'],
            'presets': [
                [
                    '@babel/preset-env',
                    {
                        'targets': {
                            'node': 'current',
                        },
                    },
                ],
                '@babel/preset-react',
            ],
        },
    },
    'plugins': [
        '@babel/plugin-proposal-class-properties',
    ],
};
