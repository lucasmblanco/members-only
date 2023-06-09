const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  body: {
    type: String,
    required: true,
    maxLength: 140,
  },
  timestamp: {
    type: Date,
  },
});

module.exports = mongoose.models.Message || mongoose.model('Message', MessageSchema);
