import { it, expect, describe } from 'vitest';
import { generateToken, generateTokenPromise } from './async-example';

describe.concurrent('generateToken()', () => {
    it('should generate a token value (wrong implementation)', () => {
        // Arrange
        const testUserEmail = 'test@example.com';

        // Act
        generateToken(testUserEmail, (err, token) => {
            // Assert
            expect(token).toBeDefined();
            expect(token).toBe(2);
        });
    });

    // it('should fail with the correct assertion error', done => {
    //     // Arrange
    //     const testUserEmail = 'test@example.com';
    //
    //     // Act
    //     generateToken(testUserEmail, (err, token) => {
    //         // Assert
    //         try {
    //             expect(token).toBe(2);
    //             done();
    //         } catch (err) {
    //             done(err);
    //         }
    //     });
    // });

    it('should generate a token value', done => {
        // Arrange
        const testUserEmail = 'test@example.com';

        // Act
        generateToken(testUserEmail, (err, token) => {
            // Assert
            try {
                expect(token).toBeDefined();
                done();
            } catch (err) {
                done(err);
            }
        });
    });
});

describe.concurrent('generateTokenPromise()', () => {
    it('should generate a token value', () => {
        // Arrange
        const testUserEmail = 'test@example.com';

        // Act
        const resultPromise = generateTokenPromise(testUserEmail);

        // Assert
        return expect(resultPromise).resolves.toBeDefined();
    });

    it('should generate a token value (await)', async () => {
        // Arrange
        const testUserEmail = 'test@example.com';

        // Act
        const token = await generateTokenPromise(testUserEmail);

        // Assert
        expect(token).toBeDefined();
    });
});
