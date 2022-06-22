const _ = require('lodash');
const {ObjectID} = require('mongodb');
const axios = require('axios');

const {Data} = require('./../models/data');

const uri = process.env.URI;
//Midland, MI, USA
const lat = 43.615583;
const lng = -84.247212;
const weatherUrl = `https://api.darksky.net/forecast/${process.env.WEATHER_ACCOUNT}/${lat},${lng}`;
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

exports.getWeatherApi = (req, res) => {

	getWeatherData().then((result) => {
    res.json({
      name: 'weather',
      endPoint: `${uri}/api/weather`,
      //endPoint: '',
      data: result
    });
  }).catch((e) => {
    res.json(e);
  });

};

exports.getWeather = () => {

	return new Promise((resolve, reject) => {

    getWeatherData().then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });

  });

};

const getWeatherData = () => {

	return new Promise((resolve, reject) => {

    Data.findOne({ name: 'weather' }).then((weather) => {

      if (!weather) {
        getWeatherFeed().then((result) => {
          
          var data = new Data({ 
            name: 'weather', 
            jsonData: result 
          });

          data.save().then((doc) => {
            resolve(result[0]);
          }).catch((e) => {
            reject(e);
          });

        });

      } else {
        resolve(weather.jsonData[0]);

        getWeatherFeed().then((result) => {

          Data.findOneAndUpdate({ 
            name: 'weather' 
          }, { 
            $set: { jsonData: result } 
          }, { 
            returnOriginal: false 
          }).then((doc) => {
            console.log('Updated weather data: ', result);
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

const getWeatherFeed = () => {

	return new Promise((resolve, reject) => {

		axios.get(weatherUrl).then((response) => {

			const date = new Date();
			const day = date.getDay();

			const temperature = Math.round(response.data.currently.temperature)
			const summary = response.data.currently.summary;
			const weatherData = response.data.daily.data;

			const sunriseDate = new Date(weatherData[0].sunriseTime * 1000);
			const sunsetDate = new Date(weatherData[0].sunsetTime * 1000);

			const temp1 = Math.round(weatherData[1].temperatureHigh);
			const temp2 = Math.round(weatherData[2].temperatureHigh);
			const temp3 = Math.round(weatherData[3].temperatureHigh);
			const day1 = days[day];
			const day2 = ((day + 1) > 6) ? days[0] : days[day+1];
			const day3 = ((day + 2) > 6) ? days[0] : days[day+2];

			// celcius (F - 32) / 1.8
			console.log(temp1);

			let sunUpMinutes = sunriseDate.getMinutes();
			sunUpMinutes = (sunUpMinutes < 10) ? `0${sunUpMinutes}`: sunUpMinutes;
			let sunDownMinutes = sunsetDate.getMinutes();
			sunDownMinutes = (sunDownMinutes < 10) ? `0${sunDownMinutes}`: sunDownMinutes;

			console.log(response.data.currently);

			resolve({
				place: 'Midland, MI',
				weather: response.data.currently.icon.toLowerCase(),
				temp: `°${temperature}`,
				sunUp: `${sunriseDate.getHours()}:${sunUpMinutes}`,
				sunDown: `${sunsetDate.getHours()}:${sunDownMinutes}`,
				amount: '3',
				list: [{
					day: day1,
					weather: weatherData[1].icon.toLowerCase(),
					temp: `°${temp1}`
				},{
					day: day2,
					weather: weatherData[2].icon.toLowerCase(),
					temp: `°${temp2}`
				},{
					day: day3,
					weather: weatherData[3].icon.toLowerCase(),
					temp: `°${temp3}`
				}]
			});		

		}).catch((e) => {
		  if (e.code === 'ETIMEDOUT') {
		    reject('Unable to connect to API servers.');
		  } else {
		    reject(e.message);
		  }
		});

	}).catch(error => reject(error));

};