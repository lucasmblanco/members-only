const express = require('express');

const router = express.Router();

const registerController = require('../controllers/registerControllers');
const auth = require('../controllers/auth/authController');
const validationController = require('../controllers/validation/validationControllers');

router.post('/log-in', auth.authUser);

router.post('/sign-up', validationController.formValidation, registerController.createUser);

module.exports = router;
