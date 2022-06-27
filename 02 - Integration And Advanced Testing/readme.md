# Integration And Advanced Testing

## Content

- [Integration Tests](#integration-tests)
- [ToBe vs ToEqual](#tobe-vs-toequal)
- [Test Async Code](#test-async-code)
- [Test Hooks](#test-hooks)
- [Concurrent Test execution](#concurrent-test-execution)

---

## Integration Tests

An integration test involve functions that call other functions, 
and this other functions are not mocked.

Given the function:
```javascript
export function cleanNumbers(numberValues) {
    const numbers = [];
    for (const numberInput of numberValues) {
        validateStringNotEmpty(numberInput);
        const number = transformToNumber(numberInput);
        validateNumber(number);
        numbers.push(number);
    }
    return numbers;
}
```
some integration tests are:
```javascript
describe('cleanNumbers()', () => {
    it('should return an array of number values if an array of string number values is provided', () => {
        // Arrange
        const numberValues = ['1', '2'];

        // Act
        const result = cleanNumbers(numberValues);

        // Assert
        expect(result[0]).toBeTypeOf('number');
    });

    it('should throw an error if an array with at least an empty string is provided', () => {
        // Arrange
        const numberValues = ['', 1];

        // Act
        const resultFn = () => {
            cleanNumbers(numberValues);
        };

        // Assert
        expect(resultFn).toThrow();
    });
});
```

## ToBe vs ToEqual

`toBe` checks the object (reference) equality, this means that
```javascript
it('should fails', () => {
    const numbers = [1, 2];
    expect(numbers).toBe([...numbers]);
});
```
alternatively `toEqual` check the deep value of the object:
```javascript
it('should pass', () => {
    const numbers = [1, 2];
    expect(numbers).toEqual([...numbers]);
});
```

## Test Async Code

#### callbacks

Working with asynchronous code that involves a callback like
```javascript
export function generateToken(userEmail, doneFn) {
  jwt.sign({ email: userEmail }, 'secret123', doneFn);
}
```
is not so obvious, for example the following test should fail due to the second
condition but, since by default the test just returns without waiting 
for the actual response, it correctly passes:
```javascript
describe('generateToken()', () => {
    it('should generate a token value (wrong implementation)', () => {
        // Arrange
        const testUserEmail = 'test@example.com';

        // Act
        generateToken(testUserEmail, (err, token) => {
            // Assert
            expect(token).toBeDefined();
            expect(token).toBe(2);
        });
    });
});
```
to correctly wait until the end of execution, it is necessary to use the `done`
parameter:
```javascript
it('should generate a token value', (done) => {
    // Arrange
    const testUserEmail = 'test@example.com';

    // Act
    generateToken(testUserEmail, (err, token) => {
        // Assert
        expect(token).toBeDefined();
        // expect(token).toBe(2); // now it fails if this line is uncommented
        done()
    });
});
```
Even if now it fails with a wrong assertion, it does not throw the correct 
error message. To correct this error it is necessaty to use a `try-catch` 
around the assertion:
```javascript
it('should fail with the correct assertion error', done => {
    // Arrange
    const testUserEmail = 'test@example.com';

    // Act
    generateToken(testUserEmail, (err, token) => {
        // Assert
        try {
            expect(token).toBe(2);
            done();
        } catch (err) {
            done(err);
        }
    });
});
```

#### promises

Promises are much easier to be tested, it is enough to expect that the
promise will `revolves` or `rejects` in a `toBe` assertion:
```javascript
it('should generate a token value', () => {
    // Arrange
    const testUserEmail = 'test@example.com';

    // Act
    const resultPromise = generateTokenPromise(testUserEmail);

    // Assert
    return expect(resultPromise).resolves.toBeDefined();
    // return guarantees that the promise is waited from the test framework
});
```
alternatively can be used the `async-await` pattern:
```javascript
it('should generate a token value (await)', async () => {
    // Arrange
    const testUserEmail = 'test@example.com';

    // Act
    const token = await generateTokenPromise(testUserEmail);

    // Assert
    expect(token).toBeDefined();
});
```

## Test Hooks

The available test hooks are:
- `beforeAll`: run once before any test is run
- `beforeEach`: run before each test is run
- `afterEach`: run after all tests are run
- `afterAll`: run once after all tests are run

it can be used in this way:
```javascript
const testEmail = 'test@test.com';
let user;

beforeAll(() => {
    console.log('beforeAll()');
});

beforeEach(() => {
    user = new User(testEmail);
    console.log('beforeEach()');
});

afterEach(() => {
    // alternative as beforeEach user = new User(testEmail);
    console.log('afterEach()');
});

afterAll(() => {
    console.log('afterAll()');
});

it('should update the email', () => {
    const newTestEmail = 'test2@test.com';

    user.updateEmail(newTestEmail);

    expect(user.email).toBe(newTestEmail);
});

it('should have an email property', () => {
    expect(user).toHaveProperty('email');
});

it('should store the provided email value', () => {
    expect(user.email).toBe(testEmail);
});

it('should clear the email', () => {
    user.clearEmail();

    expect(user.email).toBe('');
});

it('should still have an email property after clearing the email', () => {
    user.clearEmail();

    expect(user).toHaveProperty('email');
});
```

## Concurrent Test Execution

By default tests contained in different files are run in parallel.

Nevertheless, it is possible to speed up the process by running also the tests inside
the same file in parallel using `concurrent` call after the test definition:
```javascript
it.concurrent('should update the email', () => {
    // ...
});

it.concurrent('should have an email property', () => {
    // ...
});

it.concurrent('should store the provided email value', () => {
    // ...
});

it.concurrent('should clear the email', () => {
    // ...
});

it.concurrent('should still have an email property after clearing the email', () => {
    // ...
});
```
alternatively it is possible to add it to the `describe` so that all the 
contained tests will be run at the same time:
```javascript
describe.concurrent('generateToken()', () => {
    it('should generate a token value (wrong implementation)', () => {
        // ...
    });

    it('should generate a token value', done => {
        // ...
    });
});

describe.concurrent('generateTokenPromise()', () => {
    it('should generate a token value', () => {
        // ...
    });

    it('should generate a token value (await)', async () => {
        // ...
    });
});
```

