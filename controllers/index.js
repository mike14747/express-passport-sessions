const router = require('express').Router();

// all these routes point to the base route path of /api as specified in server.js

const authController = require('./authController');
router.use('/auth', authController);

const userController = require('./userController');
router.use('/user', userController);

module.exports = router;
