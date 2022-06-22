const _ = require('lodash');
const {ObjectID} = require('mongodb');
const axios = require('axios');
const cheerio = require('cheerio');

const {Data} = require('./../models/data');

const uri = process.env.URI;

exports.getDowNewsApi = (req, res) => {

	getNewsFeed().then((result) => {
    res.json({
      name: 'dowNews',
      endPoint: `${uri}/downews`,
      data: result
    });
  }).catch((e) => {
    res.json(e);
  });

};

const getNewsFeed = () => {

	return new Promise((resolve, reject) => {

		Data.findOne({ name: 'downews' }).then((news) => {

      if (!news) {
        console.log('found news');
        getNewsData().then((result) => {
          
          var data = new Data({ 
            name: 'dowNews', 
            jsonData: result 
          });

          data.save().then((doc) => {
            resolve(result[0]);
          }).catch((e) => {
            reject(e);
          });

        });

      } else {
        console.log('no dow news saved');
        resolve(news.jsonData[0]);

        getNewsData().then((result) => {

          Data.findOneAndUpdate({ 
            name: 'downews' 
          }, { 
            $set: { jsonData: result } 
          }, { 
            returnOriginal: false 
          }).then((doc) => {
            console.log('Updated dow news data: ', result);
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

const getNewsData = () => {

	return new Promise((resolve, reject) => {

		const url = 'https://www.dow.com/en-us/news';
		axios.get(url).then((response) => {

			const $ = cheerio.load(response.data);
			const news = $('.cl-news-list-filter__results').find('.news-list-item');

			newsFeeds = [];

			$('.news-list-item').each(function(i, elem) {
				newsFeeds[i] = {
					provider: 'Dow Dupont',
		      pubdate: '',
		    	date: $(this).find('.item__title').text(),
		    	text: $(this).find('.item__date').text()
				}
			});

			resolve({
        amount: newsFeeds.length,
        list: newsFeeds
      });

	  });

	});

};