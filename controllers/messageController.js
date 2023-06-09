const { validationResult } = require('express-validator');
const path = require('path');
const Message = require('../models/message');

const createMessage = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      const messages = await Message.find()
        .populate('user')
        .sort({ timestamp: -1 })
        .exec();
      return res.render(path.join(__dirname, '..', 'views', 'main_view.ejs'), {
        title: 'The Club',
        user: req.user,
        messages,
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

const deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndRemove(req.body.id);
    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createMessage,
  deleteMessage,
};
