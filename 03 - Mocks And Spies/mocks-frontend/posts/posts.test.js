import { describe, expect, it, vi } from 'vitest';
import { extractPostData } from './posts';

describe('extractPostData()', () => {
    it('should extract title and content from the provided form data', async () => {
        // Arrange
        const testTitle = 'title';
        const testContent = 'content';
        const testFormData = {
            title: testTitle,
            content: testContent,
            get(identifier) {
                return this[identifier];
            },
        };

        // Act
        const result = extractPostData(testFormData);

        // Assert
        expect(result.title).toBe(testTitle);
        expect(result.content).toBe(testContent);
    });
});
