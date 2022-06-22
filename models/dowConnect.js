const mongoose = require('mongoose');

let DowConnectSchema = new mongoose.Schema({
	photo: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	}
});

let DowConnect = mongoose.model('DowConnect', DowConnectSchema);
module.exports = {DowConnect};