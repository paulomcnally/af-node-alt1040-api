var models, diffbot, crypto;
exports.setup = function( _models, _diffbot, _crypto ){
  models = _models;
  diffbot = _diffbot;
  crypto = _crypto;
};

exports.home = function( req, res ){
  function out(  ){
    res.render('index',{ title : 'Home' } );
  }
  return out( );
}



exports.process = function( url, date ){

  function getId( rss_date ){
    return new Date(rss_date).toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/[A-Za-z$-]/g, "").replace(/\s/,'').replace(/:/,'').replace(/:/,'');
  }
  
  function out(  ){
    if( url != "" ){

      models.articles.findOne({ url: url },function(err,article_row){
        if( article_row ){
          console.log( 'Exist: ' + url);
        }
        else{
          diffbot.article({uri: url }, function(err, response) {



              response.id = getId( date );

              if (response.media){
                if( response.media[0].type == "image" ){
                  response.image = encodeURI(response.media[0].link);
                }
              }
              else{
                response.image = "";
              }

              var string_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

              var last_update_key = "last_update";
              var last_update_category_key = crypto.createHash('md5').update(response.category).digest("hex")+"_last_update";

              models.config.findOne({ key: last_update_category_key },function(err,data){
                var string_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                if( data ){
                  models.config.update({ key: last_update_category_key }, { $set: { value: string_date }}).exec();
                }
                else{
                  var config = new models.config;
                  config.key = last_update_category_key;
                  config.value = string_date;
                  config.save(function(err){
                    if(!err){
            
                    }
                  });
                }
              });




              var row = new models.articles;
              row.author = response.author;
              row.category = response.category;
              row.text = response.text.replace(/'/g, '\"');
              row.title = response.title.replace(/'/g, '\"');
              row.date = response.date;
              row.image = response.image;
              row.url = response.url;
              row.id = response.id;

              row.save(function(err){
                if(!err){
                  models.config.findOne({ key: last_update_key },function(err,data){
                    if( data ){
                      models.config.update({ key: last_update_key }, { $set: { value: string_date }}).exec();
                      console.log( 'last_update updated: ' + string_date );
                    }
                    else{
                      var config = new models.config;
                      config.key = last_update_key;
                      config.value = string_date;
                      config.save(function(err){
                         if(!err){
                          console.log( 'last_update inserted: ' + string_date );
                         }
                      });
                    }

                  });
                }
              });

          });
        }
      });
    }
    else{
      console.log( 'url is empty' );
    }
  }
  return out( );
}