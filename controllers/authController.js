const router = require('express').Router();
const db = require('../models/index.js');

const passport = require('passport');
require('../config/passport')(passport);

const bcrypt = require('bcrypt');
const saltRounds = 10;

// all these routes point to the api/auth folder as specified in server.js and controllers/index.js
router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /auth route root!');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.post('/register', (req, res) => {
    // input validation is needed here for the username and password
    if (req.body.username.length < 6 || req.body.password.length < 6) {
        res.redirect('/register');
    } else {
        db.User.checkExistingUsername(req.body.username, (data) => {
            if (data.length === 0) {
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) throw err;
                    db.User.addNewUser(req.body.username, hash, (result) => {
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
