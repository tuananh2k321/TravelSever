var express = require('express');
var router = express.Router();
const userController = require('../component/user/UserController');
const jwt = require('jsonwebtoken')
const authen = require('../middleware/Authen')
const validation = require('../middleware/Validation')


// http://localhost:3000/user/cpanel/login
router.get('/login', function(req, res) {
    res.render('user/login');
});


router.post('/login', [authen.checkTokenCpanel], async function(req, res, next) {
    const { email, password } = req.body;
    const result = await userController.login(email, password);
  
    if (result.role === 2) {
        const token = jwt.sign({ _id: result._id }, 'secret');
        req.session.token = token;
        console.log('token: ', token);
      
        return res.redirect('/home-page/cpanel/home');
    } else {
        return res.redirect('/user/cpanel/login');
    }
  });


// http://localhost:3000/user/cpanel/register
router.get('/register', function(req, res) {
    res.render('user/register');
});

module.exports = router;