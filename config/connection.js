const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PW,
//     database: process.env.DB_NAME,
//     multipleStatements: true,
// });

const connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

module.exports = connection;
