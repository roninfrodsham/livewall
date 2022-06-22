const mongoose = require('mongoose');

let TouchscreenDataSchema = new mongoose.Schema({
	index: {
		type: Number,
		trim: true
	},
	title: {
		type: String,
		trim: true
	},
	text: {
		type: String,
		trim: true
	},
	caption: {
		type: String,
		trim: true
	},
	photo: {
		type: String,
		required: true,
		trim: true
	},
	sPhoto1: {
		type: String,
		required: false,
		trim: true
	},
	sPhotoCaption1: {
		type: String,
		required: false,
		trim: true
	},
	sPhoto2: {
		type: String,
		required: false,
		trim: true
	},
	sPhotoCaption2: {
		type: String,
		required: false,
		trim: true
	},
	sPhoto3: {
		type: String,
		required: false,
		trim: true
	},
	sPhotoCaption3: {
		type: String,
		required: false,
		trim: true
	},
	sVideo: {
		type: String,
		required: false,
		trim: true
	},
	sVideoCaption: {
		type: String,
		required: false,
		trim: true
	},
	s360: {
		type: String,
		required: false,
		trim: true
	},
	s360Caption: {
		type: String,
		required: false,
		trim: true
	}
});

let TouchscreenData = mongoose.model('TouchscreenData', TouchscreenDataSchema);
module.exports = {TouchscreenData};