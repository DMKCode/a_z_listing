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
            this.browser.assert.text('h1', 'A-Z Programme Listing');
            this.browser.assert.text('ul li', listingResponse.atoz_programmes.elements[0].title);
            this.browser.assert.attribute('ul li img', 'src', (listingResponse.atoz_programmes.elements[0].images.standard).replace("{recipe}", "560x315"));
            done();
        });

        it('should show letter navigations', (done) => {
            assert.ok(this.browser.success);
            this.browser.assert.text('h1', 'A-Z Programme Listing');
            this.browser.assert.text('#letter-navigation ul li a', 'A');
            this.browser.assert.text('#letter-navigation ul li a', 'B');
            this.browser.assert.text('#letter-navigation ul li a', 'C');
            this.browser.assert.text('#letter-navigation ul li a', 'D');
            this.browser.assert.text('#letter-navigation ul li a', 'E');
            this.browser.assert.text('#letter-navigation ul li a', 'F');
            this.browser.assert.text('#letter-navigation ul li a', 'G');
            this.browser.assert.text('#letter-navigation ul li a', 'H');
            this.browser.assert.text('#letter-navigation ul li a', 'I');
            this.browser.assert.text('#letter-navigation ul li a', 'J');
            this.browser.assert.text('#letter-navigation ul li a', 'K');
            this.browser.assert.text('#letter-navigation ul li a', 'L');
            this.browser.assert.text('#letter-navigation ul li a', 'M');
            this.browser.assert.text('#letter-navigation ul li a', 'N');
            this.browser.assert.text('#letter-navigation ul li a', 'O');
            this.browser.assert.text('#letter-navigation ul li a', 'P');
            this.browser.assert.text('#letter-navigation ul li a', 'Q');
            this.browser.assert.text('#letter-navigation ul li a', 'R');
            this.browser.assert.text('#letter-navigation ul li a', 'S');
            this.browser.assert.text('#letter-navigation ul li a', 'T');
            this.browser.assert.text('#letter-navigation ul li a', 'U');
            this.browser.assert.text('#letter-navigation ul li a', 'V');
            this.browser.assert.text('#letter-navigation ul li a', 'W');
            this.browser.assert.text('#letter-navigation ul li a', 'X');
            this.browser.assert.text('#letter-navigation ul li a', 'Y');
            this.browser.assert.text('#letter-navigation ul li a', 'Z');
            done();
        });
    });

});