var chai = require('chai');
var assert = chai.assert;
var http = require('http');
var nock = require('nock');
var Browser = require('zombie');

var listingResponse = require('./listingResponse');

var app = require('../app');
var server, browser;

describe('Listing Routes', () => {
    
    before(() => {
        this.server = http.createServer(app);
        this.browser = new Browser({ site: 'http://localhost:3000' });
    });
    
    before((done) => {
        this.browser.visit('/a/programmes', done);
    });
    
    beforeEach((done) => {
        // mock the api end point request response
        nock('https://ibl.api.bbci.co.uk')
            .get('/ibl/v1/atoz/a/programmes?page=1')
            .reply(200, listingResponse);

        done();
    });

    after((done) => {
        done();
    });

    afterEach((done) => {
        done();
    });

    describe('A-Z Programme Listing View Page', () => {
        it('should show page listings: image and title', (done) => {
            assert.ok(this.browser.success);
            assert.equal(this.browser.text('h1'), 'A-Z Programme Listing');
            assert.equal(this.browser.text('ol li'), listingResponse.atoz_programmes.elements[0].title);
            assert.equal(browser.attribute('ol li img', 'src'), listingResponse.atoz_programmes.elements[0].images.standard);
            done();
        });
    });

});