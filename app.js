var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var admin = require('./routes/admin');
var wallet = require('./routes/wallet');
var erc20 = require('./routes/erc20token');

const swagger = require('swagger-express');
const rootPath = require('config').app.rootPath;
const cors = require('cors');
const LOG = require('./lib/common/winstonlog');
LOG.info('root path is ', rootPath);

var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(rootPath, express.static(path.join(__dirname, 'public')));

app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: rootPath,
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    apis: ['./routes/wallet.js','./routes/admin.js']
}));

app.use(rootPath + '/admin', admin);
app.use(rootPath + '/wallet', wallet);
app.use(rootPath + '/erc20', erc20);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// allowCrossDomain
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

module.exports = app;
