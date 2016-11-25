var request = require('superagent');

var getListings = (req, res, callback) => {
    var listingUrl = require('../config').listingApiEndPoint(req.params.letter, req.query.page);
    request
        .get(listingUrl)
        .end((err, res) => {
            if (!err) {
                var listings = res.body;
                callback(null, listings);
            } else {
                callback('Error Occurred!');
            }
        });
};

module.exports = { 
    getListings: getListings 
};