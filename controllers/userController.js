const router = require('express').Router();
const User = require('../models/user');

// all these routes point to /api/user as specified in server.js and controllers/index.js

router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /api/user route root!');
});

router.get('/:id([0-9])', async (req, res, next) => {
    try {
        const [data, error] = await User.getUserById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
