const mongoose = require('mongoose');

let HeritageSchema = new mongoose.Schema({
	index: {
		type: Number,
		required: true
	},
	photo: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	}
});

let Heritage = mongoose.model('Heritage', HeritageSchema);
module.exports = {Heritage};