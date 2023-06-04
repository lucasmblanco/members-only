// const path = require('path');

const getHome = (req, res) => {
  res.render('home', { title: 'The Club' });
};

const signUpForm = (req, res) => {
  res.render('sign-up-form', {
    title: 'Sign up form',
  });
};

module.exports = {
  getHome,
  signUpForm,
};
