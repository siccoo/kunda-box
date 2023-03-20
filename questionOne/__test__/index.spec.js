const insert_user = require("../index");
const { faker } = require("@faker-js/faker");
const { Client } = require("pg");

const val = {
  user_name: faker.internet.userName(),
  dob: faker.date.birthdate(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

const client = new Client({
    host: 'postgresql-116686-0.cloudclusters.net',
    database: 'kunda-box',
    user: 'Michael',
    password: '12345678',
    port: 13958,
    ssl: false,
});

describe("insert_user function", () => {
  beforeAll(async () => {
    // Code to set up a test database
    await client.connect();

    try {
      await client.query(`
          CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            user_name TEXT NOT NULL,
            dob DATE NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
          )
        `);
      console.log("users table created successfully");
    } catch (err) {
      console.error("Error creating users table", err);
    }
  });

  afterAll(async () => {
    // Code to clean up the test database
    await client.end();
  });

  test("Adding a user with proper values should return true", async () => {
    const result = await insert_user(
      val.user_name,
      val.dob,
      val.email,
      val.password,
      client
    );
    expect(result.result).toBe(true);
    expect(result.code).toBeNull();
  });

  test("Adding a user that is already in the DB should return the correct error code", async () => {
    const result = await insert_user(
      "john1234",
      new Date(1995, 7, 16),
      "john2@example.com",
      "123ABCabc",
      client
    );
    expect(result.result).toBe(false);
    expect(result.code).toBe("USER_ALREADY_REGISTERED");
  });

  test("Adding a user with non valid user_name should return the correct error code", async () => {
    const result1 = await insert_user(
      "",
      new Date(1990, 1, 1),
      "test@example.com",
      "12ABCabc",
      client
    );
    expect(result1.result).toBe(false);
    expect(result1.code).toBe("INVALID_NAME");
  });

  test("Adding a user with non valid dob should return the correct error code", async () => {
    const result1 = await insert_user(
      "testuser",
      new Date(2010, 1, 1),
      "test@example.com",
      "12ABCabc",
      client
    );
    expect(result1.result).toBe(false);
    expect(result1.code).toBe("INVALID_DOB");
  });

  test("Adding a user with non valid email should return the correct error code", async () => {
    const result1 = await insert_user(
      "testuser",
      new Date(1990, 1, 1),
      "",
      "12ABCabc",
      client
    );
    expect(result1.result).toBe(false);
    expect(result1.code).toBe("INVALID_EMAIL");
  });

  test("Adding a user with non valid password should return the correct error code", async () => {
    const result1 = await insert_user(
      "testuser",
      new Date(1990, 1, 1),
      "test@example.com",
      "",
      client
    );
    expect(result1.result).toBe(false);
    expect(result1.code).toBe("INVALID_PASSWORD");
  });
});
