var express = require('express');
var router = express.Router();

// http://localhost:3000/hotel/cpanel/hotel-table
router.get('/hotel-table', function(req, res) {
    res.render('hotel/hotelTable');
});


module.exports = router;