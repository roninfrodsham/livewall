const mongoose = require('mongoose');

let VideosSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	video: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	}
});

let Videos = mongoose.model('Videos', VideosSchema);
module.exports = {Videos};