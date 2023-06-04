const signUpAction = (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.body.name);
  res.render('home', {
    title: 'hola',
  });
};

module.exports = {
  signUpAction,
};
