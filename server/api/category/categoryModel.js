var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	name:{
		type: String
	}
	
});

module.exports = mongoose.model('category', categorySchema);