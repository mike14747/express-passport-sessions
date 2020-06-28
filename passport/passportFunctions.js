const passport = require('passport');
const User = require('../models/user');

const LoginStrategy = require('./loginStrategy');
passport.use('login', LoginStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const [data, error] = await User.getUserByIdForPassport({ id: id });
        if (!data) return done(error);
        if (data.length === 1) {
            const user = { id: data[0].user_id, username: data[0].username, testProperty: 'testing this out from deserializeUser' };
            return done(null, user);
        } else {
            return done(null, false, { message: 'Could not find a valid user!' });
        }
    } catch (error) {
        return done(error);
    }
});

module.exports = passport;
