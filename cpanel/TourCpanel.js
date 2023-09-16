var express = require('express');
var router = express.Router();

// http://localhost:3000/tour/cpanel/home
router.get('/home', function(req, res) {
    res.render('tour/home');
});

// http://localhost:3000/tour/cpanel/form
router.get('/form', function(req, res) {
    res.render('tour/form');
});

// http://localhost:3000/tour/cpanel/chart
router.get('/chart', function(req, res) {
    res.render('tour/chart');
});

// http://localhost:3000/tour/cpanel/profile
router.get('/profile', function(req, res) {
    res.render('tour/profile');
});

// http://localhost:3000/tour/cpanel/error404
router.get('/error404', function(req, res) {
    res.render('tour/error404');
});

// http://localhost:3000/tour/cpanel/tour-table
router.get('/tour-table', function(req, res) {
    res.render('tour/tourTable');
});

// http://localhost:3000/tour/cpanel/tour-table
router.get('/hotel-table', function(req, res) {
    res.render('tour/hotelTable');
});

module.exports = router;