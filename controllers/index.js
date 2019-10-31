const router = require('express').Router();

// all these routes point to the base route path of /api as specified in server.js

// const authController = require('./authController');
// router.use('/auth', authController);

// const userController = require('./userController');
// router.use('/user', userController);

const db = require('../models/index.js');

router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /api/user route root!');
});

router.get('/id/:id', (req, res) => {
    db.User.getUserById(req.params.id, (data) => {
        res.json(data);
    });
});

module.exports = router;
