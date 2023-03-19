import express from "express";
const app = express();

// Import required modules
import pool from 'pg';

// Define the insert_user function
async function insert_user(user_name, dob, email, password) {
    // Validate the input parameters
    if (!user_name || user_name.length < 5 || user_name.length > 16) {
        return { result: false, code: 'INVALID_NAME' };
    }
    if (!(dob instanceof Date) || new Date().getFullYear() - dob.getFullYear() < 18) {
        return { result: false, code: 'INVALID_DOB' };
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return { result: false, code: 'INVALID_EMAIL' };
    }
    if (!password || password.length < 5 || password.length > 16 || !/\d{2}/.test(password) || !/[A-Z]/.test(password)) {
        return { result: false, code: 'INVALID_PASSWORD' };
    }

    // Check if the user with the same name or email already exists in the DB
    const client = await pool.connect();
    const checkUserQuery = 'SELECT * FROM users WHERE user_name = $1 OR email = $2';
    const checkUserValues = [user_name, email];
    const checkUserResult = await client.query(checkUserQuery, checkUserValues);
    if (checkUserResult.rowCount > 0) {
        if (checkUserResult.rows[0].user_name === user_name) {
            return { result: false, code: 'USER_ALREADY_REGISTERED' };
        } else {
            return { result: false, code: 'EMAIL_ALREADY_REGISTERED' };
        }
    }

    // Insert the new user into the DB
    const insertUserQuery = 'INSERT INTO users(user_name, dob, email, password) VALUES($1, $2, $3, $4)';
    const insertUserValues = [user_name, dob, email, password];
    try {
        await client.query('BEGIN');
        await client.query(insertUserQuery, insertUserValues);
        await client.query('COMMIT');
        return { result: true, code: null };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        return { result: false, code: 'DB_ERROR' };
    } finally {
        client.release();
    }
}

// Export the insert_user function
export default {
    insert_user
};