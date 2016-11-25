var expect = require('chai').expect;
var getListings = require('../controllers/listingController').getListings;

describe('GET listing from API end point', () => {
  it('should return listings', (done) => {
    
    // mock request: req and response: res objects
    var req = {
      params: {
        letter: 'a'
      },

      query: {
        page: 1
      }
    };
    var res = {};

    getListings(req, res, (err, listings) => {     
      expect(listings).to.have.property('atoz_programmes');
      expect(Array.isArray(listings.atoz_programmes.elements)).to.equal(true);
      done();
    });

  });
});