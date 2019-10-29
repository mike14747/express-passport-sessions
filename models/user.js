const connection = require('../config/connection');

const User = {
    getUserById: (id, cb) => {
        const queryString = 'SELECT u.user_id, u.username, u.password, u.email, u.access_level, u.active FROM users AS u WHERE u.user_id=? && u.active=1 LIMIT 1;';
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
                return cb(err, result);
            }
            return cb(null, result);
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
