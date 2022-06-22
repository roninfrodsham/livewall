const _ = require('lodash');
const {ObjectID} = require('mongodb');
const googleTrends = require('google-trends-api-es');

const {Data} = require('./../models/data');


exports.getTrendsApi = (req, res) => {

	getSearchTrends().then((result) => {
    res.json(result);
  }).catch((e) => {
    res.json(e);
  });

};


exports.getTrends = () => {

	return new Promise((resolve, reject) => {

		getSearchTrends().then((result) => {
	    resolve(result);
	  }).catch((e) => {
	    reject(e);
	  });

	});

};


const getSearchTrends = () => {

	 return new Promise((resolve, reject) => {

    Data.findOne({ name: 'trends' }).then((trends) => {

      if (!trends) {
        getGoogleTrends().then((result) => {
          
          var data = new Data({ 
            name: 'trends', 
            jsonData: result 
          });

          data.save().then((doc) => {
            resolve(result[0]);
          }).catch((e) => {
            reject(e);
          });

        });

      } else {
        resolve(trends.jsonData[0]);

        getGoogleTrends().then((result) => {

          Data.findOneAndUpdate({ 
            name: 'trends' 
          }, { 
            $set: { jsonData: result } 
          }, { 
            returnOriginal: false 
          }).then((doc) => {
            console.log('Updated trends data: ', result);
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


const getGoogleTrends = () => {

	return new Promise((resolve, reject) => {

		googleTrends.hotTrendsDetail('US').then(function(results){
			const trends = results.rss.channel[0].item;
			let trendsData = [];

			for(const [i, trend] of trends.entries()) {
				if (i == 3) break;

				trendsData.push({
					title: 'Google Hot Trends',
					topic: trend.title[0],
					results: trend['ht:approx_traffic'][0]
				});
			}

			resolve({
				repeat: true,
	      amount: 3,
				list: trendsData	
			});

		}).catch(function(err){
			console.log(err);
		});		

	}).catch(function (error) {
    reject(error);
  });

};