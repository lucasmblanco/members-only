const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

require('dotenv').config();

const mainRouter = require('./routes/mainRoute');
const registerRouter = require('./routes/registerRoute');
// const signUpRouter = require('./routes/signUpForm');
// const usersRouter = require('./routes/users');
// const clubRouter = require('./routes/club');
// const logInRouter = require('./routes/logIn');
// const logOutRouter = require('./routes/logOut');
// const accessRouter = require('./routes/access');

const app = express();

const db = process.env.MONGO_URL;
const secret = process.env.SECRET_WORD;
mongoose.set('strictQuery', false);
async function main() {
  await mongoose.connect(db);
}
main().catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Members Only',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Lucas',
        url: 'https://github.com/lucasmblanco',
        email: 'lucasmatiasblanco@outlook.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

app.use(logger('dev'));
app.use(express.json());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use(session({ secret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/register', registerRouter);
/*
app.use('/sign-up', signUpRouter);
app.use('/users', usersRouter);
app.use('/log-in', logInRouter);
app.use('/log-out', logOutRouter);
app.use('/total-access', accessRouter);
*/
// app.use('/club-wall', clubRouter);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
