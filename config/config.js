const ip = require('ip');

const ipAddress = ip.address();
const env = process.env.NODE_ENV || 'development';
process.env.URI = process.env.STAGING;

if (env === 'development') {
	process.env.PORT = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/LiveWall';
	process.env.URI = `http://${ipAddress}:${process.env.PORT}`;
}