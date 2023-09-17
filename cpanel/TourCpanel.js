var express = require('express');
var router = express.Router();



// http://localhost:3000/tour/cpanel/tour-table
router.get('/tour-table', function(req, res) {
    res.render('tour/tourTable');
});


module.exports = router;