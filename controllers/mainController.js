const Message = require('../models/message');

const getMainView = async (req, res, next) => {
  try {
    let messages;
    if (req.user) {
      messages = await Message.find()
        .populate('user')
        .sort({ timestamp: -1 })
        .exec();
    }
    return res.render('main_view', {
      title: 'The Club',
      user: req.user || false,
      messages: messages || false,
      errors: false,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getMainView,
};
