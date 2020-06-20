const Strategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
// const salt = bcryptjs.genSaltSync(10);
const User = require('../models/user');

const LoginStrategy = new Strategy(async (username, password, done) => {
    // console.log(bcryptjs.hashSync(password, salt));
    try {
        const [data, error] = await User.getUserByUsernameForLogin({ username: username });
        if (!data) return done(error);
        if (data.length === 1) {
            bcryptjs.compare(password, data[0].password)
                .then((res) => {
                    if (res) return done(null, { id: data[0].user_id, username: data[0].username });
                    return done(null, false);
                })
                .catch(error => console.log(error));
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error);
    }
});

module.exports = LoginStrategy;
