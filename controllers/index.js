const router = require('express').Router();

// all these routes point to the base route path of /api as specified in server.js

router.use('/auth', require('./authController'));

router.use('/users', require('./userController'));

router.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).send('An error occurred!\n' + error.message);
});

module.exports = router;
