const mongoose = require('mongoose');

let HolidaysSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	timestamp: {
		type: Date,
		required: true,
	}
});

let Holidays = mongoose.model('Holidays', HolidaysSchema);
module.exports = {Holidays};