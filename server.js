require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const app = express();
const path = require('path');

const passport = require('passport');
const session = require('express-session');
const sessionStore = require('./config/sessionStore');

app.use(express.static('views/css'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'testing_this_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    next();
}

app.get('/', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views/register.html'));
});

const controllers = require('./controllers');
app.use('/api', controllers);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server now listening on PORT ${PORT}!`);
});
