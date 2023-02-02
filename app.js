const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

global.authenticationMiddleware = () => {
  return function (req, res, next) {
    if (req.isAuthenticated() && require('./permissions')(req)) {
      return next()
    }
    res.redirect('/login?fail=true')
  }
}

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const reportsRouter = require('./routes/reports');

const app = express();

require('./auth')(passport)
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_CONNECTION,
    dbName: process.env.MONGO_DB,
    ttl: 1800,
    autoRemove: 'native'
  }),
  secret: process.env.MONGO_SOTE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}))

app.use(passport.initialize())
app.use(passport.session())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
