const mysql = require('mysql2');

let connection;

if (process.env.JAWSDB_URL) {
    const url = new URL(process.env.JAWSDB_URL);
    connection = mysql.createConnection({
        host: url.hostname,
        port: url.port,
        user: url.username,
        password: url.password,
        database: url.pathname.replace('/', ''),
        multipleStatements: true,
    });
} else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
        multipleStatements: true,
    });
}

connection.connect();

module.exports = connection;
