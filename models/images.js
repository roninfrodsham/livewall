const mongoose = require('mongoose');

let ImagesSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},
	text: {
		type: String,
		trim: true,
	},
	photo: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	}
});

let Images = mongoose.model('Images', ImagesSchema);
module.exports = {Images};