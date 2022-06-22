const mongoose = require('mongoose');

let TouchscreensSchema = new mongoose.Schema({
	index: {
		type: Number,
		trim: true
	},
	title: {
		type: String,
		trim: true
	}
});

let Touchscreens = mongoose.model('Touchscreens', TouchscreensSchema);
module.exports = {Touchscreens};