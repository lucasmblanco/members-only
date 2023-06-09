const { body } = require('express-validator');

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
    .withMessage('The body must not be empty')
    .trim()
    .escape()
    .withMessage('Body must be specific'),
];

module.exports = {
  formValidation,
  messageValidtation,
};
