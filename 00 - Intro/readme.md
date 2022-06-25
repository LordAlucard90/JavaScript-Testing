# Intro

## Content

- [Test Types](#test-types)
- [Setup](#setup)

---

## Test Types

Unit tests test individual application building blocks.

Integration tests test more building blocks together.

E2E tests test the entire application flow.

## Setup

Besides the application code it is needed a test runner that runs the tests
and an assertion library to verify the expected outcome.

[JestJS](https://jestjs.io/) is both a test runner and assertion library.
But it can be slow and have problems with the EcmaScript Modules.


[Vitest](https://vitest.dev/) is another test framework that is both a 
test runner and a testing libraty, furthermore, it is compatible with jest.
It is faster and fully support EcmaScript Modules, it is not necessaty to 
change the jest code when migrating to this framework.

To install it:
```bash
npm i --save-dev vitest
```
and in the `package.json`
```json
{
    // ...
    "scripts": {
        "test": "vitest --global",
    },
    // ...
}
```
then to run the tests it must be run:
```bash
npm test
```

#### Projects Run

All the projects can be run using:
```bash
npm i
npm start
```
They are available at:
- `basic-testing-frontend`: Available at http://localhost:8080
- `basic-testing-nodejs`: http://localhost:3000
- `basic-testing-nodejs-esmodules`: http://localhost:3000

