# Basics

## Content

- [Test File](#test-file)
- [Test Definition](#test-definition)
- [AAA Pattern](#aaa-pattern)
- [Test Scenarios](#test-scenarios)
- [Check Errors](#check-errors)
- [Test Suit](#test-suit)
- [Coverage](#coverage)

---

## Test File

The JavaScript test files has the same name of the tested file, with the add
of `test` or `spec` before the extension.
```
math.js
math.test.js
math.spec.js

math.ts
math.test.ts
math.spec.ts
```

A test can be imported using :
```javascript
import { it } from "vitest";
// or
import { test } from "vitest";
```
both are equivalen, or can be skipped using
```bash
vitest --global
```
that provides them as global variables.

## Test Definition

The first argument of the test is the description, while the second is the
actual test execution:
```javascript
it('should summarize all number values in an array', () => {
    // ...
});
```
the actual test consists in the execution on the methods under testing
and in the verification that the result matches the expectation:
```javascript
import { it, expect } from 'vitest';
import { add } from './math';

it('should summarize all number values in an array', () => {
    const result = add([1, 2, 3]);

    expect(result).toBe(6);
});
```
`expect` exposes a lot of conditions, `toBe` is just one of them.

## Test execution

In order to run all the tests inside, it must be run:
```
$ npm test

> basic-testing-frontend@1.0.0 test
> vitest --run --reporter verbose


 RUN  v0.9.0 /01 - Basics/code/basic-testing-frontend

 √ src/math.test.js (1)
   √ should summarize all number values in an array

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  880ms (in thread 2ms, 44001.97%)
```
in the `package.json` has been defined the script:
```bash
vitest --run --reporter verbose
```
where:
- `--run` execute the tests only once
- `--report verbose` prints a report for each file
if the `--run` flag is removed, the framework will continue listening the test code
for changes and will rerun the tests.

## AAA Pattern

The Arrange, Act, Assert pattern define three phases:
- Arrange: define testing environment and values
- Act: run the piece of code that must be tested
- Assert: evaluate the reduce and compare it the expected value

the previous test with this pattern applied becomes:
```javascript
it('should summarize all number values in an array', () => {
    // Arrange
    const numbers = [1, 2, 3];
    const expectedResult = numbers.reduce((prev, cur) => prev + cur, 0);

    // Act
    const result = add(numbers);

    // Assert
    expect(result).toBe(expectedResult);
});
```

## Test Scenarios

A test file should contain all the reasonable tests, for exaple some of the 
reasonable test for the mehod
```javascript
export function add(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += +number;
  }
  return sum;
}
```
are:
```javascript
it('should summarize all number values in an array', () => {
    // Arrange
    const numbers = [1, 2, 3];
    const expectedResult = numbers.reduce((prev, cur) => prev + cur, 0);

    // Act
    const result = add(numbers);

    // Assert
    expect(result).toBe(expectedResult);
});

it('should yield NaN if a least one invalid number is provided', () => {
    // Arrange
    const inputs = ['invalid', 1];

    // Act
    const result = add(inputs);

    // Assert
    expect(result).toBeNaN();
});

it('should yield a correct sum if an array of numeric strings values is provided', () => {
    // Arrange
    const numericStrings = ['1', '2'];
    const expectedResult = numericStrings.reduce((prev, cur) => +prev + +cur, 0);

    // Act
    const result = add(numericStrings);

    // Assert
    expect(result).toBe(expectedResult);
});

it('should yield 0 if an empty array is passed', () => {
    // Arrange
    const emptyArray = [];
    const expectedResult = 0;

    // Act
    const result = add(emptyArray);

    // Assert
    expect(result).toBe(expectedResult);
});
```

## Check Errors

It is possible to check that a methos throws an error in this way:
```javascript
it('should throw an error if no value is passed into the function', () => {
    // Act
    const resultFn = () => {
        add();
    };

    // Assert
    expect(resultFn).toThrow();
});
```
if on the other way no error should be thrown, can be used:
```javascript
it('should throw an error if no value is passed into the function', () => {
    // Act
    const resultFn = () => {
        add();
    };

    // Assert
    expect(resultFn).not.toThrow();
});
```
the `not` property is available with all the expect assertions.

`toThrow` also offers the possibility to define the expected error message:
```javascript
it('should throw an error if provided with multiple arguments instead of an array', () => {
    // Arrange
    const num1 = 1;
    const num2 = 2;

    // Act
    const resultFn = () => {
        add(num1, num2);
    };

    // Assert
    expect(resultFn).toThrow(/is not iterable/);
});
```

## Test Suit

It is possible to organize tests logically using `describe`,
the fist argument is the description, and the second and arrow function
with all the belonging tests (it can also be nested):
```javascript
import { it, expect, describe } from 'vitest';

import { validateNumber, validateStringNotEmpty } from './validation';

describe('validateStringNotEmpty()', () => {
    it('should throw an error, if an empty string is provided', () => {
        const input = '';
        const validationFn = () => validateStringNotEmpty(input);
        expect(validationFn).toThrow();
    });

    it('should throw an error with a message that contains a reason (must not be empty)', () => {
        const input = '';
        const validationFn = () => validateStringNotEmpty(input);
        expect(validationFn).toThrow(/must not be empty/);
    });

    it('should throw an error if a long string of blanks is provided', () => {
        const input = '';
        const validationFn = () => validateStringNotEmpty(input);
        expect(validationFn).toThrow();
    });

    it('should throw an error if any other value than a string is provided', () => {
        const inputNum = 1;
        const inputBool = true;
        const inputObj = {};

        const validationFnNum = () => validateStringNotEmpty(inputNum);
        const validationFnBool = () => validateStringNotEmpty(inputBool);
        const validationFnObj = () => validateStringNotEmpty(inputObj);

        expect(validationFnNum).toThrow();
        expect(validationFnBool).toThrow();
        expect(validationFnObj).toThrow();
    });

    it('should not throw an error, if a non-empty string is provided', () => {
        const input = 'valid';
        const validationFn = () => validateStringNotEmpty(input);
        expect(validationFn).not.toThrow();
    });
});

describe('validateNumber()', () => {
    it('should throw an error if NaN is provided', () => {
        const input = NaN;
        const validationFn = () => validateNumber(input);
        expect(validationFn).toThrow();
    });

    it('should throw an error with a message that contains a reason (invalid number)', () => {
        const input = NaN;
        const validationFn = () => validateNumber(input);
        expect(validationFn).toThrow(/Invalid number/);
    });

    it('should throw an error if a non-numeric value is provided', () => {
        const input = '1';
        const validationFn = () => validateNumber(input);
        expect(validationFn).toThrow();
    });

    it('should not throw an error, if a number is provided', () => {
        const input = 1;
        const validationFn = () => validateNumber(input);
        expect(validationFn).not.toThrow();
    });
});
```

## Coverage

It is possible to calculate the test coverage adding 
to the `package.json` the script
```json
{
  // ...
  "scripts": {
    // ...
    "test:coverage": "vitest run --coverage",
    // ...
  },
  // ...
}
```
and then running:
```
$ npm run test:coverage

> basic-testing-frontend@1.0.0 test:coverage
> vitest run --coverage


 RUN  v0.9.0 /01 - Basics/code/basic-testing-frontend

 √ src/util/numbers.test.js (3)
 √ src/util/validation.test.js (9)
 √ src/output.test.js (4)
 √ src/math.test.js (6)

Test Files  4 passed (4)
     Tests  22 passed (22)
      Time  703ms (in thread 19ms, 3697.48%)

----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------|---------|----------|---------|---------|-------------------
All files       |   66.66 |      100 |    62.5 |   66.66 |                   
 src            |   66.66 |      100 |      50 |   66.66 |                   
  math.js       |   57.14 |      100 |      50 |   57.14 | 13-21             
  output.js     |      80 |      100 |      50 |      80 | 13-15             
 src/util       |   66.66 |      100 |      75 |   66.66 |                   
  numbers.js    |   43.75 |      100 |      50 |   43.75 | 8-16              
  validation.js |     100 |      100 |     100 |     100 |                   
----------------|---------|----------|---------|---------|-------------------
```

