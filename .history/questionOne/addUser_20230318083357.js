const { insert_user } = require('./insert_user');

async function addUser() {
    const user = {
        user_name: 'joe',
        dob: new Date(1990, 1, 1),
        email: 'john.doe@kundabox.com',
        password: '12ABCabc '
    };
    const result = await insert_user(user.user_name, user.dob, user.email, user.password);
    console.log(result);
}

addUser();