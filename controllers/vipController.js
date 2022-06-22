const _ = require('lodash');
const multer = require('multer');
const {ObjectID} = require('mongodb');
const fs = require('fs');

const {Vip} = require('./../models/vip');

const vipData = require('./../json/vip.js');

const uri = process.env.URI;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/uploads/vip/`);
  },
  filename: function (req, file, cb) {
  	const extension = file.mimetype.split('/')[1];
  	const fileName = file.fieldname + '-' + Date.now() + '.' + extension;
    cb(null,  fileName);
  }
});
const upload = multer({storage: storage});
exports.uploadMedia = upload.any();


let vipGlobals;

exports.getVipApi = (req, res) => {
	getVipFeed().then((result) => {
		res.json(result);
	});
};

exports.getVip = (req, res) => {
	const id = req.params.id;
	let vipEdit;

	Vip.findOne({'_id' : id}).then((result) => {
		vipEdit = result;
		return getVipList();
	}).then((result) => {
		vipList = result;
		res.render('vip', { title: 'VIP', vipList, vipEdit });
	});
};

exports.vip = (req, res) => {
	vipGlobals = null;

	Vip.find().then((items) => {
		const vipList = _getVipList(items);

		res.render('vip', { title: 'VIP', vipGlobals, vipList });
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.addVip = (req, res) => {
	let body = _.pick(req.body, ['title']);
	
	const vip = new Vip({
		title: body.title,
		photo: getFileNameFromFiles('photo', req.files),
		titleImage: getFileNameFromFiles('titleImage', req.files),
		sPhoto1: getFileNameFromFiles('sPhoto1', req.files),
		sPhoto2: getFileNameFromFiles('sPhoto2', req.files),
		sPhoto3: getFileNameFromFiles('sPhoto3', req.files)
	});

	vip.save().then((doc) => {
		res.redirect(`/vip`);
	}).catch((e) => {
		res.status(400).send(e);
	});

};

exports.updateGlobals = (req, res) => {
	const id = req.params.id;
	let body = _.pick(req.body, ['globalTitle', 'globalLoops', 'globalRefreshTime']);
	let titleImage = getFileNameFromFiles('titleImage', req.files);
	let data = {};
	data.title = body.globalTitle;
	data.loops = body.globalLoops;
	data.refreshTime = body.globalRefreshTime;

	if (titleImage != "")
	{
		data.titleImage = titleImage;
		fs.unlink(`./public/uploads/vip/${body.origTitleImage}`, () => {
			console.log('removed titleImage');
		});
	}

	
	Vip.findByIdAndUpdate(id, {$set: data}, {new: true}).then((globals) => {
		if (!globals) {
			return res.status(404).send();
		}
		res.redirect(`/vip`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.updateVip = (req, res) => {
	const id = req.params.id;
	let body = _.pick(req.body, ['title']);

	let photo = getFileNameFromFiles('photo', req.files);
	let titleImage = getFileNameFromFiles('titleImage', req.files);
	let sPhoto1 = getFileNameFromFiles('sPhoto1', req.files);
	let sPhoto2 = getFileNameFromFiles('sPhoto2', req.files);
	let sPhoto3 = getFileNameFromFiles('sPhoto3', req.files);

	if (photo != "")
	{
		body.photo = photo;
		fs.unlink(`./public/uploads/vip/${body.origPhoto}`, () => {
			console.log(`removed photo ./public/uploads/vip/${body.origPhoto}`);
		});
	}
	if (titleImage != "")
	{
		body.titleImage = titleImage;
		fs.unlink(`./public/uploads/vip/${body.origTitleImage}`, () => {
			console.log('removed titleImage');
		});
	}
	if (sPhoto1 != "")
	{
		body.sPhoto1 = sPhoto1;
		fs.unlink(`./public/uploads/vip/${body.origsPhoto1}`, () => {
			console.log('removed sPhoto1');
		});
	}
	if (sPhoto2 != "")
	{
		body.sPhoto2 = sPhoto2;
		fs.unlink(`./public/uploads/vip/${body.origsPhoto2}`, () => {
			console.log('removed sPhoto2');
		});
	}
	if (sPhoto3 != "")
	{
		body.sPhoto3 = sPhoto3;
		fs.unlink(`./public/uploads/vip/${body.origsPhoto3}`, () => {
			console.log('removed sPhoto3');
		});
	}
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	
	Vip.findByIdAndUpdate(id, {$set: body}, {new: true}).then((globals) => {
		if (!globals) {
			return res.status(404).send();
		}
		res.redirect(`/vip`);
	}).catch((e) => {
		res.status(400).send(e);
	});

};

exports.deleteVip = (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Vip.findByIdAndRemove(id).then((entry) => {
		if (!entry) {
			return res.status(404).send();
		}
		fs.unlink(`./public/uploads/vip/${entry.photo}`, () => {
			console.log('removed photo');
		});
		fs.unlink(`./public/uploads/vip/${entry.sPhoto1}`, () => {
			console.log('removed sPhoto1');
		});
		fs.unlink(`./public/uploads/vip/${entry.sPhoto2}`, () => {
			console.log('removed sPhoto2');
		});
		fs.unlink(`./public/uploads/vip/${entry.sPhoto3}`, () => {
			console.log('removed sPhoto3');
		});
		fs.unlink(`./public/uploads/vip/${entry.sVideo}`, () => {
			console.log('removed sVideo');
		});
		fs.unlink(`./public/uploads/vip/${entry.s360}`, () => {
			console.log('removed s360');
		});
		
		res.redirect('/vip');
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.deleteGlobalTitleImage = (req, res) => {
	const origTitleImage = req.params.id;
	const id = req.params._id;

	fs.unlink(`./public/uploads/vip/${origTitleImage}`, () => {
		console.log(`removed title image ./public/uploads/vip/${origTitleImage}`);
	});

	let data = {};
	data.titleImage = "";
	
	Vip.findByIdAndUpdate(id, {$set: data}, {new: true}).then((globals) => {
		if (!globals) {
			return res.status(404).send();
		}
		res.redirect(`/vip`);
	}).catch((e) => {
		res.status(400).send(e);
	});
		
	res.redirect('/vip');
};





const getVipList = () => {
	return new Promise((resolve, reject) => {
		Vip.find().then((items) => {
			resolve(_getVipList(items));
		});
	}).catch(error => reject(error));
};

const _getVipList = (items) => {
	const vipList = items.filter((item) => {
		if (item.type == "GLOBAL")
		{
			vipGlobals = item;
			return false;
		}
		return true;
	}).map((item) => {
		return {
			id: item._id,
			title: item.title,
			photo: item.photo,
			titleImage: item.titleImage,
			sPhoto1: item.sPhoto1,
			sPhoto2: item.sPhoto2,
			sPhoto3: item.sPhoto3
  		};
	});
	return vipList;
};

const getVipFeed = () => {
	return new Promise((resolve, reject) => {
		let vipList;
		vipGlobals = null;

		Vip.find().then((items) => {
			vipList = items.filter((item) => {
				if (item.type == "GLOBAL")
				{
					vipGlobals = item;
					return false;
				}
				return true;
			}).map((item) => {
				return {
					title: item.title,
					logo: item.photo == "" ? "" : `${uri}/uploads/vip/${item.photo}`,
					titleImage: item.titleImage == "" ? "" : `${uri}/uploads/vip/${item.titleImage}`,
					sPhoto1: item.sPhoto1 == "" ? "" : `${uri}/uploads/vip/${item.sPhoto1}`,
					sPhoto2: item.sPhoto2 == "" ? "" : `${uri}/uploads/vip/${item.sPhoto2}`,
					sPhoto3: item.sPhoto3 == "" ? "" : `${uri}/uploads/vip/${item.sPhoto3}`
	      		};
			});

			// set list
			vipData.data.components[0].data.list = vipList;

			// set globals
			if (vipGlobals != null)
			{
				vipData.data.components[0].data.titleImage = vipGlobals.titleImage == "" ? "" : `${uri}/uploads/vip/${vipGlobals.titleImage}`,
				vipData.data.components[0].data.title = vipGlobals.title;
				vipData.data.components[0].data.loops = vipGlobals.loops;
				vipData.data.components[0].data.refreshTime = vipGlobals.refreshTime;
			}

			resolve(vipData.data);
		});
		
	}).catch((errorMessage) => {
		console.log('Error: ', errorMessage);
	});
};

function getFileNameFromFiles(s, files)
{
	if (files == null || files == undefined) return "";
	for (var i=0; i<files.length; i++) if (files[i].fieldname.includes(s)) return files[i].filename;
	return "";
}