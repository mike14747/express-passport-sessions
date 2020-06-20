const pool = require('../config/connectionPool.js').getDb();

const User = {
    getUserById: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.user_id, u.username, u.email, u.address, u.city, u.state, u.zip, u.country, u.phone, u.access_level, u.active FROM users AS u WHERE u.user_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getUserByIdForPassport: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.user_id, u.username, u.access_level FROM users AS u WHERE u.user_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getUserByUsernameForLogin: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.user_id, u.username, u.password, u.email, u.access_level FROM users AS u WHERE username=? LIMIT 1;';
            const queryParams = [
                paramsObj.username,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getUserByUsernameForRegister: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.username FROM users AS u WHERE username=? LIMIT 1;';
            const queryParams = [
                paramsObj.username,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewUser: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO users(username, password) VALUES(?, ?);';
            const queryParams = [
                paramsObj.username,
                paramsObj.password,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = User;
