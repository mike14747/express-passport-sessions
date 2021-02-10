require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('views/css'));

app.use(require('./passport/expressSession'));
const passport = require('./passport/passportFunctions');
app.use(passport.initialize());
app.use(passport.session());

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
}

app.use('/api', require('./controllers'));

app.get('/', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views/register.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => console.log(`Server now listening on PORT ${PORT}!`));
