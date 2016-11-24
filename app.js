var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.use('/', function (req, res, next) {
	console.log('Basic server up and running.');
	next();
});

app.listen(port);

module.exports = app;