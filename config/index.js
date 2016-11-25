var configValues = require('./config');

module.exports = {
    listingApiEndPoint: (letter, page) => {
        return `${configValues.listingBaseUrl}/ibl/v1/atoz/${letter}/programmes?page=${page}`;
    }
};