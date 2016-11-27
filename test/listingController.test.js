var expect = require('chai').expect;
var nock = require('nock');

var getListings = require('../controllers/listingController').getListings;
var singleAtoZ = require('../controllers/listingController').singleAtoZ;
var zeroToNine = require('../controllers/listingController').zeroToNine;
var numberFrom1 = require('../controllers/listingController').numberFrom1;
var listingResponse = require('./listingResponse');

describe('GET listing from API end point', () => {
  beforeEach((done) => {
    // mock the api end point request response
    nock('https://ibl.api.bbci.co.uk')
      .get('/ibl/v1/atoz/a/programmes?page=1')
      .reply(200, listingResponse);
    done();
  });

  afterEach((done) => {
    done();
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
describe('Request letter and page number', () => {
  it('should only be a single letter, lower case, a-z', (done) => {
    
    var letter = 'a';
    var isSingleAtoZ = singleAtoZ(letter)   
    expect(isSingleAtoZ).to.equal(true);

    // API end point does not allow single letters
    letter = 'aa';
    isSingleAtoZ = singleAtoZ(letter);   
    expect(isSingleAtoZ).to.equal(false);

    // API end point does not allow capital letters
    letter = 'A';
    isSingleAtoZ = singleAtoZ(letter);   
    expect(isSingleAtoZ).to.equal(false);

    // API end point does not allow blanks
    letter = '';
    isSingleAtoZ = singleAtoZ(letter)   
    expect(isSingleAtoZ).to.equal(false);

    // API end point does not allow numbers
    letter = '1';
    isSingleAtoZ = singleAtoZ(letter)   
    expect(isSingleAtoZ).to.equal(false);

    done();
  });

  it('should only be "0-9"', (done) => {
    
    var zeroNine = '0-9';
    var isZeroToNine = zeroToNine(zeroNine);   
    expect(isZeroToNine).to.equal(true);

    // API end point does not allow != '0-9'
    zeroNine = '1-9';
    isZeroToNine = zeroToNine(zeroNine);   
    expect(isZeroToNine).to.equal(false);

    zeroNine = '0';
    isZeroToNine = zeroToNine(zeroNine);   
    expect(isZeroToNine).to.equal(false);

    zeroNine = '9';
    isZeroToNine = zeroToNine(zeroNine);   
    expect(isZeroToNine).to.equal(false);

    zeroNine = 'a';
    isZeroToNine = zeroToNine(zeroNine);   
    expect(isZeroToNine).to.equal(false);

    zeroNine = 'A';
    isZeroToNine = zeroToNine(zeroNine);   
    expect(isZeroToNine).to.equal(false);

    done();
  });

  it('should only be a number starting from 1', (done) => {
    
    // API end point allows number = 1
    var num = '1';
    var isNum = numberFrom1(num);   
    expect(isNum).to.equal(true);

    // API end point allows numbers > 1
    num = '11';
    isNum = numberFrom1(num);   
    expect(isNum).to.equal(true);

    // API end point does not allow numbers < 1
    num = '0';
    isNum = numberFrom1(num);   
    expect(isNum).to.equal(false);

    // API end point does not allow letters
    num = 'a';
    isNum = numberFrom1(num);   
    expect(isNum).to.equal(false);

    // API end point does not allow blanks
    num = '';
    isNum = numberFrom1(num);   
    expect(isNum).to.equal(false);

    done();
  });
});
