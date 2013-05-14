var mongoose = require('mongoose');
var config = require('../config');

var db = mongoose.createConnection( config.mongodb );

exports.articles = require("./articles").setup( mongoose, db );
exports.config = require("./config").setup( mongoose, db );