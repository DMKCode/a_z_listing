var expect = require('chai').expect;
var getListings = require('../listingController').getListings;

describe('GET listing from API end point', function() {
  it('should return listings', function(done) {
    
    // fail test if times out
    this.timeout(3000);

    // mock request: req and response:res objects
    var req = {};
    var res = {};

    getListings(req, res, function(err, listings) {     
      expect(listings).to.have.property('atoz_programmes');
      expect(Array.isArray(listings.atoz_programmes.elements)).to.equal(true);
      done();
    });

  });
});