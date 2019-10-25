const Git = require('git-commands');
const { resolve } = require('path')

const getCommitsList = ({appName}) => {
    /**
     * Setup the git module with root in the top folder.
     */
    const repsPath = resolve(__dirname, '../');
    const git = new Git({ reps: repsPath });

    /**
     * Get the last commit that modified the CHANGELOG.md file for the app and the last commit in the branch.
     */
    const lastBumpCommit = git.command(`log -n 1 --pretty=format:%H -- ${appName}/CHANGELOG.md`);
    const lastCommit = git.command('rev-parse --verify HEAD');

    /**
     * Get the differences between the two previous hashes. This will be the raw content for our changelog.
     */
    const getCommitDifference = git.command(`log --oneline ['${lastBumpCommit}'..'${lastCommit}']`);
    console.log('TCL: getCommitDifference', getCommitDifference);
}

const generateChangelog = ({appName}) => {
    const commitsList = getCommitsList({appName});
}

/**
 * Get the app name from params
 */
const appName = process.argv[2];

if (appName) {
    generateChangelog({appName});
}
