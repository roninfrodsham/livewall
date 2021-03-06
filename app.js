require('./config/config.js');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes/index');

const {mongoose} = require('./db/mongoose');

const app = express();
const port = process.env.PORT;
const uri = process.env.URI;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(port, () => {
	console.log(`Started on port ${port} and the base url is ${uri}`);
});

module.exports = app;