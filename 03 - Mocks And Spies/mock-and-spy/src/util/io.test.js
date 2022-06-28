import { it, expect, vi } from 'vitest';
import writeData from './io';
import { promises as fs } from 'fs';
import { arch } from 'os';

vi.mock('fs');
vi.mock('path', () => {
    return {
        default: {
            join: (...args) => {
                return args[args.length - 1];
            },
        },
    };
});

it('should execute the writeFile method (not correct test)', () => {
    // Arrange
    const testData = 'Test';
    const testFileName = 'test.txt';

    // Act
    writeData(testData, testFileName);

    // Assert
    expect(fs.writeFile).toBeCalled();
    expect(fs.writeFile).toBeCalledWith(testFileName, testData);
});

it('should return a promise that resolves to no value if called correctly', () => {
    // Arrange
    const testData = 'Test';
    const testFileName = 'test.txt';

    // Act
    const resultPromise = writeData(testData, testFileName);

    // Assert
    return expect(resultPromise).resolves.toBeUndefined();
});
