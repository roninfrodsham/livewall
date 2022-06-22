const mongoose = require('mongoose');

let GlobalsSchema = new mongoose.Schema({
	twitter: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	facebook: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	instagram: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	weather: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	}
});

let Globals = mongoose.model('Globals', GlobalsSchema);
module.exports = {Globals};