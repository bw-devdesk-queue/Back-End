const db = require('./../data/dbConfig');

function fetchUsers(){
    return db('user');
}


module.exports = {
    fetchUsers
}