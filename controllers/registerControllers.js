const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getForms = (req, res) => {
  let errors;
  if (req.query.error) {
    errors = {
      errors: [
        {
          value: 'invalid_credentials',
          msg: 'Invalid credentials.',
          param: 'credentials',
          location: 'file',
        },
      ],
    };
  }
  console.log(errors);
  res.render('forms_view', {
    errors: errors || false,
  });
};

/*
const logInForm = (req, res) => {
  res.render('log-in-form', {
    title: 'Log in form',
    errors: false,
  });
};
*/

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      return res.render(path.join(__dirname, '..', 'views', 'forms_view.ejs'), {
        title: 'Sign up',
        errors,
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
        isMember: false,
        isAdmin: false,
      });
      return await user.save();
    } catch {
      return next(err);
    }
  });
  return res.redirect('/register');
};

module.exports = {
  getForms,
  createUser,
};
