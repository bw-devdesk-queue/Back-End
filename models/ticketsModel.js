const db = require('./../data/dbConfig');

function fetchTickets(){
    return db('tickets');
}

module.exports = {
    fetchTickets
}