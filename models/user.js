const connection = require('../config/connection');

const User = {
    getUserById: (id, cb) => {
        const queryString = 'SELECT u.user_id, u.username, u.email, u.address, u.city, u.state, u.zip, u.country, u.phone, u.access_level, u.active FROM users AS u WHERE u.user_id=? LIMIT 1;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            return cb(result);
        });
    },
    getUserByUsernameForPassport: (username, cb) => {
        const queryString = 'SELECT u.user_id, u.username, u.password, u.email, u.access_level FROM users AS u WHERE username=? LIMIT 1;';
        const queryParams = [username];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) {
                return cb(err, false);
            }
            return cb(null, result[0]);
        });
    },
    checkExistingUsername: (username, cb) => {
        const queryString = 'SELECT u.username FROM users AS u WHERE username=? LIMIT 1;';
        const queryParams = [username];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            return cb(result);
        });
    },
    addNewUser: (username, password, cb) => {
        const queryString = 'INSERT INTO users(username, password) VALUES(?, ?);';
        const queryParams = [username, password];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            return cb(result);
        });
    },
};

module.exports = User;
