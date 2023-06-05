const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');

// const User = require('../models/user');

router.get('/', loginController.logInForm);

router.post('/', loginController.authentication);

module.exports = router;
