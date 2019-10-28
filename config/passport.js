const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const connection = require('./connection');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.user_id);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // passport.deserializeUser(function (id, done) {
    //     const queryString = 'SELECT u.user_id, u.username, u.password FROM users AS u WHERE u.user_id=? LIMIT 1;';
    //     const queryParams = [id];
    //     connection.execute(queryString, queryParams, (err, user) => {
    //         if (err) throw err;
    //         done(err, user[0]);
    //     });
    // });

    // local strategy for logging in
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, function (req, username, password, done) {
        if (!req.user) {
            const queryString = 'SELECT u.user_id, u.username, u.password FROM users AS u WHERE username=? LIMIT 1;';
            const queryParams = [username];
            connection.execute(queryString, queryParams, (err, user) => {
                if (err) { return done(err); }
                if (user.length === 0) {
                    return done(null, false, req.flash('loginMessage', 'Username not found!'));
                }
                // the username is found, so check the password
                bcrypt.compare(password, user[0].password)
                    .then(function (res) {
                        if (!res) {
                            return done(null, false, req.flash('loginMessage', 'Wrong password!'));
                        }
                    })
                    .catch((err) => {
                        return done(err);
                    });
                return done(null, user[0]);
            });
        } else if (req.user) {
            done(null, req.user);
        }
    }));
};
