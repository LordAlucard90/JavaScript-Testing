# Test DOM

## Content

- [Testing Environment](#testing-environment)
- [Setup DOM](#setup-dom)
- [Testing DOM](#testing-dom)
- [Testing Library](#testing-library)

---

## Testing Environment

There are available different environments in jest and vitest:

- **NodeJS**: it is the default one, 
where are available the NodeJS APIs and modules, but not the browser.
- **JSODM**: virtually emulates the DOM and browser API.
- **Happy-DOM**: like JSODM but vitest only.

To enable a specific environment, in vitest, the test run script
must be updated in this way:
```json
{
  // ...
  "scripts": {
    // ...
    "test": "vitest --environment happy-dom",
    "test:jsdom": "vitest --environment jsdom"
  },
  // ...
}
```
Jest allow to switch to the select environment in a specific file using:
```javascript
/**
 * @jest-environment jsdom
 */
```

## Setup DOM

Using the happy-dom, it is possible to create a virtual window object that
can be provided as global stub to the test environment:
```javascript
import { vi } from 'vitest';
import { Window } from 'happy-dom';
import fs from 'fs';
import path from 'path';

const htmlDocumentPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocumentPath).toString();

const window = new Window();
const document = window.document;
document.write(htmlDocumentContent);
vi.stubGlobal('document', document);
```

## Testing DOM

It is possible to test the DOM just calling the desired method and then
checking the virtual document content:
```javascript
it('should add an error paragraph to the id="errors" element', () => {
    // Act
    showError('message');

    // Assert
    const errorsEl = document.getElementById('errors')
    const errorParagraph = errorsEl.firstElementChild

    expect(errorParagraph).not.toBeNull()
});
```
nevertheless, since the document it shared, it is important to reset it
before or after each test to do not make it fail other tests:
```javascript
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
```

## Testing Library

The [(DOM) Testing Library](https://testing-library.com/) is a third party library
that makes it simpler to test the DOM interactions.

It integrate itself with jest and vitest and support various js frameworks
and libraries like: Angular, React and Vue.\
Moreover has plugins for end-to-end testing with Cypress and an implementation
for React Native.

