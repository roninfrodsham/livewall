const mongoose = require('mongoose');

let HistorySchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	timestamp: {
		type: Date,
		required: true,
	},
	month: {
		type: Number,
		required: true,
	},
	day: {
		type: Number,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	}
});

let History = mongoose.model('History', HistorySchema);
module.exports = {History};