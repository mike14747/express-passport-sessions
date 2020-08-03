require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const path = require('path');

const connectionPool = require('./config/connectionPool');

app.use(require('./passport/expressSession'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('views/css'));

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

connectionPool.mysqlConnect()
    .then(() => {
        // these functions need to be called only after connecting to mysql since they use the connection pool
        const passport = require('./passport/passportFunctions');
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        console.log('An error occurred connecting to the database!\n', error.message);
        app.get('/api', (req, res) => {
            res.status(500).send('There is no connection to the database!');
        });
    })
    .finally(() => {
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
    });

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
