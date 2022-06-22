const _ = require('lodash');
const {ObjectID} = require('mongodb');
const Tweets = require('twitter');

const {Data} = require('./../models/data');
const {Globals} = require('./../models/globals');

const uri = process.env.URI;
const client = new Tweets({
  consumer_key: process.env.TW_KEY,
  consumer_secret: process.env.TW_SECRET,
  access_token_key: process.env.TW_TOKEN_KEY,
  access_token_secret: process.env.TW_TOKEN_SECRET,
});


exports.getTwitterApi = (req, res) => {

  getTweets().then((result) => {
    res.json({
      name: 'twitter',
      endPoint: `${uri}/api/twitter`,
      data: result
    });
  }).catch((e) => {
    res.json(e);
  });

};


exports.getTwitter = () => {

  return new Promise((resolve, reject) => {

    getTweets().then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });

  });

};

const getTweets = () => {

  return new Promise((resolve, reject) => {

    Data.findOne({ name: 'twitter' }).then((twitter) => {

      if (!twitter) {
        getUserTimeline().then((result) => {
          
          var data = new Data({ 
            name: 'twitter', 
            jsonData: result 
          });

          data.save().then((doc) => {
            resolve(result[0]);
          }).catch((e) => {
            reject(e);
          });

        });

      } else {
        resolve(twitter.jsonData[0]);

        getUserTimeline().then((result) => {

          Data.findOneAndUpdate({ 
            name: 'twitter' 
          }, { 
            $set: { jsonData: result } 
          }, { 
            returnOriginal: false 
          }).then((doc) => {
            //console.log('Updated twitter data: ', result);
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

const getUserTimeline = () => {

  return new Promise((resolve, reject) => {

    Globals.find().then((globals) => {

      const account = globals[0].twitter;
      const twitterParams = { screen_name: account };

      client.get('statuses/user_timeline', twitterParams).then((tweets) => {

        let twitterData = [];

        for(const [i, tweet] of tweets.entries()) {
          let imageUrl = '';
          //if (i == 3) break;
          if (tweet.entities.media) {
            imageUrl = tweet.entities.media[0].media_url;
          };
          
          const text = tweet.text.replace(/[^a-zA-Z0-9 ',#@/:-\\]/g,'');
          const split = tweet.created_at.split(' ');
          const created_date = `${split[0]} ${split[1]} ${split[2]} ${split[3]}`;

          twitterData.push({
            username: `@${account}`,
            date: created_date,
            text: text,
            image: imageUrl
          });
        };

        resolve({
          amount: twitterData.length,
          list: twitterData
        });
        

      }).catch(function (error) {
        reject(error);
      });

    });

  });

};