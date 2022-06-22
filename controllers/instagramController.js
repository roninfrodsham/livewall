const _ = require('lodash');
const {ObjectID} = require('mongodb');
const axios = require('axios');

const {Data} = require('./../models/data');
const {Globals} = require('./../models/globals');


exports.getInstagramApi = (req, res) => {
  
	getInstagramData().then((result) => {
    res.json(result);
  }).catch((e) => {
    res.json(e);
  });

};


exports.getInstagram = (req, res) => {

	return new Promise((resolve, reject) => {
		getInstagramData().then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });
	});

};


const getInstagramData = () => {

	return new Promise((resolve, reject) => {

		Data.findOne({ name: 'instagram' }).then((instagram) => {

        if (!instagram) {

          getInstagramFeed().then((result) => {
          
            const data = new Data({ 
              name: 'instagram', 
              jsonData: result 
            });

            data.save().then((doc) => {
              resolve(result[0]);
            });

          });

        } else {

          resolve(instagram.jsonData[0]);

          getInstagramFeed().then((result) => {

            Data.findOneAndUpdate({ name: 'instagram' }, { $set: { jsonData: result } }, { returnOriginal: false }).then((doc) => {
              console.log('Updated instagram data: ', result);
            }).catch((e) => {
              reject(e);
            });

          });

        }  

      });

  });
};


const getInstagramFeed = () => {

	return new Promise((resolve, reject) => {

    Globals.find().then((globals) => {
      instaAccount = globals[0].instagram;

      axios.get(`https://www.instagram.com/${instaAccount}/?__a=1`).then((response) => {

        instagramNodes = response.data.user.media.nodes;

        instagramData = instagramNodes
          .filter((node) => node.__typename == 'GraphImage')
          .map((node) => {
            return {
              image: node.display_src,
              username: instaAccount,
              likes: `${node.likes.count} likes`,
              text: node.caption
            }
          });

        resolve({
          repeat: true,
          amount: instagramData.length,
          list: instagramData
        });

      }).catch((e) => {
        reject(e);
      });

    });

	}).catch(function (error) {
    reject(error);
  });
};
