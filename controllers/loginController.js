// const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

const logInForm = (req, res) => {
  res.render('log-in-form', {
    title: 'Log in form',
    errors: false,
  });
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const authentication = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

module.exports = {
  logInForm,
  authentication,
};
