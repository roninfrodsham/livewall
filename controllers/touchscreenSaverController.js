const _ = require('lodash');
const fs = require('fs');
const multer = require('multer');
const {ObjectID} = require('mongodb');
const uri = process.env.URI;

const {Touchscreens} = require('./../models/touchscreens');
const {TouchscreenData} = require('./../models/touchscreenData');

const jsonData = {
	landing: require('./../json/screensaver.js')
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

exports.getJsonData = (req, res) => {
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
					item.data = {};
					item.data.url = `${uri}/uploads/touchscreen/${idx}/${data[i].photo}`;

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
					item.data = {};
					item.data.url = `${uri}/uploads/touchscreen/${idx+1}/${data[i].photo}`;

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
				title.data.text = "Touch screen to start";

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
				title.data.text = "Touch screen to start";

				jsonData.push(title);
				resolve(jsonData);
			} else {
				reject('error')
			}
		});


	}).catch(error => reject(error));
};