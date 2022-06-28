import { describe, expect, it } from 'vitest';
import { validateNotEmpty } from './validation';

it('should throw an error if an empty string is provided as value', () => {
    // Arrange
    const testInput = '';

    // Act
    const resultFn = () => validateNotEmpty(testInput);

    // Assert
    expect(resultFn).toThrow();
});

it('should throw an error if a bland string is provided as value', () => {
    // Arrange
    const testInput = ' ';

    // Act
    const resultFn = () => validateNotEmpty(testInput);

    // Assert
    expect(resultFn).toThrow();
});

it('should throw an error with the provided error message', () => {
    // Arrange
    const testInput = '';
    const testErrorMessage = ' ';

    // Act
    const resultFn = () => validateNotEmpty(testInput, testErrorMessage);

    // Assert
    expect(resultFn).toThrowError(testErrorMessage);
});

