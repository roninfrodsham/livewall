const flightController = require('./controllers/flightController');
const twitterController = require('./controllers/twitterController');
const clocksController = require('./controllers/clocksController');
const newsController = require('./controllers/newsController');
const trendsController = require('./controllers/trendsController');
const holidaysController = require('./controllers/holidaysController');
const historyController = require('./controllers/historyController');
const instagramController = require('./controllers/instagramController');
const weatherController = require('./controllers/weatherController');
const facebookController = require('./controllers/facebookController');
const stocksController = require('./controllers/stocksController');
const earningsController = require('./controllers/earningsController');
const dowConnectController = require('./controllers/dowConnectController');
const imagesController = require('./controllers/imagesController');

const airports = () => {
	return new Promise((resolve, reject) => {
		flightController.getFlights().then((result) => {
			resolve(result);
		});
	});
};

const twitter = (component) => {
	return new Promise((resolve, reject) => {
		twitterController.getTwitter().then((result) => {
			resolve(result);
		});
	});
};

const facebook = (component) => {
	return new Promise((resolve, reject) => {
		facebookController.getFacebook().then((result) => {
			resolve(result);
		});
	});
};

const clocks = (component) => {
	return new Promise((resolve, reject) => {
		resolve(clocksController.getClocks());
	});
};

const news = (component) => {
	return new Promise((resolve, reject) => {
		newsController.getNews().then((result) => {
			resolve(result);
		});
	});
};

const search = (component) => {
	return new Promise((resolve, reject) => {
		trendsController.getTrends().then((result) => {
			resolve(result);
		});
	});
};

const holiday = (component) => {
	return new Promise((resolve, reject) => {
		resolve(holidaysController.getHolidays());
	});
};

const onThisDay = (component) => {
	return new Promise((resolve, reject) => {
		resolve(historyController.getOnThisDay());
	});
};

const instagram = (component) => {
	return new Promise((resolve, reject) => {
		resolve(instagramController.getInstagram());
	});
};

const weather = (component) => {
	return new Promise((resolve, reject) => {
		weatherController.getWeather().then((result) => {
			resolve(result);
		});
	});
};

const stocks = (component) => {
	return new Promise((resolve, reject) => {
		stocksController.getStocks().then((result) => {
			resolve(result);
		});
	});
};

const stockDow = (component) => {
	return new Promise((resolve, reject) => {
		stocksController.getStockPrice().then((result) => {
			resolve(result);
		});
	});
};

const earnings = (component) => {
	return new Promise((resolve, reject) => {
		earningsController.getEarnings().then((result) => {
			resolve(result);
		});
	});
};

const dowconnect = (component) => {
	return new Promise((resolve, reject) => {
		dowConnectController.getDataApi().then((result) => {
			resolve(result);
		});
	});
};

// const image = (component) => {
// 	return new Promise((resolve, reject) => {
// 		imagesController.getImageData().then((result) => {
// 			resolve(result);
// 		});
// 	}).catch(error => reject(error));
// };

module.exports = {
  airports,
  twitter,
  facebook,
  clocks,
  news,
  search,
  holiday,
  onThisDay,
  instagram,
  weather,
  stocks,
  stockDow,
  earnings,
  dowconnect
};