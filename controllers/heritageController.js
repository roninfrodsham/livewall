const _ = require('lodash');
const multer = require('multer');
const {ObjectID} = require('mongodb');

const {Heritage} = require('./../models/heritage');

const jsonData = {
	heritage1: require('./../json/heritage1.js'),
	heritage2: require('./../json/heritage2.js'),
	heritage3: require('./../json/heritage3.js'),
	heritage4: require('./../json/heritage4.js'),
	heritage5: require('./../json/heritage5.js')
}

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


exports.getHeritage = (req, res) => {
	const id = req.params.id;

	getHeritageData(id, jsonData[`heritage${id}`]).then((response) => {
		res.json(response.data);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.getHeritageFeed = (req, res) => {
	const id = req.params.id;
	const _id = req.params._id;
	let heritageList = [];
	let heritageEdit;

	if (_id) {
		findHeritageById(_id).then((result) => {
			heritageEdit = result;

			return getHeritageList(id);
		}).then((result) => {
			heritageList = result;

			res.render('heritage', { title: `Heritage State ${id} Content`, heritageEdit, heritageList, id, _id });
		});
  	
	} else {
		getHeritageList(id).then((result) => {
			heritageList = result;
			res.render('heritage', { title: `Heritage State ${id}`, heritageEdit, heritageList, id });
		}).catch((error) => {
			res.render('heritage', { title: `Heritage State ${id} Content`, heritageEdit, heritageList, id });
		});
	}
};

exports.addHeritage = (req, res) => {
	const id = req.params.id;
	let body = _.pick(req.body, ['title']);

	const heritage = new Heritage({
		title: `body.title`,
		photo: fileName,
		index: id
	});

	heritage.save().then((doc) => {
		res.redirect(`/heritage/${id}`);
	}).catch((e) => {
		res.status(400).send(e);
	});

};

exports.updateHeritage = (req, res) => {
	const id = req.params.id;
	const _id = req.params._id;
	let body = _.pick(req.body, ['title']);

	if(fileName) {
		console.log('update logo');
		body.photo = fileName;
	}
	
	if (!ObjectID.isValid(_id)) {
		return res.status(404).send();
	}

	Heritage.findByIdAndUpdate(_id, {$set: body}, {new: true}).then((globals) => {
		if (!globals) {
			return res.status(404).send();
		}
		res.redirect(`/heritage/${id}`);
	}).catch((e) => {
		res.status(400).send(e);
	});

};

const getHeritageData = (heritageIndex, jsonData) => {
	return new Promise((resolve, reject) => {
		Heritage.find({'index' : heritageIndex}).sort( { timestamp: 1 } ).limit(6).then((heritages) => {
			if(heritages.length > 0) {
				let components = jsonData.data.components;

				for(const [i, heritage] of heritages.entries()) {
					components[i].data.url = `${uri}/uploads/${heritage.photo}`;
					components[i+6].data.text = heritage.title;
				};
				resolve(jsonData);
			} else {
				reject('error')
			}

		});
	}).catch(error => reject(error));
};

const findHeritageById = (_id) => {
	return new Promise((resolve, reject) => {
		Heritage.findOne({_id: _id}).then((heritage) => {
			resolve({
	      id: heritage._id,
		    title: heritage.title,
		    photo: heritage.photo
	    });
  	});
	}).catch(error => reject(error));
}

const getHeritageList = (id) => {
	return new Promise((resolve, reject) => {
		Heritage.find({'index' : id}).sort( { timestamp: 1 } ).limit(6).then((heritages) => {

			if(heritages.length > 0) {
				heritageList = heritages.map((heritage) => {
					return {
						id: heritage._id,
		        title: heritage.title,
		        photo: heritage.photo
		      };
				});

				resolve(heritageList);
			} else {
				reject();
			}

		});
	}).catch(error => reject(error));
};