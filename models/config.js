var mongoose;
var db;
exports.setup = function(_mongoose,_db){
  mongoose = _mongoose;
  db = _db;
  var schema = mongoose.Schema({ 
    key: String,
    value: String
  });
  var article = db.model('config', schema);
  var Data = db.model('config');
  return Data;
};