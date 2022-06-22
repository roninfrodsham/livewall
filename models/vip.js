const mongoose = require('mongoose');

let VipSchema = new mongoose.Schema({
	type: {
		type: String
	},
	loops: {
		type: Number
	},
	refreshTime: {
		type: Number
	},
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	photo: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	titleImage: {
		type: String,
		required: false,
		trim: true
	},
	sPhoto1: {
		type: String,
		required: false,
		trim: true
	},
	sPhoto2: {
		type: String,
		required: false,
		trim: true
	},
	sPhoto3: {
		type: String,
		required: false,
		trim: true
	}
});

let Vip = mongoose.model('Vip', VipSchema);
module.exports = {Vip};