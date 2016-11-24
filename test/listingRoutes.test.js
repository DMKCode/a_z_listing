var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../app');

describe('Listing Routes', function () {

  beforeEach(function (done) {
    done();
  });

  afterEach(function (done) {
    done();
  });

  describe('GET /', function () {
    it('should render the listing view', function (done) {
      chai.request(app)
        .get('/')
        .end(function (err, res) {
          res.redirects.length.should.equal(0);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.contain('<h1>A-Z Programme Listing</h1>');
          done();
        });
    });
  });

});