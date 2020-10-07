const router = require('express').Router();
const passport = require('../passport/passportFunctions');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /api/auth route root!');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.post('/register', async (req, res) => {
    // input validation is needed here for the username and password
    if (req.body.username.length < 6 || req.body.password.length < 6) {
        res.redirect('/register');
    } else {
        const saltRounds = 10;
        try {
            const [data, error] = await User.getUserByUsernameForRegister({ username: req.body.username });
            if (error) {
                console.log(error);
                res.redirect('/register');
            }
            if (data && data.length === 0) {
                bcryptjs.hash(req.body.password, saltRounds, async function (err, hash) {
                    if (err) throw err;
                    const [result, userError] = await User.addNewUser({ username: req.body.username, password: hash });
                    if (result && result.insertId) {
                        // res.redirect('/login');
                        // or to have a newly registered user auto login
                        passport.authenticate('login')(req, res, () => {
                            res.redirect('/');
                        });
                    } else {
                        // the registration info wasn't added to the database
                        console.log(userError);
                        res.redirect('/register');
                    }
                });
            } else {
                // that username is already taken
                res.redirect('/register');
            }
        } catch (error) {
            console.log(error);
            res.redirect('/register');
        }
    }
});

module.exports = router;
