import { describe, expect, it, vi } from 'vitest';
import { HttpError } from './errors';
import { sendDataRequest } from './http';

const responseDataStub = { testKey: 'testData' };

const fetchSpy = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
        if (typeof options.body !== 'string') {
            return reject('Body not a string.');
        }
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

it('should convert the provided data to JSON before sending the request', async () => {
    // Arrange
    const testData = { key: 'value' };

    // // Act
    // const resultPromise = sendDataRequest(testData);
    // // Assert
    // this way fails because it expect to be rejected but not with thie message
    // return expect(resultPromise).not.rejects.toBe('Body not a string.');

    let errorMessage;

    try {
        await sendDataRequest(testData);
    } catch (err) {
        errorMessage = err;
    }

    expect(errorMessage).not.toBe('Body not a string.');
});

it('should throw an HttpError in case of not-ok responses', async () => {
    // Arrange
    fetchSpy.mockImplementationOnce((url, options) => {
        return new Promise((resolve, reject) => {
            const testResponse = {
                ok: false,
                json() {
                    return new Promise((resolve, reject) => {
                        resolve(responseDataStub);
                    });
                },
            };
            resolve(testResponse);
        });
    });
    const testData = { key: 'value' };

    // // Act
    const resultPromise = sendDataRequest(testData);

    // Assert
    return expect(resultPromise).rejects.toBeInstanceOf(HttpError);
});
