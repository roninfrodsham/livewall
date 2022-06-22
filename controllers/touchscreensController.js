const _ = require('lodash');
const fs = require('fs');
const multer = require('multer');
const {ObjectID} = require('mongodb');
const {Touchscreens} = require('./../models/touchscreens');

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

			res.render('Touchscreens', { title: `Touchscreen ${id} Edit title`, touchscreenEdit, touchscreenList, id, _id });
		});
  	
	} else {
		getItemList(id).then((result) => {
			touchscreenList = result;
			res.render('Touchscreens', { title: `Touchscreens`, touchscreenEdit, touchscreenList, id });
		}).catch((error) => {
			res.render('Touchscreens', { title: `Touchscreens`, touchscreenEdit, touchscreenList, id });
		});
	}
};


const getItemList = () => {
	return new Promise((resolve, reject) => {
		Touchscreens.find().then((entries) => {
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

	const touchscreens = new Touchscreens({
		index: body.index,
		title: body.title
	});

	touchscreens.save().then((doc) => {
		res.redirect(`/touchscreens`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.updateItem = (req, res) => {
	const id = req.params.id;
	const _id = req.params._id;
	let body = _.pick(req.body, ['title']);

	const touchscreens = new Touchscreens({
		title: body.title
	});

	if (!ObjectID.isValid(_id)) {
		return res.status(404).send();
	}

	Touchscreens.findByIdAndUpdate(_id, {$set: body}, {new: true}).then((entry) => {
		if (!entry) {
			return res.status(404).send();
		}
		res.redirect(`/touchscreens/${id}/${_id}`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};



exports.deleteItem = (req, res) => {
	const id = req.params.id;
	const _id = req.params._id;

	Touchscreens.findByIdAndRemove(_id).then((entry) => {
		if (!entry) {
			res.redirect(`/touchscreens`);
		}
		res.redirect(`/touchscreens`);
	}).catch((e) => {
		res.redirect(`/touchscreens`);
	});
};

const findItemById = (_id) => {
	return new Promise((resolve, reject) => {
		Touchscreens.findOne({_id: _id}).then((entry) => {
			resolve({
				id: entry._id,
	    		title: entry.title
	    });
  	});
	}).catch(error => reject(error));
}