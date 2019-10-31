const router = require('express').Router();
const db = require('../models/index.js');

// all these routes point to the /api/user folder as specified in server.js and controllers/index.js
router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /api/user route root!');
});

router.get('/id/:id', (req, res) => {
    db.User.getUserById(req.params.id, (data) => {
        res.json(data);
    });
});

module.exports = router;
