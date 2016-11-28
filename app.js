var express = require('express');
var listingRoutes = require('./routes/listingRoutes');

var app = express();

var port = process.env.PORT || 3000;

// virtual path for files in the public directory
app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use('/', listingRoutes);

// Handle 404
app.use(function(req, res) {
    res.status(404);
    res.render('404', { title: '404 Page Not Found.'} );
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
});

module.exports = app;