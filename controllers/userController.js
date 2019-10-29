const router = require('express').Router();
const db = require('../models/index.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// all these routes point to the /api folder as specified in server.js
router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /api route root!');
});

router.get('/users/id/:id', (req, res) => {
    db.User.getUserById(req.params.id, (data) => {
        res.json(data);
    });
});

router.post('/register', (req, res) => {
    // input validation is needed here for the username and password
    db.User.checkExistingUsername(req.body.username, (data) => {
        if (data.length === 0) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err) throw err;
                db.User.addNewUser(req.body.username, hash, (result) => {
                    if (result.insertId) {
                        res.redirect('/login');
                    } else {
                        req.flash('registerMessage', 'Registration failed!!');
                        res.redirect('/register');
                    }
                });
            });
        } else {
            req.flash('registerMessage', 'Username is already taken!');
            res.redirect('/register');
        }
    });
});

module.exports = router;
