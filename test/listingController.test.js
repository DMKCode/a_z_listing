var expect = require('chai').expect;
var nock = require('nock');
var getListings = require('../controllers/listingController').getListings;
var listingResponse = require('./listingResponse');

describe('GET listing from API end point', () => {
  beforeEach(()=>{   
    // mock the api end point request response
    nock('https://ibl.api.bbci.co.uk')
      .get('/ibl/v1/atoz/a/programmes?page=1')
      .reply(200, listingResponse);
  });
  
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
      expect(listings.atoz_programmes.elements).to.have.lengthOf(1);
      done();
    });

  });
});
