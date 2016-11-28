// package for making requests
var request = require('superagent');

/**
 * constructs a url given a letter or '0-9' and page number
 * @param  {Object}  req        - request object
 * @param  {Object}  res        - response object
 * @param  {Function} callback  - callback function to invoke 
 */
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

/**
 * checks if letter is a single lower case letter i.e. a-z
 * @param  {String}  letter - letter character to check
 * @return {Boolean}        - true or false
 */
var singleAtoZ = (letter) => {
    return /^[a-z]$/.test(letter);
};

/**
 * checks if string is '0-9'
 * @param  {String}  zeroNine   - String to check 
 * @return {Boolean}            - true or false
 */
var zeroToNine = (zeroNine) => {
    return /^0-9$/.test(zeroNine);
};

/**
 * checks if number is >= 1
 * @param  {Number}  num - Number to check
 * @return {Boolean}     - true or false
 */
var numberFrom1 = (num) => {
    return /^[1-9]+$/.test(num);
};

module.exports = { 
    getListings: getListings,
    singleAtoZ: singleAtoZ,
    zeroToNine: zeroToNine,
    numberFrom1: numberFrom1 
};