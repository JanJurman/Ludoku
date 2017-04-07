var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var user = require('./routes/user');
var leaderboard = require('./routes/leaderboard')
//var game = require('./routes/game')
var gameHistory = require('./routes/gameHistory')
var lobby = require('./routes/lobby')

var socketApi = require('./routes/socketApi');

var globals = require('./globals.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

sess = session({resave: true, saveUninitialized: true, secret: 'LucianoKafeTouchesMySoul', cookie: { maxAge: 60 * 60 * 2* 1000 }})
app.use(sess);

//share session with socket server
var sharedsession = require("express-socket.io-session");
socketApi.io.use(sharedsession(sess))

app.use(express.static(path.join(__dirname, 'public')));

//mongoose connect
mongoose.connect(globals.mongoURI);

app.use('/', index);
app.use('/user', user);
app.use('/leaderboard', leaderboard);
//app.use('/game', game);
app.use('/gameHistory', gameHistory);
app.use('/lobby', lobby);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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