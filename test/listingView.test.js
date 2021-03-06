// chai package for testing
var chai = require('chai');

// assert assertion style from chai package
var assert = chai.assert;

// http package provided by node to start app in test environment
var http = require('http');

// package for mocking requests
var nock = require('nock');

// package for headless browsing
var Browser = require('zombie');

// mock response json
var listingResponse = require('./listingResponse');

var app = require('../app');
var server, browser;

describe('Listing Routes', () => {
    
    before(() => {
        this.server = http.createServer(app);
        this.browser = new Browser({ site: 'http://localhost:3000' });
    });
    
    before((done) => {
        this.browser.visit('/a-z/a/programmes', done);
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
            this.browser.assert.text('h1', 'A-Z Programme Listing');
            this.browser.assert.text('ol li', listingResponse.atoz_programmes.elements[0].title);
            this.browser.assert.attribute('ol li img', 'src', (listingResponse.atoz_programmes.elements[0].images.standard).replace("{recipe}", "560x315"));
            done();
        });

        it('should show letter navigations', (done) => {
            assert.ok(this.browser.success);
            this.browser.assert.text('h1', 'A-Z Programme Listing');
            this.browser.assert.text('#letter-navigation ul li a', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0-9');
            done();
        });

        it('should show pagination', (done) => {
            assert.ok(this.browser.success);
            this.browser.assert.text('h1', 'A-Z Programme Listing');
            this.browser.assert.text('.pagination li a', '12345»');
            done();
        });
    });

});