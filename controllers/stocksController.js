const _ = require('lodash');
const {ObjectID} = require('mongodb');
const yahooFinance = require('yahoo-finance');

const {Data} = require('./../models/data');

// DowDupont - DWDP
// Nikkei 225 - ^N225
// FTSE 100 - ^FTSE
// S&P 500 - ^GSPC
// Dow Jones Industrial Average - ^DJI

const uri = process.env.URI;
let stocks;

exports.getStocksApi = (req, res) => {

	getStockUpdate().then((result) => {
    res.json({
      name: 'stocks',
      endPoint: `${uri}/api/stocks`,
      data: result
    });
  }).catch((e) => {
    res.json(e);
  });

};

exports.getStockPriceApi = (req, res) => {
	getStockPriceUpdate().then((result) => {
		res.json(result);
	});
};

exports.getStockPrice = () => {
	return new Promise((resolve, reject) => {
    getStockPriceUpdate().then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });
  });
};

exports.getStocks = () => {
	
	return new Promise((resolve, reject) => {
    getStockUpdate().then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });
  });

};

const getStockUpdate = () => {

	return new Promise((resolve, reject) => {

		Data.findOne({ name: 'stocks' }).then((stocks) => {

			if (!stocks) {
        getStockPrices().then((result) => {
          
          var data = new Data({ 
            name: 'stocks', 
            jsonData: result 
          });

          data.save().then((doc) => {
            resolve(result[0]);
          }).catch((e) => {
            reject(e);
          });

        });

      } else {
        resolve(stocks.jsonData[0]);

        getStockPrices().then((result) => {

          Data.findOneAndUpdate({ 
            name: 'stocks' 
          }, { 
            $set: { jsonData: result } 
          }, { 
            returnOriginal: false 
          }).then((doc) => {
            console.log('Updated stocks data: ', result);
          }).catch((e) => {
            reject(e);
          });

        });

      }

		}).catch((e) => {
      reject(e);
    });

  });

};


const getStockPriceUpdate = () => {

	return new Promise((resolve, reject) => {

		Data.findOne({ name: 'stockprice' }).then((stocks) => {

			if (!stocks) {
        getStockPrice().then((result) => {
          
          var data = new Data({ 
            name: 'stockprice', 
            jsonData: result 
          });

          data.save().then((doc) => {
            resolve(result[0]);
          }).catch((e) => {
            reject(e);
          });

        });

      } else {
        resolve(stocks.jsonData[0]);

        getStockPrice().then((result) => {

          Data.findOneAndUpdate({ 
            name: 'stockprice' 
          }, { 
            $set: { jsonData: result } 
          }, { 
            returnOriginal: false 
          }).then((doc) => {
            console.log('Updated stock price data: ', result);
          }).catch((e) => {
            reject(e);
          });

        });

      }

		}).catch((e) => {
      reject(e);
    });

  });

};


const getStockPrices = () => {

	stocks = [];

	return new Promise((resolve, reject) => {

		yahooFinance.quote({
			symbol: '^FTSE', 
			modules: [ 'price' ] 
		}).then((quote) => {
			addStock(quote);
			return yahooFinance.quote({
				symbol: '^GSPC', 
				modules: [ 'price' ] 
			});
		}).then((quote) => {
			addStock(quote);
			return yahooFinance.quote({
				symbol: '^N225', 
				modules: [ 'price' ] 
			});
		}).then((quote) => {
			addStock(quote);
			return yahooFinance.quote({
				symbol: '^DJI', 
				modules: [ 'price' ] 
			});
		}).then((quote) => {
			addStock(quote);
			return yahooFinance.quote({
				symbol: 'NDAQ', 
				modules: [ 'price' ] 
			});
		}).then((quote) => {
			addStock(quote);
			return;
		}).then(() => {
			resolve({
				amount: 5,
				list: stocks
			});
		}).catch((e) => {
			reject(e);
		});

	});

};

const getStockPrice = () => {
	return new Promise((resolve, reject) => {
		yahooFinance.quote({
			symbol: 'DWDP', 
			modules: [ 'price' ] 
		}).then((quote) => {
			const price = (quote.price.regularMarketPrice).toFixed(2);
			const previousClose = quote.price.regularMarketPreviousClose;
			const dayDifference = (price - previousClose).toFixed(2);
			const percentageChange = ((dayDifference / price) * 100).toFixed(2);
			const preMarketTime = quote.price.preMarketTime;

			let date = new Date(preMarketTime);
			const hours = date.getUTCHours();
			const minutes = date.getUTCMinutes();
			const ampm = (hours > 12) ? 'PM': 'AM';

			resolve({
				name: "DowDupont Inc.",
	      points: price,
	      performance: `${dayDifference} (${percentageChange}%)`,
	      top: `As of ${hours}:${minutes}${ampm} EDT. Market Open`,
	      title: "DowDupont Inc.",
	      bottom: "NYSE - Nasdaq Real-time price. Currency in USD"
			});
		}).catch((e) => {
			reject(e);
		});
	});
};


const addStock = (quote) => {
	const price = (quote.price.regularMarketPrice).toFixed(2);
	const previousClose = quote.price.regularMarketPreviousClose;
	const dayDifference = (price - previousClose).toFixed(2);
	const percentageChange = ((dayDifference / price) * 100).toFixed(2);
	const stockPriceUp = (dayDifference > 0) ? true : false;

	stocks.push({
		name: quote.price.shortName,
		points: `${price}`,
		performance: `${dayDifference} (${percentageChange}%)`,
		stockPriceUp: stockPriceUp
	});
};