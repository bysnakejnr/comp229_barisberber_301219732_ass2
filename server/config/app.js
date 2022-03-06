//3rd party modules
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//module for login
let session = require('express-session');
let passport = require('passport');

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');



//database
let mongoose = require('mongoose');
let DB = require('./db');




mongoose.connect(DB.URI);

let mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, "Connection Error"));
mongodb.once('open', ()=>{console.log('connection success')});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contacts');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.set('layout', './views/main_nav');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
//added static path to node_modules
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
app.use(session({
  secret : 'SomeSecret',
  saveUninitialized : false,
  resave : false

}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

let userModel = require('../models/user');
let User = userModel.User;

passport.use(User.createStrategy());

//serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-list', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'error' });
});

module.exports = app;

