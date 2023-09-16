var express = require('express');
var router = express.Router();

// http://localhost:3000/user/cpanel/login
router.get('/login', function(req, res) {
    res.render('user/login');
});


// http://localhost:3000/user/cpanel/register
router.get('/register', function(req, res) {
    res.render('user/register');
});

module.exports = router;