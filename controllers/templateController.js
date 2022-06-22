const {ObjectID} = require('mongodb');
const helpers = require('./../helpers.js');
const feeds = require('./../helpers/feeds.js');

const jsonData = {
  template1: require('./../json/template1.js'),
  template2: require('./../json/template2.js'),
  template3: require('./../json/template3.js'),
  template4: require('./../json/template4.js'),
  template5: require('./../json/template5.js'),
  template6: require('./../json/template6.js'),
  template7: require('./../json/template7.js'),
  template8: require('./../json/template8.js'),
  template9: require('./../json/template9.js'),
  template10: require('./../json/template10.js'),
  template11: require('./../json/template11.js'),
  template12: require('./../json/template12.js')
}

let imagesList;
let videosList;

exports.getTemplate = (req, res) => {
  const id = req.params.id;
  getData(jsonData[`template${id}`]).then((result) => {
    res.json(result.data);
  }).catch((e) => {
    res.json(e);
  });
};

const getData = (data) => {

	return new Promise((resolve, reject) => {

		imagesList = [];
		videosList = [];

		const images = feeds.getImages().then((result) => {
			imagesList = result;
		});
		const videos = feeds.getVideos().then((result) => {
			videosList = result;
		});

		Promise.all([images, videos]).then((values) => {
			feeds.getFeeds(imagesList, videosList, data).then((result) => {
				resolve(result);
			});
		}).catch((errorMessage) => {
			console.log('Error: ', errorMessage);
		});

	});

};