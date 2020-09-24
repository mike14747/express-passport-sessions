const pool = require('../config/connectionPool');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionOptions = {};

const sessionStore = new MySQLStore(sessionOptions, pool);

module.exports = sessionStore;
