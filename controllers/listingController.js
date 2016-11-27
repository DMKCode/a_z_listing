var request = require('superagent');

var getListings = (req, res, callback) => {
    var letter = req.params.letter;
    var pageNum = req.query.page || 1; // API defaults to page 1

    if(!singleAtoZ(letter) && !zeroToNine(letter)) {
        callback('404');
        return;
    }

    if(!numberFrom1(pageNum)) {
        callback('404');
        return;
    }
    var listingUrl = require('../config').listingApiEndPoint(letter, pageNum);
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
};

var zeroToNine = (zeroNine) => {
    return /^0-9$/.test(zeroNine);
};

var numberFrom1 = (num) => {
    return /^[1-9]+$/.test(num);
};

module.exports = { 
    getListings: getListings,
    singleAtoZ: singleAtoZ,
    zeroToNine: zeroToNine,
    numberFrom1: numberFrom1 
};