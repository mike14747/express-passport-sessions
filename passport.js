require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const app = express();

const passport = require('passport');
const cookieParser = require('cookie-parser');

const controllers = require('./controllers');
app.use('/api', controllers);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// start contents of './config/passportConfig'
// require('./config/passportConfig')(passport);
// start userPassport model
// const userPassport = require('../models/userPassport.js');
const connection = require('./config/connection');
const userPassport = {
    getUserByUsernameWithPassword: (username, done) => {
        const queryString = 'SELECT u.user_id, u.username,u.password, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE username=? LIMIT 1;';
        connection.execute(queryString, [username], (err, user) => {
            if (err) {
                return done(err, user);
            }
            return done(null, user[0]);
        });
    },
    getUserById: (id, done) => {
        const queryString = 'SELECT u.user_id, u.username, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE user_id=? LIMIT 1;';
        connection.execute(queryString, [id], (err, user) => {
            if (err) {
                return done(err, user);
            }
            return done(null, user[0]);
        });
    },
};
// start userPassport model
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});
passport.deserializeUser((id, done) => {
    userPassport.getUserById(id, (err, data) => {
        done(err, data);
    });
});
passport.use(
    new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            if (!req.user && (!username === '' || password.length >= 5)) {
                userPassport.getUserByUsernameWithPassword(
                    username,
                    (err, user) => {
                        if (err) {
                            return done(err); // if err return err
                        } else if (!user) {
                            return done(null, false, {
                                message: 'No username found that matches ' + username,
                            });
                        } else {
                            bcrypt.compare(
                                password,
                                user.password,
                                (err, result) => {
                                    if (err) {
                                        done(err);
                                    } else if (result) {
                                        delete user.password;
                                        done(null, user);
                                    } else {
                                        done(null, false, {
                                            message: 'incorrect password',
                                        });
                                    }
                                },
                            );
                        }
                    },
                );
            } else if (req.user) {
                done(null, req.user);
            } else {
                return done(null, false, {
                    message:
                        'Username and password must match input requirements',
                });
            }
        },
    ),
);
// end contents of './config/passportConfig'

const session = require('express-session');

// start contents of './config/promiseConnection'
// const sessionStore = require('./config/promiseConnection');
const MySQLStore = require('express-mysql-session')(session);

const sessionOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 7200000,
};
const sessionStore = new MySQLStore(sessionOptions, connection.promise);
// end contents of './config/promiseConnection'

app.use(cookieParser('cookie_name'));

app.use(
    session({
        secret: 'cookie_name',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000, // 3600000 is 1 hour in milliseconds.
        },
    }),
);

// start passport code
app.use(passport.initialize());
app.use(passport.session());
// end passport code

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server now listening on PORT ${PORT}!`);
});
