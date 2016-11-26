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

var singleAtoZ = (letter) => {
    return /^[a-z]$/.test(letter);
}

var numberFrom1 = (num) => {
    return /^[1-9]+$/.test(num);
}

module.exports = { 
    getListings: getListings,
    singleAtoZ: singleAtoZ,
    numberFrom1: numberFrom1 
};