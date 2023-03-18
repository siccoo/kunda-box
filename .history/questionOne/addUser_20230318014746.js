const { insert_user } = require('./insert_user');

async function addUser() {
    const user = {
        user_name: 'john_doe',
        dob: new Date(1990, 0, 1),
        email: 'john.doe@example.com',
        password: 'Password12'
    };
    const result = await insert_user(user.user_name, user.dob, user.email, user.password);
    console.log(result);
}

addUser();