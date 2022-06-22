const _ = require('lodash');
const fs = require('fs');
const multer = require('multer');
const {ObjectID} = require('mongodb');
const uri = process.env.URI;

const {DowConnect} = require('./../models/dowConnect');







// -------------------------------------
// API

exports.getApi = (req, res) => {
  _getDataApi().then((result) => {
    res.json({
      name: 'dowconnect',
      endPoint: `${uri}/api/dowconnect`,
      data: result
    });
  });
};

exports.getDataApi = () => {
  return new Promise((resolve, reject) => {
    _getDataApi().then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });
  });
};

const _getDataApi = () => {
	return new Promise((resolve, reject) => {
		DowConnect.find().sort( { timestamp: 1 } ).then((entries) => {
			const list = entries.map((entry) => {
				return {
					image: `${uri}/uploads/dowconnect/${entry.photo}`
				};
			});

			resolve({
				amount: list.length,
				list: list
			});
		});
	});
};







// -------------------------------------
// CMS

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
	const id = req.params.id;
    cb(null, `./public/uploads/dowconnect/`);
  },
  filename: function (req, file, cb) {
  	const extension = file.mimetype.split('/')[1];
  	const fileName = file.fieldname + '-' + Date.now() + '.' + extension;
    cb(null,  fileName);
  }
});
const upload = multer({storage: storage});
exports.uploadMedia = upload.any();


exports.getData = (req, res) => {
	const _id = req.params._id;
	let itemList = [];
	let itemEdit;

	if (_id) {
		findItemById(_id).then((result) => {
			itemEdit = result;

			return getItemList();
		}).then((result) => {
			itemList = result;

			res.render('DowConnect', { title: `Dow Connect`, itemEdit, itemList, _id });
		});
  	
	} else {
		getItemList().then((result) => {
			itemList = result;
			res.render('DowConnect', { title: `Dow Connect`, itemEdit, itemList });
		}).catch((error) => {
			res.render('DowConnect', { title: `Dow Connect`, itemEdit, itemList });
		});
	}
};


exports.addItem = (req, res) => {
	let body = _.pick(req.body, []);

	const dowconnect = new DowConnect({
		photo: getFileNameFromFiles('photo', req.files)
	});

	dowconnect.save().then((doc) => {
		res.redirect(`/dowconnect`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.updateItem = (req, res) => {
	const _id = req.params._id;
	let body = _.pick(req.body, ['origPhoto']);
	let photo = getFileNameFromFiles('photo', req.files);

	if (photo != "")
	{
		body.photo = photo;
		fs.unlink(`./public/uploads/dowconnect/${body.origPhoto}`, () => {
			console.log(`removed photo ./public/uploads/dowconnect/${body.origPhoto}`);
		});
	}

	
	if (!ObjectID.isValid(_id)) {
		return res.status(404).send();
	}

	DowConnect.findByIdAndUpdate(_id, {$set: body}, {new: true}).then((entry) => {
		if (!entry) {
			return res.status(404).send();
		}
		res.redirect(`/dowconnect`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};



exports.deleteItem = (req, res) => {
	const _id = req.params._id;

	DowConnect.findByIdAndRemove(_id).then((entry) => {
		if (!entry) {
			res.redirect(`/dowconnect`);
		}
		fs.unlink(`./public/uploads/dowconnect/${entry.photo}`, () => {
			console.log('removed photo');
		});
		res.redirect(`/dowconnect`);
	}).catch((e) => {
		res.redirect(`/dowconnect`);
	});
};



const findItemById = (_id) => {
	return new Promise((resolve, reject) => {
		DowConnect.findOne({_id: _id}).then((entry) => {
			resolve({
				id: entry._id,
	    		photo: entry.photo
	    });
  	});
	}).catch(error => reject(error));
}

const getItemList = () => {
	return new Promise((resolve, reject) => {
		DowConnect.find().sort( { timestamp: 1 } ).then((entries) => {

			if(entries.length > 0) {
				itemList = entries.map((entry) => {
					return {
						id: entry._id,
		        		photo: entry.photo
		      		};
				});

				resolve(itemList);
			} else {
				reject();
			}

		});
	}).catch(error => reject(error));
};

function getFileNameFromFiles(s, files)
{
	if (files == null || files == undefined) return "";
	for (var i=0; i<files.length; i++) if (files[i].fieldname.includes(s)) return files[i].filename;
	return "";
}