import { it, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';

import { User } from './hooks';

const testEmail = 'test@test.com';
let user;

beforeAll(() => {
    console.log('beforeAll()');
});

beforeEach(() => {
    user = new User(testEmail);
    console.log('beforeEach()');
});

afterEach(() => {
    // alternative as beforeEach user = new User(testEmail);
    console.log('afterEach()');
});

afterAll(() => {
    console.log('afterAll()');
});

it.concurrent('should update the email', () => {
    // const testEmail = 'test@test.com';
    const newTestEmail = 'test2@test.com';

    // const user = new User(testEmail);
    user.updateEmail(newTestEmail);

    expect(user.email).toBe(newTestEmail);
});

it.concurrent('should have an email property', () => {
    // const testEmail = 'test@test.com';

    // const user = new User(testEmail);

    expect(user).toHaveProperty('email');
});

it.concurrent('should store the provided email value', () => {
    // const testEmail = 'test@test.com';

    // const user = new User(testEmail);

    expect(user.email).toBe(testEmail);
});

it.concurrent('should clear the email', () => {
    // const testEmail = 'test@test.com';

    // const user = new User(testEmail);
    user.clearEmail();

    expect(user.email).toBe('');
});

it.concurrent('should still have an email property after clearing the email', () => {
    // const testEmail = 'test@test.com';

    // const user = new User(testEmail);
    user.clearEmail();

    expect(user).toHaveProperty('email');
});
