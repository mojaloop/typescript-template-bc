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

## How to add dependencies with npm packages

```shell 
npm -w packages/package-dir-name install npm_dependency_name
```
For development dependencies add the `--dev` at the end, like so:
```shell 
npm -w packages/package-dir-name install npm_dependency_name --save-dev
```

**Notes:** 
- Replace `package-dir-name` with the correct module name, it corresponds to the directory name
- Replace `npm_dependency_name` with the correct dependency name
- Common devDependencies, such as linters or test frameworks, should be installed/dependend in the main `package.json` to avoid repeating them in each of the monorepo's modules

TBD finish this

## Packages

### example-svc

This service exemplifies how to create a bounded context service that can be deployed.
The objective is to show how to use the most important vNext platform foundational services. 

Please see the details of the example service within its [README](./modules/example-svc/README.md) file.

## Usage

### Install NVM - Node version manager

More information on how to install NVM: https://github.com/nvm-sh/nvm

#### Use NVM to install the correct Node.js version

```bash
# (In the repository root directory - one having the .nvmrc file)
nvm install
nvm use
```

### Install Dependencies

All commands below assume you're positioned at the root of the monorepo.

```bash
npm install
```

## Build

```bash
npm run build
```

## Run

```bash
npm run start
```

## Unit Tests

```bash
npm run test:unit
```
