const insert_user  = require("./index")

async function addUser() {
    const user = {
        user_name: 'joe_kunda',
        dob: new Date(1990, 1, 1),
        email: 'jo@kundabox.com',
        password: '12ABCabc '
    };
    const result = await insert_user(user.user_name, user.dob, user.email, user.password);
    console.log(result);
}

addUser();