const express = require('express');

const router = express.Router();

const User = require('../models/user');
const mainController = require('../controllers/mainController');
const registerController = require('../controllers/registerControllers');
const validationController = require('../controllers/validation/validationControllers');
const messageController = require('../controllers/messageController');

/* GET home page. */
router.get('/', mainController.getMainView);

router.get('/register', registerController.getForms);

router.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
});

router.post('/member-access', async (req, res) => {
  console.log(res.body);
  if (req.body.membership === process.env.MEMBER_ACCESS) {
    const user = await User.findById(req.user._id);
    user.isMember = true;
    await user.save();
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

router.post('/admin-access', async (req, res) => {
  console.log(res.body);
  if (req.body.admin === process.env.ADMIN_ACCESS) {
    const user = await User.findById(req.user._id);
    user.isMember = true;
    user.isAdmin = true;
    await user.save();
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

router.post('/create-message', validationController.messageValidtation, messageController.createMessage);

module.exports = router;
