const Knex = require('knex');
const configOptions = require('./../knexfile');
const env = process.env.NODE_ENV || 'development';

module.exports = Knex(configOptions[env])