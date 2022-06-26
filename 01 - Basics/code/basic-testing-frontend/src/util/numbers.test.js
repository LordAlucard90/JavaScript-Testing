import { it, expect } from 'vitest';
import { transformToNumber } from './numbers';

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
