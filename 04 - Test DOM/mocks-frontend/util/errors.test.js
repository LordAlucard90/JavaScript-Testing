import { describe, expect, it } from 'vitest';
import { HttpError, ValidationError } from './errors';

describe('HttpError', () => {
    it('should contain the provided status code, message and data', () => {
        // Arrange
        const testStatus = 100;
        const testMessage = 'message';
        const testData = { key: 'test' };

        // Act
        const result = new HttpError(testStatus, testMessage, testData);

        // Assert
        expect(result.statusCode).toBe(testStatus);
        expect(result.message).toBe(testMessage);
        expect(result.data).toBe(testData);
    });

    it('should contain undefined as data if no data is provided', () => {
        // Arrange
        const testStatus = 100;
        const testMessage = 'message';

        // Act
        const result = new HttpError(testStatus, testMessage);

        // Assert
        expect(result.statusCode).toBe(testStatus);
        expect(result.message).toBe(testMessage);
        expect(result.data).not.toBeDefined()
    });
});

describe('ValidationError', () => {
    it('should contain the provided message', () => {
        // Arrange
        const testMessage = 'message';

        // Act
        const result = new ValidationError(testMessage);

        // Assert
        expect(result.message).toBe(testMessage);
    });
});

