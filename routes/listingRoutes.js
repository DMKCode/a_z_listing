// express package to get router
var express = require('express');

var listingController = require('../controllers/listingController').getListings;

// express router to handle routes
var listingRouter = express.Router();

// use the listingController to get listings and render 
// handle letters not found with 404
listingRouter.route('/a-z/:letter/programmes')
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

// re-direct to default page
listingRouter.route('/a-z')
    .get((req, res) => {
        res.redirect('/a-z/a/programmes?page=1');  
    });

module.exports = listingRouter;
