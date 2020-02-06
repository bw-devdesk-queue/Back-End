require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_URL_TESTING = process.env.DATABASE_URL_TESTING




module.exports = {
    DATABASE_URL,
    DATABASE_URL_TESTING
}