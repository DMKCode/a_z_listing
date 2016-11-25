var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../app');

describe('Listing Routes', () => {

  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
    done();
  });

  describe('GET /', () => {
    it('should render the listing view', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.contain('<h1>A-Z Programme Listing</h1>');
          done();
        });
    });
  });

});