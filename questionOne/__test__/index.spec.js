const insert_user  = require("../index");

describe('insert_user function', () => {
    // beforeAll(async () => {
    //     // Code to set up a test database
    // });

    // afterAll(async () => {
    //     // Code to clean up the test database
    // });

    test('Adding a user with proper values should return true', async () => {
        const result = await insert_user('john123', new Date(1995, 7, 15), 'john@example.com', '12ABCabc');
        expect(result.result).toBe(true);
        expect(result.code).toBeNull();
    });

    test('Adding a user that is already in the DB should return the correct error code', async () => {
        const result = await insert_user('joe', new Date(2000, 0, 1), 'joe@kundabox.com', '12ABCabc');
        expect(result.result).toBe(false);
        expect(result.code).toBe('USER_ALREADY_REGISTERED');
    });

    test('Adding a user with non valid user_name should return the correct error code', async () => {
        const result1 = await insert_user('', new Date(1990, 1, 1), 'test@example.com', '12ABCabc');
        expect(result1.result).toBe(false);
        expect(result1.code).toBe('INVALID_NAME');
    });

    test('Adding a user with non valid dob should return the correct error code', async () => {
        const result1 = await insert_user('testuser', new Date(2010, 1, 1), 'test@example.com', '12ABCabc');
        expect(result1.result).toBe(false);
        expect(result1.code).toBe('INVALID_DOB');
    });

    test('Adding a user with non valid email should return the correct error code', async () => {
        const result1 = await insert_user('testuser', new Date(1990, 1, 1), '', '12ABCabc');
        expect(result1.result).toBe(false);
        expect(result1.code).toBe('INVALID_EMAIL');
    });

    test('Adding a user with non valid password should return the correct error code', async () => {
        const result1 = await insert_user('testuser', new Date(1990, 1, 1), 'test@example.com', '');
        expect(result1.result).toBe(false);
        expect(result1.code).toBe('INVALID_PASSWORD');
    });
});