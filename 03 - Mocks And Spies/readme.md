# Mocks And Spies

## Content

- [Intro](#intro)
- [Spies](#spies)
- [Mocks](#mocks)
- [Expect](#expect)
- [Mocks And Spies Logic](#mocks-and-spies-logic)
- [Global Stubs](#global-stubs)

---

## Intro

- **Dummy** objects are passed around but never actually used.
Usually they are just used to fill parameter lists.
- **Fake** objects actually have working implementations,
but usually take some shortcut which makes them not suitable for production
(an InMemoryTestDatabase is a good example).
- **Stubs** provide canned answers to calls made during the test,
usually not responding at all to anything outside what's programmed in for the test.
- **Spies** are stubs that also record some information based 
on how they were called. One form of this might be an email service that
records how many messages it was sent.
- **Mocks** are pre-programmed with expectations which form a specification
of the calls they are expected to receive. They can throw an exception 
if they receive a call they don't expect and are checked during verification
to ensure they got all the calls they were expecting.

More can be found [here](http://xunitpatterns.com/Test%20Double.html).

## Spies

Spies can be used to replace functions that are passed.\
It is possible to create a spy with the `vi.fn()` method:
```javascript
describe('generateReportData()', () => {
    it('should execute logFn if provided', () => {
        // Arrange
        const loggerSpy = vi.fn();

        // Act
        generateReportData(loggerSpy);

        // Assert
        expect(loggerSpy).toBeCalled();
    });
});
```

It is possible to set the behaviour  

## Mocks

Mocks can be used to replace functions that are not directly passed and that
belongs to any package .\
It is possible to create a spy with the `vi.mock(<package>)` method:
```javascript
vi.mock('fs');

it('should execute the writeFile method (not correct test)', () => {
    // Arrange
    const testData = 'Test';
    const testFile = 'test.txt';

    // Act
    writeData(testData, testFile);

    // Assert
    expect(fs.writeFile).toBeCalled();
});
```
No matter were the mock is defined, vitest will move it on the top of the file
anD all the tests in that file will be effected.

## Expect

Possible expects that work with mocks and spies are:
- `.toBeCalledTimes(<number>)`
- `.toBeCalledWith(<arguments>)`

## Mocks And Spies Logic

#### fn

By default `vi.fn` takes and empty function:
```javascript
vi.fn();
vi.fn(() => {});
```
but it is also possible to define one for out specific needs.

#### mock

Also `vi.mock` by default takes and empty function:
```javascript
vi.mock('fs');
vi.mock('fs', () => {});
```
but it is also possible to define one for out specific needs:
```javascript
vi.mock('path', () => {
    return {
        default: {
            join: (...args) => {
                return args[args.length - 1];
            },
        },
    };
});
```
the `default` keyword is necessaty because the `path` package is imported
in this way: 
```javascript
import path from 'path';
```

#### mock file

It is possible to create a `__mocks__/` folder in with put our implemetnation
of `<package>.js` file:
```javascript
// fs.js
import { vi } from 'vitest';

export const promises = {
    writeFile: vi.fn((path, data) => {
        return new Promise((resolve, err) => {
            resolve();
        });
    }),
};
```
this mock implementation will be automatically called when is called
```javascript
vi.mock('fs');
```
thanks to this mock can be written a new test that otherwise would not be correct:
```javascript
it('should return a promise that resolves to no value if called correctly', () => {
    // Arrange
    const testData = 'Test';
    const testFileName = 'test.txt';

    // Act
    const resultPromise = writeData(testData, testFileName);

    // Assert
    return expect(resultPromise).resolves.toBeUndefined();
});
```

#### Change Default behaviour

It is possible to change the default generated behaviour with a new one:
```javascript
const loggerSpy = vi.fn();

// replace the default implementation
loggerSpy.mockImplementation(() => {})

// replace the default implementation just on one execution
loggerSpy.mockImplementationOnce(() => {})
```

## Global Stubs

It is possible to mock a globally provided function 
or value using `vi.stubGlobal`:
```javascript
const responseDataStub = { testKey: 'testData' };

const fetchSpy = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
        const testResponse = {
            ok: true,
            json() {
                return new Promise((resolve, reject) => {
                    resolve(responseDataStub);
                });
            },
        };
        resolve(testResponse);
    });
});

vi.stubGlobal('fetch', fetchSpy);

it('should return any available resonse data', () => {
    // Arrange
    const testData = { key: 'value' };

    // Act
    const resultPromise = sendDataRequest(testData);

    // Assert
    return expect(resultPromise).resolves.toBe(responseDataStub);
});
```
It is possible to add check for the passed parameter in the spy like this:
```javascript
// ...

const fetchSpy = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
        if (typeof options.body !== 'string') {
            return reject('Body not a string.');
        }
        // ...
    });
});

vi.stubGlobal('fetch', fetchSpy);

it('should convert the provided data to JSON before sending the request', async () => {
    // Arrange
    const testData = { key: 'value' };

    // // Act
    // const resultPromise = sendDataRequest(testData);
    // // Assert
    // this way fails because it expect to be rejected but not with this message
    // return expect(resultPromise).not.rejects.toBe('Body not a string.');

    let errorMessage;

    try {
        await sendDataRequest(testData);
    } catch (err) {
        errorMessage = err;
    }

    expect(errorMessage).not.toBe('Body not a string.');
});
```

