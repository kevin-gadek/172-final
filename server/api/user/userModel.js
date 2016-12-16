var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
	trim: true
  },
  address: {
	  type: String,
	  required: true,
	  trim: true
  }
});
module.exports = mongoose.model('user', UserSchema);

