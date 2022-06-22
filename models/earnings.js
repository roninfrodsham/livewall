const mongoose = require('mongoose');

let EarningsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	results: {
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

let Earnings = mongoose.model('Earnings', EarningsSchema);
module.exports = {Earnings};