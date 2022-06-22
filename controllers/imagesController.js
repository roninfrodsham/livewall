const _ = require('lodash');
const fs = require('fs');
const multer = require('multer');
const {ObjectID} = require('mongodb');

const {Images} = require('./../models/images');

const uri = process.env.URI;

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

exports.uploadPhoto = upload.single('photo');

exports.images = (req, res) => {
	Images.find().then((items) => {
		const imagesList = items.map((item) => {
			return {
				id: item._id,
				title: item.title,
				photo: item.photo
      };
		});
		res.render('images', { title: 'Images', imagesList });
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.getImage = (req, res) => {
	const id = req.params.id;
	let imageEdit;

	Images.findOne({'_id' : id}).then((result) => {
		imageEdit = result;
		return getImageList();
	}).then((result) => {
		imagesList = result;
		res.render('images', { title: 'Images', imagesList, imageEdit });
	});
};

exports.addImage = (req, res, next) => {
	let body = _.pick(req.body, ['title', 'text']);

	let images = new Images({
		title: body.title,
		text: body.text,
		photo: fileName
	});

	images.save().then((doc) => {
		res.redirect('/images');
	}).catch((e) => {
		res.status(400).send(e);
	});

};

exports.updateImage = (req, res) => {
	const id = req.params.id;
	let body = _.pick(req.body, ['title', 'text']);

	if(fileName) {
		console.log('update photo');
		body.photo = fileName;
	}
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Images.findOne({'_id' : id}).then((result) => {
		return result;
	}).then((result) => {
		//console.log('Testing', result);
		//console.log('Body', body);
		
		fs.unlink(`./public/uploads/${result.photo}`, () => {
			console.log('remove video');
		});

		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}

		Images.findByIdAndUpdate(id, {$set: body}, {new: true}).then((globals) => {
			if (!globals) {
				return res.status(404).send();
			}
			res.redirect(`/images`);
		}).catch((e) => {
			res.status(400).send(e);
		});

	});

};

exports.deleteImage = (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Images.findByIdAndRemove(id).then((image) => {
		if (!image) {
			return res.status(404).send();
		}

		fs.unlink(`./public/uploads/${image.photo}`, () => {
			console.log('removed video');
		});

		res.redirect('/images');
	}).catch((e) => {
		res.status(400).send(e);
	});
};

const getImageList = () => {
	return new Promise((resolve, reject) => {
		Images.find().then((items) => {
			const ImageList = items.map((item) => {
				return {
					id: item._id,
					title: item.title,
					text: item.text,
					photo: item.photo
	      };
			});
			resolve(ImageList)
		});
	}).catch(error => reject(error));
};