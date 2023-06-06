const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', homeController.getHome);

router.post('/', homeController.messageValidtation, homeController.createMessage);
// router.get('/sign-up', homeController.signUpForm);

module.exports = router;
