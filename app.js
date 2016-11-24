var express = require('express');
var listingRoutes = require('./routes/listingRoutes');

var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use('/', listingRoutes);


app.listen(port);

module.exports = app;