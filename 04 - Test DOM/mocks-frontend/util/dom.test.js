import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';
import { showError } from './dom';
import fs from 'fs';
import path from 'path';

const htmlDocumentPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocumentPath).toString();

const window = new Window();
const document = window.document;
document.write(htmlDocumentContent);
vi.stubGlobal('document', document);

beforeEach(() => {
    // Arrange
    document.body.innerHTML = '';
    document.write(htmlDocumentContent);
});

it('should add an error paragraph to the id="errors" element', () => {
    // Act
    showError('message');

    // Assert
    const errorsEl = document.getElementById('errors');
    const errorParagraph = errorsEl.firstElementChild;

    expect(errorParagraph).not.toBeNull();
});

it('should not contain an error paragraph initially', () => {
    // Assert
    const errorsEl = document.getElementById('errors');
    const errorParagraph = errorsEl.firstElementChild;

    expect(errorParagraph).toBeNull();
});

it('should output the provided message in the error paragraph', () => {
    // Arrange
    const testErrorMessage = 'test-message'

    // Act
    showError(testErrorMessage);

    // Assert
    const errorsEl = document.getElementById('errors');
    const errorParagraph = errorsEl.firstElementChild;

    expect(errorParagraph.textContent).toBe(testErrorMessage);
});

