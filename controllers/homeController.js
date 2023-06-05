// const path = require('path');

const getHome = (req, res) => {
  res.render('home', {
    title: 'The Club',
    user: req.user,
  });
};

module.exports = {
  getHome,

};
