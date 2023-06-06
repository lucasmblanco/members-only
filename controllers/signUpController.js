const { body, validationResult } = require('express-validator');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const signUpForm = (req, res) => {
  res.render('sign-up-form', {
    title: 'Sign up form',
    errors: false,
  });
};

const formValidation = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('First name is required')
    .trim()
    .escape()
    .withMessage('First name must be specific'),
  body('lastName')
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Last name must be specific'),
  body('username')
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('You must enter a valid email'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must contain at least 8 characters'),
  body('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .custom(async (confirmPassword, { req }) => {
      const { password } = req.body;
      if (password !== confirmPassword) {
        throw new Error('Passwords must be same');
      }
    }),
];

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      return res.render(path.join(__dirname, '..', 'views', 'sign-up-form.ejs'), {
        title: 'Sign up',
        errors: errors.array(),
      });
    } catch (err) {
      return next(err);
    }
  }

  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {
      const user = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
      });
      return await user.save();
    } catch {
      return next(err);
    }
  });
  return res.redirect('/');
};

module.exports = {
  signUpForm,
  formValidation,
  createUser,
};
