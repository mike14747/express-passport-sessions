const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('./connection');

module.exports = function (passport) {
    // passport.serializeUser(function (user, done) {
    //     done(null, user.user_id);
    // });

    passport.serializeUser((user, done) => {
        const userSession = { id: user.user_id, username: user.username, email: user.email, access_level: user.access_level };
        done(null, userSession);
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

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, function (req, username, password, done) {
        if (!req.user) {
            const queryString = 'SELECT u.user_id, u.username, u.password, u.email, u.access_level FROM users AS u WHERE username=? LIMIT 1;';
            const queryParams = [username];
            connection.execute(queryString, queryParams, (err, user) => {
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
        } else if (req.user) {
            return done(null, req.user);
        }
    }));
};
