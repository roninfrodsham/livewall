const _ = require('lodash');
const {ObjectID} = require('mongodb');
const axios = require('axios');

const {Data} = require('./../models/data');
const {Globals} = require('./../models/globals');

const uri = process.env.URI;

exports.getFacebookApi = (req, res) => {

	getFacebookData().then((result) => {
    res.json({
      name: 'facebook',
      endPoint: `${uri}/api/facebook`,
      data: result
    });
  }).catch((e) => {
    res.json(e);
  });

};

exports.getFacebook = () => {
	
	return new Promise((resolve, reject) => {
    getFacebookData().then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });
  });

};

const getFacebookData = () => {
  return new Promise((resolve, reject) => {
  	
  	Data.findOne({ name: 'facebook' }).then((facebook) => {

      if (!facebook) {
        getFacebookFeed().then((result) => {
          
          var data = new Data({ 
            name: 'facebook', 
            jsonData: result 
          });

          data.save().then((doc) => {
            resolve(result[0]);
          }).catch((e) => {
            reject(e);
          });

        });

      } else {
        resolve(facebook.jsonData[0]);

        getFacebookFeed().then((result) => {

          Data.findOneAndUpdate({ 
            name: 'facebook' 
          }, { 
            $set: { jsonData: result } 
          }, { 
            returnOriginal: false 
          }).then((doc) => {
            console.log('Updated facebook data: ', result);
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

const getFacebookFeed = () => {
	return new Promise((resolve, reject) => {

    Globals.find().then((globals) => {

      const account = globals[0].facebook;
      const accessToken = process.env.FB_TOKEN;
      const fbGraphUrl = `https://graph.facebook.com/v2.9/${account}/posts?access_token=${accessToken}&fields=message,attachments,created_time`;

  		axios.get(fbGraphUrl).then((response) => {

  			const facebook = response.data.data;

  			let fbData = [];

  			for(const [i, fb] of facebook.entries()) {
  				if (i == 3) break;
  				
          let imageUrl = '';

          if (fb.attachments.data) {
            imageUrl = fb.attachments.data[0].media.image.src;
          };

  				const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  				let date = new Date(fb.created_time);
  				const utcDate = date.getUTCDate();
  	    	const month = date.getUTCMonth();
  	    	const year = date.getUTCFullYear()
  	    	date = `${utcDate} ${months[month]} ${year}`;
          console.log(utcDate);

  				fbData.push({
  					username: account,
  	        date: date,
  	        text: fb.message,
            image: imageUrl
  				});
  			}

  			resolve({
  				amount: 3,
  	     	direction: 'up',
  				list: fbData	
  			});

  		}).catch((e) => {

  		  if (e.code === 'ETIMEDOUT') {
  		    console.log('Unable to connect to API servers.');
  		  } else {
  		    console.log('Error:', e.message);
  		  }

  		});

    });

	});
};