const _ = require('lodash');
const restClient = require('node-rest-client').Client;
const {ObjectID} = require('mongodb');

const {Data} = require('./../models/data');

const uri = process.env.URI;

const flightAwareUrl = 'https://flightxml.flightaware.com/json/FlightXML3/';

const client = new restClient({
	user: process.env.FLIGHT_USER,
	password: process.env.FLIGHT_PASS
});

client.registerMethod('AirportBoards', flightAwareUrl + 'AirportBoards', 'GET');

const airportBoardsArgs = {
	parameters: {
		airport_code: 'MBS',
		include_ex_data: false,
		filter: 'airline',
		type: 'enroute',
		howMany: 5
	}
};

const airlines = {
	SKW: 'SkyWest',
	UAL: 'United',
	DAL: 'Delta',
	EDV: 'Endeavor Air'
};


exports.getFlightsApi = (req, res) => {

	getAirlineData().then((result) => {
		res.json(result);
	}).catch((e) => {
		res.status(400).send(e);
	});

};


exports.getFlights = () => {

	return new Promise((resolve, reject) => {
		
		getAirlineData().then((result) => {
			resolve(result.data);
		}).catch((e) => {
			reject(e);
		});

	});

};

const getAirlineData = () => {

	return new Promise((resolve, reject) => {

		Data.findOne({ name: 'flights' }).then((flights) => {
		
			if (!flights) {
				
				getAirportBoards().then((result) => {

					var data = new Data({ 
						name: 'flights', 
						jsonData: result 
					});

					data.save().then((doc) => {
						resolve({
							name: 'airports',
	      			endPoint: `${uri}/api/flights`,
							data: result[0]
						});
					}).catch(error => reject(error));

				});


			} else {

				const currentDate = new Date();
				const collectionDate = new Date(flights.timestamp);
				const diffInSeconds = Math.round((currentDate.getTime() - collectionDate.getTime()) / 1000);
				console.log(`Current Date: ${currentDate} Collection Date: ${collectionDate} Time difference in seconds: ${diffInSeconds}`);

				resolve({
					name: 'airports',
	      	endPoint: `${uri}/api/flights`,
					data: flights.jsonData[0]
				});
				
				if (diffInSeconds > 3600) {

					getAirportBoards().then((result) => {
						console.log('find flights and update');
						
						Data.findOneAndUpdate({ name: 'flights' }, { $set: { jsonData: result, timestamp: currentDate } }, { returnOriginal: false }).then((doc) => {
							console.log('Updated flight data: ', result);
						}).catch(error => reject(error));

					});

				};

			}

		}).catch(error => reject(error));

	});	

};


const getAirportBoards = () => {

	return new Promise((resolve, reject) => {

		client.methods.AirportBoards(airportBoardsArgs, function (data, response) {
			
			const flightData = data.AirportBoardsResult.enroute.flights.map((flight) => {
				
				const delayAmount = flight.arrival_delay;
				const airline = flight.airline;
				let schedule = 'On time'; 

				if (delayAmount !== 0 && delayAmount.toString().indexOf('-') == -1) {
					schedule = `Delay ${flight.estimated_arrival_time.time}`;
				};

				return {
	        airline: airlines[flight.airline],
	        flightNo: flight.flightnumber,
	        gateNo: '-',
	        airport: flight.origin.city,
	        time: flight.filed_arrival_time.time,
	        schedule: schedule
	      };

			});

			const flightJSON = {
				title: 'Arrivals',
	    	amount: '5',
	    	list: flightData
			};

			resolve(flightJSON);
			
		});

	});

};


const getAirline = (airline) => {
	client.registerMethod('AirlineInfo', flightAwareUrl + 'AirlineInfo', 'GET');

	const airlineInfoArgs = {
		parameters: {
			airline_code: airline,
		}
	};

	client.methods.AirlineInfo(airlineInfoArgs, function (data, response) {
		console.log(data.AirlineInfoResult);

		// if (airlines.hasOwnProperty(airline)) {
		// 	return;
		// }

		//airlines[airline] = data.AirlineInfoResult;
	});

};