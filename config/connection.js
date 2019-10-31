const mysql = require('mysql2');

let connection;

if (process.env.NODE_ENV === 'production') {
    connection = mysql.createConnection({
        JAWSDB_URL: process.env.JAWSDB_URL,
        // multipleStatements: true,
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
