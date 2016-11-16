var mongoose = require('mongoose'); // load plugin

module.exports = mongoose.model('Todo', {
	text : String
});