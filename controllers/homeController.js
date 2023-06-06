// const path = require('path');
const { body, validationResult } = require('express-validator');
const path = require('path');
const Message = require('../models/message');

const getHome = (req, res) => {
  res.render('home', {
    title: 'The Club',
    user: req.user,
    messages: false,
    errors: false,
  });
};

const messageValidtation = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The title must not be empty')
    .trim()
    .escape()
    .withMessage('Title must be specific'),
  body('body')
    .not()
    .isEmpty()
    .withMessage('The title must not be empty')
    .trim()
    .escape()
    .withMessage('Title must be specific'),
];

const createMessage = async (req, res, next) => {
  console.log('--------------- aca --------');
  console.log(req.body.user);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    try {
      return res.render(path.join(__dirname, '..', 'views', 'home.ejs'), {
        title: 'The Club',
        user: req.user,
        messages: false,
        errors: errors.array(),
      });
    } catch (err) {
      return next(err);
    }
  }
  try {
    const message = new Message({
      user: req.body.user,
      title: req.body.title,
      body: req.body.body,
      timestamp: new Date(),
    });
    await message.save();
    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getHome,
  messageValidtation,
  createMessage,
};
