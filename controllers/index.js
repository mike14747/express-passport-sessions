// this goes in controllers/index.js
// all these routes point to the /api folder as specified in server.js

const router = require('express').Router();

const userController = require('./userController');
router.use('/', userController);

module.exports = router;
