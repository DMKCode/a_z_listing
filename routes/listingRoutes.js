var express = require('express');

var listingRouter = express.Router();

 listingRouter.route('/')
    .get((req, res) => {
        res.render('listing');
    });

module.exports = listingRouter;
