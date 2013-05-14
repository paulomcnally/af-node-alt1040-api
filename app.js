var schedule = require('node-schedule')
  , request = require('request')
  , querystring = require('querystring')
  , http = require('http')
  , fs = require('fs')
  , feed = require("feed-read")
  , express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , mongoose = require('mongoose')
  , crypto = require('crypto')
  , Diffbot = require('diffbot').Diffbot
  , config = require('./config')
  , models = require('./models')
  , controllers = require("./controllers")
  , diffbot = new Diffbot(config.diffbot.key)
  , db = mongoose.createConnection( config.mongodb );

var rule = new schedule.RecurrenceRule();
rule.minute = 50;

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.logger('dev'));
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));


controllers.admin.setup(models,diffbot,crypto);
controllers.api.setup(models,config);

var j = schedule.scheduleJob(rule, function(){
    feed("http://feeds.hipertextual.com/alt1040", function(err, articles) {
      if (err) throw err;
      articles.forEach(function(article){
        controllers.admin.process( article.guid, article.published );
      });
    });
});


app.get('/', controllers.admin.home);
app.post('/api/feed', controllers.api.feed);
app.get('/api/check', controllers.api.check);
app.get('/api/category', controllers.api.category);
app.listen(process.env.VCAP_APP_PORT || 3000);