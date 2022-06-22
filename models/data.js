const mongoose = require('mongoose');

let DataSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	jsonData: {
		type: Array,
		required: true,
	},
	timestamp: {
		type: Date,
	}
});

let Data = mongoose.model('Data', DataSchema);
module.exports = {Data};