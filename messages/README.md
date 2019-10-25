# React-redux-example

## Development

Install node

Install yarn: https://yarnpkg.com/en/docs/install

Create a `.env` similar to the `.env.sample` file provided at the same folder level.

Install the dependencies:

    yarn

Start the application:

    yarn start

This will start `messages` on port 1234 at https://localhost:1234/

#### Tests

just run:

    yarn test

#### Lint

just run:

    yarn lint


## Developing process
- Create a new branch
- Work (?)
- Commit your changes using the following schema:
-- `git commit -m 'feat: [MESSAGES] some commit message'` > for a new feature
-- `git commit -m 'fix: [MESSAGES] some commit message'` > for a new bugfix
-- `git commit -m 'docs: [MESSAGES] some commit message'` > for documentation
-- `git commit -m 'refactor: [MESSAGES] some commit message'` > for refactors
-- `git commit -m 'test: [MESSAGES] some commit message'` > for testing


## Releasing a new version
- Create a new branch for the new version
- run `yarn release:messages:patch` > for a new patch version on the messages package.json file
an application and not a library - so we don't have to worry about
- run `yarn release:messages:minor` > for a new minor version on the messages package.json file
compatibility with other code that depends on this code.
- run `yarn release:messages:major` > for a new major version on the fmessageseed package.json file
- Push your branch to github, the previous commands already created a commit!
- Post a Pull Request in Github
