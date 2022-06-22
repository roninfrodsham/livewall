const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {Holidays} = require('./../models/holidays');

exports.holidays = (req, res) => {
	Holidays.find({'timestamp' : { $gte : new Date() }}).sort( { timestamp: 1 } ).then((holidays) => {
		const holidayList = holidays.map((holiday) => {
			date = new Date(holiday.timestamp);
			return {
				id: holiday._id,
        title: holiday.title,
        day: date.getDate(),
        month: (date.getMonth() + 1),
        year: date.getFullYear(),
        subTitle: 'Countdown to'
      };
		});
		res.render('holidays', { title: 'Holidays', holidayList });
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.getHolidayApi = (req, res) => {
	Holidays.find({'timestamp' : { $gte : new Date() }}).sort( { timestamp: 1 } ).then((holidays) => {
		const holidayList = holidays.map((holiday) => {
			date = new Date(holiday.timestamp);
			return {
				id: holiday._id,
        title: holiday.title,
        day: date.getDate(),
        month: (date.getMonth() + 1),
        year: date.getFullYear(),
        subTitle: 'Countdown to'
      };
		});
		res.json(holidayList);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.getHoliday = (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Holidays.findOne({_id: id}).then((holiday) => {
		date = new Date(holiday.timestamp);
		const holidayData = {
      title: holiday.title,
      day: date.getDate(),
      month: (date.getMonth() + 1),
      year: date.getFullYear(),
      subTitle: 'Countdown to'
    };

    res.render('holidays', { title: 'Holidays', holidayData, id });
	});
};

exports.addHoliday = (req, res) => {
	let body = _.pick(req.body, ['title', 'day', 'month', 'year']);
	const timestamp = new Date(body.year, (Number(body.month) -1), body.day);
	const holidays = new Holidays({
		title: body.title,
		timestamp
	});

	holidays.save().then((doc) => {
		res.redirect(`/holidays`);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.updateHoliday = (req, res) => {
	const id = req.params.id;
	let body = _.pick(req.body, ['title', 'day', 'month', 'year']);
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Holidays.findByIdAndUpdate(id, {$set: body}, {new: true}).then((globals) => {
		if (!globals) {
			return res.status(404).send();
		}
		res.redirect(`/holidays`);
	}).catch((e) => {
		res.status(400).send(e);
	});

};

exports.deleteHoliday = (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Holidays.findByIdAndRemove(id).then((holiday) => {
		if (!holiday) {
			return res.status(404).send();
		}

		//fs.unlink(`${url}/uploads/${vip.photo}`);
		
		res.redirect('/holidays');
	}).catch((e) => {
		res.status(400).send(e);
	});
};


exports.getHolidays = () => {

	return new Promise((resolve, reject) => {

		Holidays.find({'timestamp' : { $gte : new Date() }}).sort( { timestamp: 1 } ).limit(1).then((holidays) => {
			const holidayList = holidays.map((holiday) => {
				date = new Date(holiday.timestamp);
				return {
	        title: holiday.title,
	        day: date.getDate(),
	        month: (date.getMonth() + 1),
	        year: date.getFullYear(),
	        subTitle: 'Countdown to'
	      };
			});

			resolve({
				repeat: true,
	      amount: 1,
	      list: holidayList
			});

		}).catch((e) => {
			console.log(e);
		});

	}).catch(function (error) {
    reject(error);
  });
	
};