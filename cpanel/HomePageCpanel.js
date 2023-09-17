var express = require('express');
var router = express.Router();

// http://localhost:3000/home-page/cpanel/home
router.get('/home', function(req, res) {
    res.render('home-page/home');
});

// http://localhost:3000/home-page/cpanel/form
router.get('/form', function(req, res) {
    res.render('home-page/form');
});

// http://localhost:3000/home-page/cpanel/chart
router.get('/chart', function(req, res) {
    res.render('home-page/chart');
});

// http://localhost:3000/home-page/cpanel/profile
router.get('/profile', function(req, res) {
    res.render('home-page/profile');
});

// http://localhost:3000/tour/cpanel/error404
router.get('/error404', function(req, res) {
    res.render('home-page/error404');
});



module.exports = router;