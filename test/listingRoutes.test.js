var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var nock = require('nock');
var listingResponse = require('./listingResponse');

var app = require('../app');

describe('Listing Routes', () => {

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

  describe('GET Rendering', () => {
    it('should render the listing view', (done) => {
      chai.request(app)
        .get('/a/programmes')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.contain('<h1>A-Z Programme Listing</h1>');
          done();
        });
    });
    
    it('should render the 404', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.equal('text/html');
          res.text.should.contain('<h1>404 Page Not Found.</h1>');
          done();
        });
    });

    it('should re-direct to default page: a-z(home) to a, page 1', (done) => {
      chai.request(app)
        .get('/a-z')
        .end((err, res) => {
          res.status.should.equal(200);
          res.redirects.length.should.equal(1);
          res.type.should.equal('text/html');
          res.text.should.contain('<h1>A-Z Programme Listing</h1>');
          done();
        });
    });
  });

});