const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {Globals} = require('./../models/globals');

exports.addGlobals = (req, res) => {
	let body = _.pick(req.body, ['twitter', 'facebook', 'instagram']);
	let globals = new Globals(body);

	globals.save().then((doc) => {
		res.send(doc);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.getGlobals = (req, res) => {
	globalSettings = [];
	Globals.find().then((globals) => {
		globalSettings = globals[0];
		res.render('globals', { title: 'Social Media', globalSettings });
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.updateGlobals = (req, res) => {
	const id = req.params.id;
	let body = _.pick(req.body, ['twitter', 'facebook', 'instagram']);
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Globals.findByIdAndUpdate(id, {$set: body}, {new: true}).then((globals) => {
		if (!globals) {
			return res.status(404).send();
		}
		res.redirect(`/globals`);
	}).catch((e) => {
		res.status(400).send(e);
	});

};