const db = require('./../data/dbConfig');
const bcrypt = require('bcryptjs');


function fetchAdmins(){
    return db('admin');
}
async function addAdmin(admin){
    const hash = bcrypt.hashSync(admin.password, 12);
    admin.password = hash;
    await db('Admin').insert(admin);
    return fetchAdminBy(admin.email);
}

function fetchAdminBy(email){
    return db('Admin').where(`email`, email).first();
}

module.exports = {
    fetchAdmins,
    addAdmin,
    fetchAdminBy
}