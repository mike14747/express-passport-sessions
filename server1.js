require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('views/css'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function checkAuthenticated(req, res, next) {
    // if (req.isAuthenticated()) {
    //     next();
    // }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    // if (req.isAuthenticated()) {
    //     res.redirect('/');
    // }
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

app.get('/logout', checkAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/login');
});

const authController = require('./controllers/authController');
app.use(authController);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server now listening on PORT ${PORT}!`);
});
