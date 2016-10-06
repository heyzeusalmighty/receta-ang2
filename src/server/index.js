var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var config = require('./config/config');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));
app.use('/', express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/test');
mongoose.connect(config.DB_ADDRESS);
var db = mongoose.connection;
mongoose.Promise = global.Promise;

require('./api')(app);



module.exports = app;