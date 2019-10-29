const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        const userSession = { id: user.user_id, username: user.username, email: user.email, access_level: user.access_level };
        done(null, userSession);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, function (req, username, password, done) {
        if (!req.user) {
            User.getUserByUsernameForPassport(username, (err, user) => {
                if (err) { return done(err); }
                if (user.length === 0) {
                    return done(null, false);
                }
                bcrypt.compare(password, user[0].password)
                    .then(function (res) {
                        if (!res) {
                            return done(null, false);
                        }
                        return done(null, user[0]);
                    })
                    .catch((err) => {
                        return done(err);
                    });
            });
        } else {
            return done(null, req.user);
        }
    }));
};
