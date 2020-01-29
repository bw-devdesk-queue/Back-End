const db = require('./../data/dbConfig');
const bcrypt = require('bcryptjs');


function fetchUsers(){
    return db('user');
}
async function addUser(user){
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    await db('user').insert(user);
    return fetchUserBy(user.email);
}

function fetchUserBy(email){
    return db('user').where(`email`, email).first();
}

module.exports = {
    fetchUsers,
    addUser,
    fetchUserBy
}