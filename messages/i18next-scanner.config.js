/**
 * This is the configuration of the scanner, it is set to scan the functions
 * gettext and lazyGettext for literals and store the results in `savePath`.
 */

/* eslint-disable import/unambiguous */
/* eslint-disable import/no-commonjs */
module.exports = {
    options: {
        removeUnusedKeys: true,
        sort: true,
        nsSeparator: false,
        keySeparator: false,
        func: {
            list: ['gettext', 'lazyGettext'],
        },
        defaultValue: (lng, ns, key) => key,
        lngs: ['en'],
        resource: {
            loadPath: 'src/translations/messages.json',
            savePath: 'src/translations/messages.json',
        },
    },
};
