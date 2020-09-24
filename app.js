var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiCustomer = require('./routes/customer-api');
var apistudent = require('./routes/student-api');
//var session = require('express-session');
//var securePagesRouter = require('./routes/securePages');
var app = express();
/*
var sess = {
  secret: 'keyboard cat',
  cookie: {},
  proxy: true,
  resave: true,
  saveUninitialized: true
}
app.use(session(sess));*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
/*app.use(function(req, res, next) {
  console.log("This is my check point for user / autorization");
  if(typeof(req.session.user) == 'string'){
    next(); 
  }else{
    res.send({result:"fail", msg:"you are not authorized for this request."})
  }
});*/

//app.use('/', securePagesRouter);
app.use('/api/customer', apiCustomer);
app.use('/api/student', apistudent);

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
  res.render('error');
});

module.exports = app;
