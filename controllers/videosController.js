const _ = require('lodash');
const fs = require('fs');
const multer = require('multer');
const {ObjectID} = require('mongodb');

const {Videos} = require('./../models/videos');

const uri = process.env.URI;

let videoCount = 0;

let fileName = '';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
  	const extension = file.mimetype.split('/')[1];
  	fileName = file.fieldname + '-' + Date.now() + '.' + extension;
    cb(null,  fileName);
  }
});

const upload = multer({storage: storage});

exports.uploadVideo = upload.single('video');

exports.videos = (req, res) => {

	Videos.find().then((items) => {
		const videosList = items.map((item) => {
			return {
				id: item._id,
				title: item.title,
				video: item.video
      };
		});
		res.render('videos', { title: 'Videos', videosList });
	}).catch((e) => {
		res.status(400).send(e);
	});

};

exports.getVideo = (req, res) => {
	const id = req.params.id;
	let videoEdit;

	Videos.findOne({'_id' : id}).then((result) => {
		videoEdit = result;
		return getVideoList();
	}).then((result) => {
		videosList = result;
		res.render('videos', { title: 'Videos', videosList, videoEdit });
	});
};

exports.addVideo = (req, res, next) => {
	let body = _.pick(req.body, ['title']);

	let videos = new Videos({
		title: body.title,
		video: fileName
	});

	videos.save().then((doc) => {
		res.redirect('/videos');
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.updateVideo = (req, res) => {
	const id = req.params.id;
	let body = _.pick(req.body, ['title']);

	if(fileName) {
		console.log('update video');
		body.video = fileName;
	}
	
	Videos.findOne({'_id' : id}).then((result) => {
		return result;
	}).then((result) => {

		console.log(body);
		
		fs.unlink(`./public/uploads/${result.video}`, () => {
			console.log('remove video');
		});

		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}

		Videos.findByIdAndUpdate(id, {$set: body}, {new: true}).then((globals) => {
			if (!globals) {
				return res.status(404).send();
			}
			res.redirect(`/videos`);
		}).catch((e) => {
			res.status(400).send(e);
		});	

	});

};

exports.deleteVideo = (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Videos.findByIdAndRemove(id).then((image) => {
		if (!image) {
			return res.status(404).send();
		}
		fs.unlink(`./public/uploads/${image.video}`, () => {
			console.log('removed video');
		});
		res.redirect('/videos');
	}).catch((e) => {
		res.status(400).send(e);
	});
};

const getVideoList = () => {
	return new Promise((resolve, reject) => {
		Videos.find().then((items) => {
			const VideoList = items.map((item) => {
				return {
					id: item._id,
					title: item.title,
					video: item.video
	      };
			});
			resolve(VideoList)
		});
	}).catch(error => reject(error));
};

exports.getMediaPlayerApi = (req, res) => {
	Videos.find().then((items) => {

		console.log(videoCount);

		if (videoCount == items.length ) {
			videoCount = 0;
		};

		res.json({
			name: 'mediaPlayer',
			endPoint: `${uri}/api/mediaplayer`,
			data: {
		    title: items[videoCount].title,
		    path: `${uri}/uploads/${items[videoCount].video}`
		  }
		});

		videoCount++;
		
	}).catch((e) => {
		res.status(400).send(e);
	});
};