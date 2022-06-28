import { it, expect, describe, vi } from 'vitest';
import { generateReportData, storeData } from './data';

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
