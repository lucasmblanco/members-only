const express = require('express');

const router = express.Router();

const signUpController = require('../controllers/signUpController');

router.get('/', signUpController.signUpForm);

router.post('/', signUpController.formValidation, signUpController.createUser);

module.exports = router;
