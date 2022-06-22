const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {Earnings} = require('./../models/earnings');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const uri = process.env.URI;

exports.getEarningsApi = (req, res) => {
  getEarningsData().then((result) => {
    res.json({
      name: 'earnings',
      endPoint: `${uri}/api/earnings`,
      data: result
    });
  });
};

exports.getEarnings = () => {
  return new Promise((resolve, reject) => {
    getEarningsData().then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });
  });
};

exports.earnings = (req, res) => {
	Earnings.find().sort( { timestamp: 1 } ).then((earnings) => {
		const earningsList = earnings.map((earning) => {
			date = new Date(earning.timestamp);
			return {
				id: earning._id,
        title: earning.title,
        day: date.getDate(),
        month: (date.getMonth() + 1),
        year: date.getFullYear()
      };
		});

		res.render('earnings', { title: 'Earnings', earningsList });
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.getEarning = (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Earnings.findOne({_id: id}).then((earnings) => {
    date = new Date(earnings.timestamp);
    const earningData = {
      id: earnings._id,
      title: earnings.title,
      results: earnings.results,
      day: date.getDate(),
      month: (date.getMonth() + 1),
      year: date.getFullYear(),
    };

    res.render('earnings', { title: 'Earnings', earningData, id });
  });
};

exports.addEarning = (req, res) => {
	let body = _.pick(req.body, ['title', 'results', 'day', 'month', 'year']);
	const timestamp = new Date(body.year, (Number(body.month) -1), body.day);

	const earnings = new Earnings({
		title: body.title,
    results: body.results,
		timestamp
	});

	earnings.save().then((doc) => {
		res.redirect('/earnings');
	}).catch((e) => {
		res.status(400).send(e);
	});
};

exports.deleteEarning = (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Earnings.findByIdAndRemove(id).then((earnings) => {
    if (!earnings) {
      return res.status(404).send();
    }
    
    res.redirect('/earnings');

  }).catch((e) => {
    res.status(400).send(e);
  });
};

exports.updateEarning = (req, res) => {
  const id = req.params.id;
  let body = _.pick(req.body, ['title', 'results', 'day', 'month', 'year']);
  
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Earnings.findByIdAndUpdate(id, {$set: body}, {new: true}).then((globals) => {
    if (!globals) {
      return res.status(404).send();
    }
    res.redirect('/earnings');
  }).catch((e) => {
    res.status(400).send(e);
  });
};

const getEarningsData = () => {
	return new Promise((resolve, reject) => {
		Earnings.find().sort( { timestamp: 1 } ).then((earnings) => {
			const earningsList = earnings.map((earning) => {
				date = new Date(earning.timestamp);
				return {
					provider: earning.title,
          date: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
          text: earning.results
	      };
			});

			resolve({
				amount: earningsList.length,
				list: earningsList
			});
		});
	});
};