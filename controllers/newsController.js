const _ = require('lodash');
const {ObjectID} = require('mongodb');
const feedparser = require('feedparser-promised');

const {Data} = require('./../models/data');

const uri = process.env.URI;
let newsFeeds = [];


exports.getNewsApi = (req, res) => {

  getNewsFeeds().then((result) => {
    res.json({
      name: 'news',
      endPoint: `${uri}/news`,
      data: result
    });
  }).catch((e) => {
    res.json(e);
  });

};

exports.getNews = () => {

  return new Promise((resolve, reject) => {

    getNewsFeeds().then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });

  });

};


const getNewsFeeds = () => {

  newsFeeds = [];
  
  return new Promise((resolve, reject) => {

      Data.findOne({ name: 'news' }).then((news) => {

        if (!news) {
          getNewsChannels().then((result) => {
            
            var data = new Data({ 
              name: 'news', 
              jsonData: result 
            });

            data.save().then((doc) => {
              resolve(result[0]);
            }).catch((e) => {
              reject(e);
            });

          });

        } else {
          resolve(news.jsonData[0]);

          getNewsChannels().then((result) => {

            Data.findOneAndUpdate({ 
              name: 'news' 
            }, { 
              $set: { jsonData: result } 
            }, { 
              returnOriginal: false 
            }).then((doc) => {
              console.log('Updated news data: ', result);
            }).catch((e) => {
              reject(e);
            });

          });

        }

      }).catch((e) => {
        reject(e);
      });

  });
}


const getNewsChannels = () => {
  return new Promise((resolve, reject) => {
    
    feedparser.parse('http://www.wsj.com/xml/rss/3_7041.xml').then((items) => {

      addTopStories('The Wall Street Journal', items);
      return feedparser.parse('https://www.cnbc.com/id/15837362/device/rss/rss.html');

    }).then((items) => {

      addTopStories('CNBC', items);
      return feedparser.parse('http://feeds.reuters.com/reuters/businessNews');

    }).then((items) => {

      addTopStories('Reuters', items);
      return feedparser.parse('http://rssfeeds.usatoday.com/usatoday-NewsTopStories');

    }).then((items) => {

      addTopStories('USA Today', items);
      return feedparser.parse('http://rss.cnn.com/rss/edition_us.rss');

    }).then((items) => {

      addTopStories('CNN', items);
      
      newsFeeds.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      resolve({
        amount: newsFeeds.length,
        list: newsFeeds
      });

    }).catch(error => reject(error));

  });
}


const addTopStories = (provider, items) => {
	for(const [i, item] of items.entries()) {
    
		if (i == 1) break;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(item.pubdate);
    const utcDate = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    
    const formattedDate = `${utcDate} ${months[month]} ${year}`;

		newsFeeds.push({
    	provider: provider,
      pubdate: item.pubdate,
    	date: formattedDate,
    	text: item.title
    });
	}
};