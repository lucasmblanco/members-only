const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../models/user');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.password) {
        return done(null, false, { message: 'password is required' });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!err && isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: 'Incorrect password' });
      });
    } catch (err) {
      return done(err);
    }
    return null;
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

const authUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

module.exports = {
  authUser,
};
