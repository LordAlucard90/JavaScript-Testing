import { it, expect } from 'vitest';
import { add } from './math';

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

it('should throw an error if no value is passed into the function', () => {
    // Act
    const resultFn = () => {
        add();
    };

    // Assert
    expect(resultFn).toThrow();
    // expect(resultFn).not.toThrow();
});

// this test is not possible in typescript
it('should throw an error if provided with multiple arguments instead of an array', () => {
    // Arrange
    const num1 = 1;
    const num2 = 2;

    // Act
    const resultFn = () => {
        add(num1, num2);
    };

    // Assert
    // expect(resultFn).toThrow();
    expect(resultFn).toThrow(/is not iterable/);
});
