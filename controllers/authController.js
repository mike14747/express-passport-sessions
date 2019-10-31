const router = require('express').Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');

// this is used by passport.authenticate on the /login POST route
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
// end 'used by passport.authenticate on the /login POST route'

// all these routes point to the api/auth folder as specified in server.js and controllers/index.js
router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /auth route root!');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.post('/register', (req, res) => {
    // input validation is needed here for the username and password
    if (req.body.username.length < 6 || req.body.password.length < 6) {
        res.redirect('/register');
    } else {
        const saltRounds = 10;
        User.checkExistingUsername(req.body.username, (data) => {
            if (data.length === 0) {
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) throw err;
                    User.addNewUser(req.body.username, hash, (result) => {
                        if (result.insertId) {
                            res.redirect('/login');
                        } else {
                            res.redirect('/register');
                        }
                    });
                });
            } else {
                res.redirect('/register');
            }
        });
    }
});

module.exports = router;
