const Git = require('git-commands');
const { resolve } = require('path')
const { writeOnTop } = require('./write-to-file');

const commitTypes = {
    refactor: {
        title: 'Refactor',
        regex: /refactor\:\ /,
    },
    features: {
        title: 'Features',
        regex: /feat\:\ /,
    },
    fix: {
        title: 'Fixes',
        regex: /fix\:\ /,
    },
    test: {
        title: 'Code quality',
        regex: /test\:\ /,
    },
    docs: {
        title: 'Documentation',
        regex: /docs\:\ /,
    },
}

/**
 * Use github to generate an array with each commit since last modification of the CHANGELOG.md file.
 */
const getCommitsList = ({appName}) => {
    let commitsList = [];

    /**
     * Setup the git module with root in the top folder.
     */
    const repsPath = resolve(__dirname, '../');
    const git = new Git({ reps: repsPath });

    /**
     * Get the last commit that modified the CHANGELOG.md file for the app and the last commit in the branch.
     */
    //TODO: if this doesn't exist, use master.
    const lastBumpCommit = git.command(`log -n 1 --pretty=format:%H -- ${appName}/CHANGELOG.md`);
    let lastCommit = git.command('rev-parse --verify HEAD');

    /**
     * Remove the newline that may appear in the git log command
     */
    lastCommit = lastCommit.split('\n')[0]

    /**
     * Get the differences between the two previous hashes. This will be the raw content for our changelog.
     */
    const commitsDifferenceCommand = `log --pretty=oneline --no-merges ${lastBumpCommit}...${lastCommit}`;
    const commitsDifference = git.command(commitsDifferenceCommand);

    /**
     * Split the string returned by the command by newlines to generate an array that is easier to handle.
     */
    if (commitsDifference) {
        commitsList = commitsDifference.split('\n');
    }

    return commitsList;
}

const filterByType = ({commitsList = [], regex}) => {
    let filteredCommits = []

    if (commitsList.length) {
        filteredCommits = commitsList.filter((commit) => commit.match(regex));
    }

    return filteredCommits;
}

/**
 * Commits for other apps? out of the way.
 */
const filterByProject = ({commitsList = [], appName}) => {
    const regex = new RegExp("\[" + appName.toUpperCase() + "\]");

    return filterByType({commitsList, regex});
}

const buildCommitMessage = ({commitWithHash, appName, githubURL}) => {
    const splitCommit = commitWithHash.split(': ');
    let commitMessage = '';

    if (splitCommit[1]) {
        // We want only the hash, the commit type is not needed anymore.
        const commitHash = splitCommit[0].split(' ')[0];
        // We also remove the app name from the commit because we already filtered that
        const cleanCommitMessage = splitCommit[1].split(`[${appName.toUpperCase()}] `);

        // TODO: this `Commit` should be the short hash of the diff
        commitMessage = `* ${cleanCommitMessage[1]}. [Commit](${githubURL}/${commitHash})\n`;
    }

    return commitMessage;
}

const parseProjectCommitsToString = ({projectCommitsList, appName, githubURL}) => {
    const commitsByType = {};
    let parsedNewCommits = '';

    Object.keys(commitTypes).forEach((key) => {
        const _commitsByType = filterByType({
            commitsList: projectCommitsList,
            regex: commitTypes[key].regex,
        });

        if (_commitsByType.length) {
            commitsByType[key] = _commitsByType;

            parsedNewCommits += `### ${commitTypes[key].title}\n`;

            _commitsByType.forEach(function(commitWithHash) {
                parsedNewCommits += buildCommitMessage({commitWithHash, appName, githubURL});
            });

            parsedNewCommits += '\n\n';
        }
    });

    return parsedNewCommits;
}

const generateChangelog = ({appName}) => {
    const commitsList = getCommitsList({appName});

    if (commitsList.length) {
        const packageJson = require(`../${appName}/package.json`);
        const githubURL = packageJson.repository.url;
        const today = new Date()
        const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
        let formattedChangelog = `## ${packageJson.version} (${formattedDate})\n\n`;

        const projectCommitsList = filterByProject({commitsList, appName});
        const parsedCommitsList = parseProjectCommitsToString({projectCommitsList, appName, githubURL});

        formattedChangelog += parsedCommitsList;

        writeOnTop(formattedChangelog, appName);
    }
}

/**
 * Get the app name from params
 */
const appName = process.argv[2];

if (appName) {
    generateChangelog({appName});
}
