# typescript-bc-template

**EXPERIMENTAL** vNext Typescript Bounded Context Mono Repository Template

This repository has two main purposes
- As a template for bounded context mono repos
- As example code for the implementation of services which use the common corss-cutting concerns' clients (logging, auditing, platform-config, security, etc.)

## How to use this template

- Start by creating a new repository in GitHub using this template

![create repo from template](./readme-imgs/create_repo_with_template.png "Create repository using this template")

Unsorted hints:
- For modules that don't require publishing to NPM, make sure you have the `"private": true` line in package.json. By contrast, for all modules that require NPM publishing make sure it is set to false.

## How to add dependencies with yarn

```shell 
yarn workspace module-name add npm_dependency_name
```
For development dependencies add the `--dev` at the end, like so:
```shell 
yarn workspace module-name add npm_dependency_name --dev
```

**Notes:** 
- Replace `module-name` with the correct module name, it corresponds to the name property in the module `package.json`, usually starting with `@mojaloop/`
- Replace `npm_dependency_name` with the correct dependency name

TBD finish this

## How to publish to npmjs.com with yarn

Usage of `yarn npm publish` is required, as it replaces workspace dependency prefixes, such as `"@mojaloop/platform-configuration-bc-types-lib": "workspace:^0.1.1"` with the non-workspace version `"@mojaloop/platform-configuration-bc-types-lib": "^0.1.1"`.

Using `npm publish` directly won't perform this replacement and will result in errors when installing the published package.

First login to yarn npm, this is required even if you logged in to npm already:
```shell
yarn npm login
```
Or test with:
```shell
yarn npm whoami
```

Publish the package with:
```shell
yarn workspace module-name npm publish --tag=latest --access public
```
**Notes:**
- Replace `module-name` with the correct module name, it corresponds to the name property in the module `package.json`, usually starting with `@mojaloop/`
- Make sure you update the package.json version number field accordingly before publishing.

## Modules

### example-svc

This service exemplifies how to create a bounded context service that can be deployed.
The objective is to show how to use the most important vNext platform foundational services. 

Please see the details of the example service within its [README](./modules/example-svc/README.md) file.

## Usage

### Install Node version

More information on how to install NVM: https://github.com/nvm-sh/nvm

```bash
nvm install
nvm use
```

### Install Yarn

```bash
npm -g yarn
```

Set yarn to v3
```bash
yarn set version 3.2
```

### Install Dependencies

All commands below assume you're positioned at the root of the monorepo.

```bash
yarn
```

## Build

```bash
yarn build
```

## Run

```bash
yarn start
```

## Unit Tests

```bash
yarn test:unit
```

