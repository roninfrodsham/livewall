const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {History} = require('./../models/history');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

exports.getHistoryApi = (req, res) => {
	return new Promise((resolve, reject) => {
    getHistoryData().then((result) => {
      res.json(result);
    }).catch((e) => {
      reject(e);
    });
  });
};

exports.getOnThisDay = () => {
	return new Promise((resolve, reject) => {
    getHistoryData().then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });
  });
};

exports.history = (req, res) => {

	History.find().then((history) => {
		const historyList = history.map((item) => {
			date = new Date(item.timestamp);
			return {
				id: item._id,
				day: date.getDate(),
	      month: (date.getMonth() + 1),
	      year: date.getFullYear(),
        text: item.text
      };
		});
		res.render('history', { title: 'On this Day', historyList });
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.getHistory = (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	History.findOne({_id: id}).then((history) => {
		date = new Date(history.timestamp);
		const historyData = {
			id: history._id,
      text: history.text,
      day: date.getDate(),
      month: (date.getMonth() + 1),
      year: date.getFullYear(),
    };

    res.render('history', { title: 'On this Day', historyData, id });
	});
};

exports.addHistory = (req, res) => {
	let body = _.pick(req.body, ['text', 'day', 'month', 'year']);
	const timestamp = new Date(body.year, (Number(body.month) -1), body.day);
	const history = new History({$set: body});

	history.save().then((doc) => {
		res.redirect(`/history`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.updateHistory = (req, res) => {
	const id = req.params.id;
	let body = _.pick(req.body, ['text', 'day', 'month', 'year']);
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	History.findByIdAndUpdate(id, {$set: body}, {new: true}).then((globals) => {
		if (!globals) {
			return res.status(404).send();
		}
		res.redirect(`/history`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.deleteHistory = (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	History.findByIdAndRemove(id).then((history) => {
		if (!history) {
			return res.status(404).send();
		}
		
		res.redirect('/history');

	}).catch((e) => {
		res.status(400).send(e);
	});
	
};

const getHistoryData = () => {
	return new Promise((resolve, reject) => {

		History.find({ day: 5 }).then((history) => {
			const historyList = history.map((item) => {

				return {
					title: 'On this Day',
					footer: 'Years Ago',
					year: item.year,
	        date: `${item.day} ${months[item.month -1]}`,
	        text: item.text
	      };
			});

			resolve({
				repeat: true,
	      amount: history.length,
	      list: historyList
			});

		}).catch((e) => {
			console.log(e);
		});

	}).catch(function (error) {
    reject(error);
  });
};