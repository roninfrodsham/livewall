const _ = require('lodash');
const fs = require('fs');
const multer = require('multer');
const {ObjectID} = require('mongodb');
const {Plinths} = require('./../models/plinths');

const uri = process.env.URI;



exports.getData = (req, res) => {
	const id = req.params.id;
	const _id = req.params._id;
	let touchscreenList = [];
	let touchscreenEdit;

	if (_id) {
		findItemById(_id).then((result) => {
			touchscreenEdit = result;

			return getItemList(id);
		}).then((result) => {
			touchscreenList = result;

			res.render('Plinths', { title: `Plinth ${id} Edit title`, touchscreenEdit, touchscreenList, id, _id });
		});
  	
	} else {
		getItemList(id).then((result) => {
			touchscreenList = result;
			res.render('Plinths', { title: `Plinths`, touchscreenEdit, touchscreenList, id });
		}).catch((error) => {
			res.render('Plinths', { title: `Plinths`, touchscreenEdit, touchscreenList, id });
		});
	}
};


const getItemList = () => {
	return new Promise((resolve, reject) => {
		Plinths.find().then((entries) => {
			if(entries.length > 0) {
				touchscreenList = entries.map((entry) => {
					return {
						id: entry.index,
						_id: entry._id,
		        		title: entry.title
		      		};
				});

				resolve(touchscreenList);
			} else {
				reject();
			}

		});
	}).catch(error => reject(error));
};

exports.addItem = (req, res) => {
	let body = _.pick(req.body, ['index','title']);

	const touchscreens = new Plinths({
		index: body.index,
		title: body.title
	});

	touchscreens.save().then((doc) => {
		res.redirect(`/plinths`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.updateItem = (req, res) => {
	const id = req.params.id;
	const _id = req.params._id;
	let body = _.pick(req.body, ['title']);

	const touchscreens = new Plinths({
		title: body.title
	});

	if (!ObjectID.isValid(_id)) {
		return res.status(404).send();
	}

	Plinths.findByIdAndUpdate(_id, {$set: body}, {new: true}).then((entry) => {
		if (!entry) {
			return res.status(404).send();
		}
		res.redirect(`/plinths/${id}/${_id}`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};



exports.deleteItem = (req, res) => {
	const id = req.params.id;
	const _id = req.params._id;

	Plinths.findByIdAndRemove(_id).then((entry) => {
		if (!entry) {
			res.redirect(`/plinths`);
		}
		res.redirect(`/plinths`);
	}).catch((e) => {
		res.redirect(`/plinths`);
	});
};

const findItemById = (_id) => {
	return new Promise((resolve, reject) => {
		Plinths.findOne({_id: _id}).then((entry) => {
			resolve({
				id: entry._id,
	    		title: entry.title
	    });
  	});
	}).catch(error => reject(error));
}