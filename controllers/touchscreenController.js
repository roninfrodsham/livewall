const _ = require('lodash');
const fs = require('fs');
const multer = require('multer');
const {ObjectID} = require('mongodb');
const uri = process.env.URI;

const {Touchscreens} = require('./../models/touchscreens');
const {TouchscreenData} = require('./../models/touchscreenData');

const jsonData = {
	landing: require('./../json/touchscreenLanding.js'),
	internal: require('./../json/touchscreenInternal.js')
}







// -------------------------------------
// API

// LANDING JSON
// store the first _id so we can link the titles to these sections too
let btnLinkLeft = "";
let btnLinkRight = "";

const _resolveIndex = function(idx)
{
	// resolve the index passed in to the stored index of data in the DB
	// so we will pass in 1, 2, 3, 4, 5, 6 etc to correspond to the double screen setup
	// but we need to have them resolved to 1, 1, 2, 2, 3, 3
	return Math.ceil(idx/2);
};

exports.getLandingJsonData = (req, res) => {
	const id = req.params.id;

	let idx = _resolveIndex(id);

	// get reference to the json
	let json = jsonData[`landing`];

	// clear the components array as we will be adding to it as we do our queries
	json.data.components = [];

	// setup all promises in an array
	let promises = [];
	promises.push(_getLandingJsonDataContentLeft(idx, json.data.components));
	promises.push(_getLandingJsonDataContentRight(idx, json.data.components));
	promises.push(_getLandingJsonDataTitleLeft(idx, json.data.components));
	promises.push(_getLandingJsonDataTitleRight(idx, json.data.components));

	Promise.all(promises).then((response) => {
		// update the json before returning it
		json.data.components = response[0];
		res.json(json.data);
	}).catch((e) => {
		res.status(400).send(e);
	});
};


const _getLandingJsonDataContentLeft = (idx, jsonData) => {
	return new Promise((resolve, reject) => {
		// now we neeed to find the internal data so we can populate the screens
		TouchscreenData.find({'index' : idx}).limit(9).then((data) => {
			if(data.length > 0) {
				for (var i=0; i<data.length; i++)
				{
					// create object to hold data
					let item = {};
					item.templateId = "leftContentButton" + (i+1);
					item.btnScreenID = `${uri}/api/touchscreen/${idx}/${data[i]._id}`;
					item.imageUrl = `${uri}/uploads/touchscreen/${idx}/${data[i].photo}`;

					if (i == 0) btnLinkLeft = item.btnScreenID;

					jsonData.push(item);
				}
				resolve(jsonData);
			} else {
				reject('error')
			}
		});

	}).catch(error => reject(error));
};

const _getLandingJsonDataContentRight = (idx, jsonData) => {
	return new Promise((resolve, reject) => {
		TouchscreenData.find({'index' : idx+1}).limit(9).then((data) => {
			if(data.length > 0) {
				for (var i=0; i<data.length; i++)
				{
					// create object to hold data
					let item = {};
					item.templateId = "rightContentButton" + (i+1);
					item.btnScreenID = `${uri}/api/touchscreen/${idx+1}/${data[i]._id}`;
					item.imageUrl = `${uri}/uploads/touchscreen/${idx+1}/${data[i].photo}`;

					if (i == 0) btnLinkRight = item.btnScreenID;

					jsonData.push(item);
				}
				resolve(jsonData);
			} else {
				reject('error')
			}
		});


	}).catch(error => reject(error));
};

const _getLandingJsonDataTitleLeft = (idx, jsonData) => {
	return new Promise((resolve, reject) => {
		Touchscreens.find({'index' : idx}).limit(1).then((data) => {
			if(data.length > 0) {
				// create object to hold data
				// left hand title
				let title = {};
				title.templateId = "leftTextButton";
				title.btnScreenID = btnLinkLeft;
				title.data = {};
				title.data.text = data[0].title;

				jsonData.push(title);
				resolve(jsonData);
			} else {
				reject('error')
			}
		});


	}).catch(error => reject(error));
};

const _getLandingJsonDataTitleRight = (idx, jsonData) => {
	return new Promise((resolve, reject) => {
		Touchscreens.find({'index' : idx+1}).limit(1).then((data) => {
			if(data.length > 0) {
				// create object to hold data
				// right hand title
				let title = {};
				title.templateId = "rightTextButton";
				title.btnScreenID = btnLinkRight;
				title.data = {};
				title.data.text = data[0].title;

				jsonData.push(title);
				resolve(jsonData);
			} else {
				reject('error')
			}
		});


	}).catch(error => reject(error));
};


