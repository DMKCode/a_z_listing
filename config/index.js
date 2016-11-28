// config json
var configValues = require('./config');

/**
 * constructs a url given a letter or '0-9' and page number
 * @param  {String}  letter - a-z or '0-9'
 * @param  {Number}  page   - page number
 * @return {String}         - listingApiEndPoint url
 */

module.exports = {
    listingApiEndPoint: (letter, page) => {
        return `${configValues.listingBaseUrl}/ibl/v1/atoz/${letter}/programmes?page=${page}`;
    }
};