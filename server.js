require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const app = express();
const path = require('path');

const passport = require('passport');
require('./config/passport')(passport);
const session = require('express-session');
const sessionStore = require('./config/sessionStore');

app.use(express.static('views/css'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', checkAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/login', checkNotAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

// this is right from the passport docs
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views/register.html'));
});

app.get('/logout', checkAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/login');
});

const controllers = require('./controllers');
app.use('/api', controllers);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server now listening on PORT ${PORT}!`);
});
