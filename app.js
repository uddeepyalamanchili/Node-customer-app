var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiCustomer = require('./routes/customer-api');
var apistudent = require('./routes/student-api');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cors = require('cors')
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
app.set('superSecret', 'trainingIsGood');
app.use(cors());

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
app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
var token = req.body.token || req.param('token') || req.headers['x-access-token'];
// decode token
if (token) {
  // verifies secret and checks exp
  jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
    if (err) {
      return res.json({ success: false, message: 'Failed to authenticate token.' });    
    } else {
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;  
      next();
    }
  });

} else {
  // if there is no token
  // return an error
  return res.status(403).send({ 
    success: false, 
    message: 'No token provided.'
  });
}
});
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
