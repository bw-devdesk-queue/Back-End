const db = require('./../data/dbConfig');
const bcrypt = require('bcryptjs');


function fetchAdmins(){
    return db('admin');
}
async function addAdmin(admin){
    const hash = bcrypt.hashSync(admin.password, 12);
    admin.password = hash;
    await db('admin').insert(admin);
    return fetchAdminBy(admin.email);
}

function fetchAdminBy(email){
    return db('admin').where(`email`, email).first();
}

module.exports = {
    fetchAdmins,
    addAdmin,
    fetchAdminBy
}