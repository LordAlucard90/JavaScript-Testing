import { it, expect, describe } from 'vitest';
import { cleanNumbers, transformToNumber } from './numbers';

describe('transformToNumber()', () => {
    it('should transform a string number in a number', () => {
        // Arrange
        const stringNumber = '42';

        // Act
        const result = transformToNumber(stringNumber);

        // Assert
        expect(result).toBeTypeOf('number');
    });

    it('should transform a string number in a number', () => {
        // Arrange
        const stringNumber = '42';
        const expectedResult = 42;

        // Act
        const result = transformToNumber(stringNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });

    it('should yield NaN for a non-transformable value', () => {
        // Arrange
        const invalid = 'invalid';
        const invalid2 = {};

        // Act
        const result = transformToNumber(invalid);
        const result2 = transformToNumber(invalid2);

        // Assert
        expect(result).toBeNaN();
        expect(result2).toBeNaN();
    });
});

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
