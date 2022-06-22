// const clock = require('world-clock')();
constS moment = require('moment-timezone');

const cities = [
	{ continent: 'North America', city: 'Midland', timezone: 'America/Detroit' }, 
	{ continent: 'South America', city: 'Sao Paulo', timezone: 'America/Sao_Paulo' }, 
	{ continent: 'Europe', city: 'Horgen', timezone: 'Europe/London' }, 
	{ continent: 'Australia', city: 'Sydney', timezone: 'Australia/Sydney' }, 
	{ continent: 'Asia', city: 'Shanghai', timezone: 'Asia/Shanghai' }, 
	{ continent: 'Africa', city: "Jo'burg", timezone: 'Africa/Johannesburg' }
];

const uri = process.env.URI;
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const today = new Date();
const day = days[today.getDay()];
const date = today.getDate();
const month = months[today.getMonth()];

exports.getClocksApi = (req, res) => {

	const timeZoneData = cities.map((city) => {
		return {
			city: city.city,
			time: GetTime(city.timezone)
		};
	});

	res.send({
		name: 'clocks',
    endPoint: `${uri}/api/clocks`,
		data: {
			day,
	   	date,
	   	month,
	   	time: GetTime(cities[0].timezone),
	   	amount: '6',
	    list: timeZoneData
		}
	});
};

exports.getClocks = () => {

	const timeZoneData = cities.map((city) => {
		return {
			city: city.city,
			time: GetTime(city.timezone)
		};
	});

	return {
		day,
	   	date,
	   	month,
	   	time: GetTime(cities[0].timezone),
	   	amount: '6',
	    list: timeZoneData
	};

};

function GetTime(timezone)
{
	return moment().tz(timezone).format("hh:mm:ss");
}