const _ = require('lodash');
const fs = require('fs');
const multer = require('multer');
const {ObjectID} = require('mongodb');
const uri = process.env.URI;

const {Plinths} = require('./../models/plinths');
const {PlinthData} = require('./../models/plinthData');

const jsonData = {
	landing: require('./../json/screensaver.js')
}







// -------------------------------------
// API

exports.getJsonData = (req, res) => {
	const id = req.params.id;

	// get reference to the json
	let json = jsonData[`landing`];

	// clear the components array as we will be adding to it as we do our queries
	json.data.components = [];

	// setup all promises in an array
	let promises = [];
	promises.push(_getLandingJsonDataContent(id, json.data.components));
	promises.push(_getLandingJsonDataTitle(id, json.data.components));

	Promise.all(promises).then((response) => {
		// update the json before returning it
		json.data.components = response[0];
		res.json(json.data);
	}).catch((e) => {
		res.status(400).send(e);
	});
};


const _getLandingJsonDataContent = (idx, jsonData) => {
	return new Promise((resolve, reject) => {
		// now we neeed to find the internal data so we can populate the screens
		PlinthData.find({'index' : idx}).limit(9).then((data) => {
			if(data.length > 0) {
				for (var i=0; i<data.length; i++)
				{
					// create object to hold data
					let item = {};
					item.templateId = "leftContentButton" + (i+1);
					item.data = {};
					item.data.url = `${uri}/uploads/plinth/${idx}/${data[i].photo}`;

					jsonData.push(item);
				}
				resolve(jsonData);
			} else {
				reject('error')
			}
		});

	}).catch(error => reject(error));
};

const _getLandingJsonDataTitle = (idx, jsonData) => {
	return new Promise((resolve, reject) => {
		Plinths.find({'index' : idx}).limit(1).then((data) => {
			if(data.length > 0) {
				// create object to hold data
				// left hand title
				let title = {};
				title.templateId = "leftTextButton";
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