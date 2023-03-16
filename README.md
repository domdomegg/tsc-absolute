# tsc-absolute

👇 TypeScript compiler (tsc), but errors have absolute paths.

Inspired by [this 2016 TypeScript issue](https://github.com/microsoft/TypeScript/issues/7238), and [a similar one opened in 2020](https://github.com/microsoft/TypeScript/issues/36221). Given it seems to be a feature many people want, but the TypeScript team seem to be avoiding, this acts as a simple wrapper that implements this feature.

This is particularly useful for navigating to errors in monorepo setups, or for automating error detection and location from logs.

## Installation

```sh
npm install --save-dev typescript tsc-absolute
```

## Usage

Just use it as a drop-in replacement for tsc wherever you use it. All arguments are passed right through. For example:

```diff title="package.json"
"scripts": {
-  "build": "tsc --strict"
+  "build": "tsc-absolute --strict"
}
```

This turns your logs from relative paths:

```
src/some/path/code.ts(20,9): error TS2322: Type 'number' is not assignable to type 'string'.
```

to absolute ones:

```
/home/domdomegg/my-workspace/my-package/src/some/path/code.ts(20,9): error TS2322: Type 'number' is not assignable to type 'string'.
```

### Which TypeScript version does it use?

It supports any version of TypeScript released in the last 12 months, mirroring [the TypeScript team's security support window](https://github.com/microsoft/TypeScript/issues/49088#issuecomment-1169372587). This is validated with intregration tests that run in CI.

The library accepts TypeScript as a peer dependency, so just install TypeScript like normal to your preferred version and tsc-absolute will use that one.

It may work with older versions, but this is not explicitly supported. You should probably update anyways to ensure you continue to recieve security updates.

### GitHub problem matching

With this configuration, you can set up a GitHub problem matcher, for example in `.github/matchers/tsc-absolute.json`:

```json
{
  "problemMatcher": [
    {
      "owner": "tsc-absolute",
      "pattern": [
        {
          "regexp": "^(.*)\\((\\d+),(\\d+)\\):\\s+(error|warning|info)\\s+(TS\\d+)\\s*:\\s*(.*)$",
          "file": 1,
          "line": 2,
          "column": 3,
          "severity": 4,
          "code": 5,
          "message": 6
        }
      ]
    }
  ]
}
```

And in your `workflow.yaml`, add a step:

```yaml
- name: Configure TSC problem matcher
  run: |
    echo "::remove-matcher owner=tsc::"
    echo "::add-matcher::.github/matchers/tsc-absolute.json"
```

## Accuracy note

This is a best-efforts approach at correcting the error output and is usually very accurate. However, as the TypeScript compiler does not provide structured logging nor is it part of their public interface, it may break if TypeScript's logging format changes.

Additionally, the way the logs are (un)structured the regex can make mistakes if you have extremely odd filenames. The filenames have to be to the point that you'd probably have to be trying to break this, i.e. ones that have both spaces and brackets with numbers at just the wrong places in them - but if you're accepting any kind of input it's one to be aware of.

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
