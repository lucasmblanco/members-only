const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  isMember: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
