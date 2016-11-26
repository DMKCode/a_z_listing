var express = require('express');
var listingRoutes = require('./routes/listingRoutes');

var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use('/', listingRoutes);

// Handle 404
app.use(function(req, res) {
    res.status(404);
    res.render('404', { title: '404 Page Not Found.'} );
});


app.listen(port);

module.exports = app;