const mongoose = require('mongoose');

let PlinthsSchema = new mongoose.Schema({
	index: {
		type: Number,
		trim: true
	},
	title: {
		type: String,
		trim: true
	}
});

let Plinths = mongoose.model('Plinths', PlinthsSchema);
module.exports = {Plinths};