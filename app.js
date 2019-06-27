var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const session = require('express-session')
const redisStroe = require('connect-redis')(session)

var user = require('./routes/user');
var blog = require('./routes/blog');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const redisClint = require('./db/redis')
const sessionStore = new redisStroe({
  client: redisClint
})
app.use(session({
  secret: 'jdkw#4566',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8081");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header('Access-Control-Allow-Headers', 'Content-type');
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
//   res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天
//   next();
// });

app.use('/api/blog', blog);
app.use('/api/user', user);

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

});

module.exports = app;
