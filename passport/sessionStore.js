const pool = require('../config/connectionPool').getDb();

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

let sessionOptions;

if (process.env.JAWSDB_URL) {
    const url = new URL(process.env.JAWSDB_URL);
    sessionOptions = {
        host: url.hostname,
        port: url.port,
        user: url.username,
        password: url.password,
        database: url.pathname.replace('/', ''),
    };
} else {
    sessionOptions = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
    };
}

const sessionStore = new MySQLStore(sessionOptions, pool);

module.exports = sessionStore;
