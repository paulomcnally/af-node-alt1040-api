var mongoose;
var db;
exports.setup = function(_mongoose,_db){
  mongoose = _mongoose;
  db = _db;


  var schema = mongoose.Schema({
    id: String,
    author: String,
    category: String,
    text: String,
    title: String,
    date: String,
    image: String,
    url: String
  });
  var article = db.model('articles', schema);
  var Data = db.model('articles');
  return Data;
};