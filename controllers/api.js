var fs = require('fs');
var models, config;
exports.setup = function( _models, _config ){
  models = _models;
  config = _config;
};

exports.feed = function(req, res){
  function out(  ){
    var query = {};
    if( req.body.key == config.api.key ){
      if( req.body.category != "" ){
        query.category = decodeURIComponent(req.body.category);
      }

	    models.articles.find(query,{},{ limit: 20, sort:{ id: -1 } },function(err,articles){
	      res.send( JSON.stringify( articles ) );
	    });
    }
  }
  return out( );
}

exports.check = function(req, res){
  function out(  ){
    models.config.findOne({ key: "last_update" },function(err,row){
    	if( row ){
    		res.send( row.value );
    	}
    	else{
    		res.send('404');
    	}
      
    });  
  }
  return out( );
}

exports.category = function(req, res){
  function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
  }

  function out(  ){
    models.articles.find({}, 'category' , {'group': 'category'},function(err,categories){
      if( categories ){
        //var string = "";
        var categories_a = new Array();
        categories.forEach( function( row ) {
          if( inArray( row.category, categories_a ) == false ){
            categories_a.push( row.category );
            //string = string + "<item>" + row.category + "</item>" + "\r\n";
          }
        });
        //fs.writeFile("archive.txt", string, function(err) {});
        res.send( JSON.stringify( categories_a ) );
      }
      else{
        res.send('404');
      }
      
    });  
  }
  return out( );
}