const express = require('express');

const router = express.Router();

const signUpController = require('../controllers/signUpController');

router.post('/', signUpController.signUpAction);

module.exports = router;
