# typescript-library-template

Personal template for creating TypeScript libraries.

## Quick start

1. If it should be published to NPM, add the `NPM_TOKEN` secret. Otherwise, add `"private": true` in `package.json`.
2. Update the package name, description and repo URL in `package.json`
3. Add the repo to the [file sync automation rules](https://github.com/domdomegg/domdomegg/blob/master/.github/workflows/repo-file-sync.yaml)
4. Update the README, using the template commented out below

<!--

# TODO: name of library

TODO: A short description of what the library does, explaining why people might want to use it.

## Usage

TODO: usage instructions

## Contributing

Pull requests are welcomed on GitHub! To get started:

1. Install Git and Node.js
2. Clone the repository
3. Install dependencies with `npm install`
4. Run `npm run test` to run tests
5. Build with `npm run build`

## Releases

Versions follow the [semantic versioning spec](https://semver.org/).

To release:

1. Use `npm version <major | minor | patch>` to bump the version
2. Run `git push --follow-tags` to push with tags
3. Wait for GitHub Actions to publish to the NPM registry.

-->
