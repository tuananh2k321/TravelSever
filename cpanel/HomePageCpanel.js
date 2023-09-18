var express = require('express');
var router = express.Router();
const authen = require('../middleware/Authen')

// http://localhost:3000/home-page/cpanel/home
router.get('/home', [authen.checkTokenCpanel], function(req, res) {
    res.render('home-page/home');
});

// http://localhost:3000/home-page/cpanel/form
router.get('/form', [authen.checkTokenCpanel], function(req, res) {
    res.render('home-page/form');
});

// http://localhost:3000/home-page/cpanel/chart
router.get('/chart', [authen.checkTokenCpanel], function(req, res) {
    res.render('home-page/chart');
});

// http://localhost:3000/home-page/cpanel/profile
router.get('/profile', [authen.checkTokenCpanel], function(req, res) {
    res.render('home-page/profile');
});

// http://localhost:3000/tour/cpanel/error404
router.get('/error404', function(req, res) {
    res.render('home-page/error404');
});



module.exports = router;