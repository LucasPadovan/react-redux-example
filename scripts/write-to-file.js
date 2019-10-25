/* eslint-disable */
const fs = require('fs');

const checkChangelogFile = (changelogFileRoute) => {
    fs.readFile(changelogFileRoute, 'utf8', (err) => {
        if (err) {
            const createStream = fs.createWriteStream(changelogFileRoute);
            createStream.end();
        }
    });
}

exports.writeOnTop = (newText, appName) => {
    const changelogFileRoute = `../${appName}/CHANGELOG.md`;

    // Not working for some reason
    // checkChangelogFile(changelogFileRoute);

    const existingText = fs.readFileSync(changelogFileRoute);
    const writableChangelogFile = fs.openSync(changelogFileRoute, 'w+');

    fs.writeSync(
        writableChangelogFile,
        newText,
        0,
        newText.length,
        0
    );
    /**
     * Append the old text to the new one
     */
    fs.writeSync(
        writableChangelogFile,
        existingText,
        0,
        existingText.length,
        newText.length
    );
}
/* eslint-enable */