// INTERNAL JSON
exports.getInternalJsonData = (req, res) => {
	const id = req.params.id;
	const _id = req.params._id;
	
	if (!ObjectID.isValid(_id)) {
		return res.status(404).send();
	}

	// get reference to the json
	let json = jsonData[`internal`];

	// clear the components array as we will be adding to it as we do our queries
	json.data.components = [];

	_getInternalJsonData(id, _id, json.data.components).then((response) => {
		res.json(json.data);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

const _getInternalJsonData = (idx, id, jsonData) => {
	return new Promise((resolve, reject) => {
		// now we neeed to find the internal data so we can populate the screens
		TouchscreenData.find({'index' : idx}).limit(9).then((data) => {
			if(data.length > 0) {
				let contentButtonCount = 1;
				for (var i=0; i<data.length; i++)
				{
					// check if this data has the matching _id for the data requested
					if (data[i]._id == id)
					{
						// check the data coming back from the query

						// MAIN CONTENT
						let item = {};

						item.templateId = "homeButton";
						item.btnScreenID = `${uri}/api/touchscreen/${_resolveIndex(idx)}`;
						item.data = {};
						item.data.text = data[i].title;
						jsonData.push(item);

						item = {};
						item.templateId = "mainImage";
						item.data = {};
						item.data.url = `${uri}/uploads/touchscreen/${idx}/${data[i].photo}`;
						jsonData.push(item);

						item = {};
						item.templateId = "mainImageCaption";
						item.data = {};
						item.data.text = data[i].caption;
						jsonData.push(item);

						item = {};
						item.templateId = "bodyText";
						item.data = {};
						item.data.text = data[i].text;
						jsonData.push(item);


						// SUPPORTING CONTENT
						if (data[i].sPhoto1 != "")
						{
							// create object to hold data
							item = {};
							item.templateId = "popupImage1";
							item.data = {};
							item.data.imageUrl = `${uri}/uploads/touchscreen/${idx}/${data[i].sPhoto1}`;
							item.data.caption = data[i].sPhotoCaption1;
							jsonData.push(item);
						}
						// check the data coming back from the query
						if (data[i].sPhoto2 != "")
						{
							// create object to hold data
							item = {};
							item.templateId = "popupImage2";
							item.data = {};
							item.data.imageUrl = `${uri}/uploads/touchscreen/${idx}/${data[i].sPhoto2}`;
							item.data.caption = data[i].sPhotoCaption2;
							jsonData.push(item);
						}
						// check the data coming back from the query
						if (data[i].sPhoto3 != "")
						{
							// create object to hold data
							item = {};
							item.templateId = "popupImage3";
							item.data = {};
							item.data.imageUrl = `${uri}/uploads/touchscreen/${idx}/${data[i].sPhoto3}`;
							item.data.caption = data[i].sPhotoCaption3;
							jsonData.push(item);
						}
						// check the data coming back from the query
						if (data[i].sVideo != "")
						{
							// create object to hold data
							item = {};
							item.templateId = "popupVideo";
							item.data = {};
							item.data.videoUrl = `${uri}/uploads/touchscreen/${idx}/${data[i].sVideo}`;
							item.data.caption = data[i].sVideoCaption;
							jsonData.push(item);
						}
						// check the data coming back from the query
						if (data[i].s360 != "")
						{
							// create object to hold data
							item = {};
							item.templateId = "popupVideo360";
							item.data = {};
							item.data.videoUrl = `${uri}/uploads/touchscreen/${idx}/${data[i].s360}`;
							item.data.caption = data[i].s360Caption;
							jsonData.push(item);
						}
					}
					else
					{
						// create object to hold data
						let item = {};
						item.templateId = "contentButton" + contentButtonCount;
						item.btnScreenID = `${uri}/api/touchscreen/${idx}/${data[i]._id}`;
						item.imageUrl = `${uri}/uploads/touchscreen/${idx}/${data[i].photo}`;

						if (i == 0) btnLinkLeft = item.btnScreenID;

						jsonData.push(item);
						contentButtonCount++;
					}
				}
				resolve(jsonData);
			} else {
				reject('error')
			}
		});

	}).catch(error => reject(error));
};







// -------------------------------------
// CMS

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
	const id = req.params.id;
    cb(null, `./public/uploads/touchscreen/${id}/`);
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
	const id = req.params.id;
	const _id = req.params._id;
	let artefactList = [];
	let artefactEdit;
	let showAddForm = true;

	if (_id) {
		findItemById(_id).then((result) => {
			artefactEdit = result;

			return getItemList(id);
		}).then((result) => {
			artefactList = result;

			res.render('Touchscreen', { title: `Touchscreen ${id} Edit Artefact`, showAddForm, artefactEdit, artefactList, id, _id });
		});
  	
	} else {
		getItemList(id).then((result) => {
			artefactList = result;
			res.render('Touchscreen', { title: `Touchscreen ${id}`, showAddForm, artefactEdit, artefactList, id });
		}).catch((error) => {
			res.render('Touchscreen', { title: `Touchscreen ${id}`, showAddForm, artefactEdit, artefactList, id });
		});
	}
};

exports.getDataStandard = (req, res) => {
	const id = req.params.id;
	let artefactList = [];
	let showAddForm = false;

	getItemList(id).then((result) => {
		artefactList = result;
		res.render('Touchscreen', { title: `Touchscreen ${id}`, showAddForm, artefactList, id });
	}).catch((error) => {
		res.render('Touchscreen', { title: `Touchscreen ${id}`, showAddForm, artefactList, id });
	});
};


exports.addItem = (req, res) => {
	const id = req.params.id;
	let body = _.pick(req.body, ['title', 'caption', 'text', 'sPhotoCaption1', 'sPhotoCaption2', 'sPhotoCaption3', 'sVideoCaption', 's360Caption']);

	const touchscreen = new TouchscreenData({
		index: id,
		title: body.title,
		text: body.text,
		caption: body.caption,
		sPhotoCaption1: body.sPhotoCaption1,
		sPhotoCaption2: body.sPhotoCaption2,
		sPhotoCaption3: body.sPhotoCaption3,
		sVideoCaption: body.sVideoCaption,
		s360Caption: body.s360Caption,
		photo: getFileNameFromFiles('photo', req.files),
		sPhoto1: getFileNameFromFiles('sPhoto1', req.files),
		sPhoto2: getFileNameFromFiles('sPhoto2', req.files),
		sPhoto3: getFileNameFromFiles('sPhoto3', req.files),
		sVideo: getFileNameFromFiles('sVideo', req.files),
		s360: getFileNameFromFiles('s360', req.files)
	});

	touchscreen.save().then((doc) => {
		res.redirect(`/touchscreen/${id}`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.updateItem = (req, res) => {
	const id = req.params.id;
	const _id = req.params._id;
	let body = _.pick(req.body, ['title', 'caption', 'text', 'sPhotoCaption1', 'sPhotoCaption2', 'sPhotoCaption3', 'sVideoCaption', 's360Caption', 'origPhoto', 'origsPhoto1', 'origsPhoto2', 'origsPhoto3', 'origsVideo', 'origs360']);

	let photo = getFileNameFromFiles('photo', req.files);
	let sPhoto1 = getFileNameFromFiles('sPhoto1', req.files);
	let sPhoto2 = getFileNameFromFiles('sPhoto2', req.files);
	let sPhoto3 = getFileNameFromFiles('sPhoto3', req.files);
	let sVideo = getFileNameFromFiles('sVideo', req.files);
	let s360 = getFileNameFromFiles('s360', req.files);

	if (photo != "")
	{
		body.photo = photo;
		fs.unlink(`./public/uploads/touchscreen/${id}/${body.origPhoto}`, () => {
			console.log(`removed photo ./public/uploads/touchscreen/${id}/${body.origPhoto}`);
		});
	}
	if (sPhoto1 != "")
	{
		body.sPhoto1 = sPhoto1;
		fs.unlink(`./public/uploads/touchscreen/${id}/${body.origsPhoto1}`, () => {
			console.log('removed sPhoto1');
		});
	}
	if (sPhoto2 != "")
	{
		body.sPhoto2 = sPhoto2;
		fs.unlink(`./public/uploads/touchscreen/${id}/${body.origsPhoto2}`, () => {
			console.log('removed sPhoto2');
		});
	}
	if (sPhoto3 != "")
	{
		body.sPhoto3 = sPhoto3;
		fs.unlink(`./public/uploads/touchscreen/${id}/${body.origsPhoto3}`, () => {
			console.log('removed sPhoto3');
		});
	}
	if (sVideo != "")
	{
		body.sVideo = sVideo;
		fs.unlink(`./public/uploads/touchscreen/${id}/${body.origsVideo}`, () => {
			console.log('removed sVideo');
		});
	}
	if (s360 != "")
	{
		body.s360 = s360;
		fs.unlink(`./public/uploads/touchscreen/${id}/${body.origs360}`, () => {
			console.log('removed s360');
		});
	}

	
	if (!ObjectID.isValid(_id)) {
		return res.status(404).send();
	}

	TouchscreenData.findByIdAndUpdate(_id, {$set: body}, {new: true}).then((entry) => {
		if (!entry) {
			return res.status(404).send();
		}
		res.redirect(`/touchscreen/${id}/${_id}`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};



exports.deleteItem = (req, res) => {
	const id = req.params.id;
	const _id = req.params._id;

	TouchscreenData.findByIdAndRemove(_id).then((entry) => {
		if (!entry) {
			res.redirect(`/touchscreen/${id}`);
		}
		fs.unlink(`./public/uploads/touchscreen/${id}/${entry.photo}`, () => {
			console.log('removed photo');
		});
		fs.unlink(`./public/uploads/touchscreen/${id}/${entry.sPhoto1}`, () => {
			console.log('removed sPhoto1');
		});
		fs.unlink(`./public/uploads/touchscreen/${id}/${entry.sPhoto2}`, () => {
			console.log('removed sPhoto2');
		});
		fs.unlink(`./public/uploads/touchscreen/${id}/${entry.sPhoto3}`, () => {
			console.log('removed sPhoto3');
		});
		fs.unlink(`./public/uploads/touchscreen/${id}/${entry.sVideo}`, () => {
			console.log('removed sVideo');
		});
		fs.unlink(`./public/uploads/touchscreen/${id}/${entry.s360}`, () => {
			console.log('removed s360');
		});
		res.redirect(`/touchscreen/${id}`);
	}).catch((e) => {
		res.redirect(`/touchscreen/${id}`);
	});
};



const findItemById = (_id) => {
	return new Promise((resolve, reject) => {
		TouchscreenData.findOne({_id: _id}).then((entry) => {
			resolve({
				id: entry._id,
	    		title: entry.title,
	    		photo: entry.photo,
	    		text: entry.text,
	    		caption: entry.caption,
	    		sPhoto1: entry.sPhoto1,
	    		sPhotoCaption1: entry.sPhotoCaption1,
	    		sPhoto2: entry.sPhoto2,
	    		sPhotoCaption2: entry.sPhotoCaption2,
	    		sPhoto3: entry.sPhoto3,
	    		sPhotoCaption3: entry.sPhotoCaption3,
	    		sVideo: entry.sVideo,
	    		sVideoCaption: entry.sVideoCaption,
	    		s360: entry.s360,
	    		s360Caption: entry.s360Caption
	    });
  	});
	}).catch(error => reject(error));
}

const getItemList = (id) => {
	return new Promise((resolve, reject) => {
		TouchscreenData.find({'index' : id}).sort( { timestamp: 1 } ).limit(9).then((entries) => {

			if(entries.length > 0) {
				artefactList = entries.map((entry) => {
					return {
						id: entry._id,
		        		title: entry.title,
		        		photo: entry.photo,
		        		text: entry.text,
		        		caption: entry.caption,
		        		sPhoto1: entry.sPhoto1,
		        		sPhotoCaption1: entry.sPhotoCaption1,
		        		sPhoto2: entry.sPhoto2,
		        		sPhotoCaption2: entry.sPhotoCaption2,
		        		sPhoto3: entry.sPhoto3,
		        		sPhotoCaption3: entry.sPhotoCaption3,
		        		sVideo: entry.sVideo,
		        		sVideoCaption: entry.sVideoCaption,
		        		s360: entry.s360,
		        		s360Caption: entry.s360Caption
		      		};
				});

				resolve(artefactList);
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