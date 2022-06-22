const {ObjectID} = require('mongodb');

const helpers = require('./../helpers.js');

const {Images} = require('./../models/images');
const {Videos} = require('./../models/videos');

const uri = process.env.URI;
let imageCount = 0;
let videoCount = 0;

exports.getImages = () => {
	return new Promise((resolve, reject) => {

		Images.find().then((items) => {
			images = items.map((item) => {
				return {
					title: item.title,
					text: item.text,
					url: `${uri}/uploads/${item.photo}`
	      };
			});
			resolve(images);
		});

	});
};

exports.getVideos = () => {
	return new Promise((resolve, reject) => {

		Videos.find().then((items) => {
			videos = items.map((item) => {
				return {
					title: item.title,
					path: `${uri}/uploads/${item.video}`
	      };
			});
			resolve(videos);
		});

	});
};

exports.getFeeds = (imagesList, videosList, jsonData) => {

	const promises = [];
	let components = jsonData.data.components;

	return new Promise((resolve, reject) => {

		for(const [i, component] of components.entries()) {
			const name = component.name;

			if (name == 'image') {

				if (!('name' in component.data)) {
					if (imageCount == imagesList.length ) {
						imageCount = 0;
					};
					components[i].data = imagesList[imageCount];
					imageCount++;
				}

			} else if (name == 'mediaPlayer') {

				if (!('name' in component.data)) {
					if (videoCount == videosList.length) {
						videoCount = 0;
					};
					components[i].data = videosList[videoCount];
					videoCount++;
				}

			} else if (name !== 'imageSequence' && name !== 'liveFeed') {
				
				promises[i] = new Promise((resolve, reject) => {
					helpers[component.name]().then((result) => {
						const componentIndex = components.findIndex(x => x.name == component.name);
						components[componentIndex].data = result;
						resolve(result);
					});
				});
				
			}

		};
		
		const pAll = Promise.all(promises).then((values) => {
			resolve(jsonData);
		}).catch((errorMessage) => {
			console.log('Error: ', errorMessage);
		});

	});
};