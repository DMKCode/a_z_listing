var express = require('express');
var listingController = require('../controllers/listingController').getListings;

var listingRouter = express.Router();

listingRouter.route('/:letter/programmes')
    .get((req, res) => {
        listingController(req, res, (err, listings) => {
            if(!err) {
                res.render('listing', { listings: listings });
                return;
            }
            res.status(err);
            res.render(err, { title: '404 Page Not Found.'} );
            
        });
        
    });

module.exports = listingRouter;
