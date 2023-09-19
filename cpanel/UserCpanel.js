var express = require('express');
var router = express.Router();
const userController = require('../component/user/UserController');
const jwt = require('jsonwebtoken')
const authen = require('../middleware/Authen')
const validation = require('../middleware/Validation')


// USER

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

// http://localhost:3000/user/cpanel/list-user
router.get('/list-user', async function(req, res, next) {
    const result = await userController.getAllUser()
    res.render('user/user-management', {result})
})

// http://localhost:3000/user/cpanel/:id/delete
router.get('/:id/delete',  async function(req, res, next) {
    const {id} = req.params;
    try {
        
        await userController.deleteById(id)
        return res.json({status: true, id: id})
    } catch (error) {
        console.log(error)
        return res.json({status: false, error: id})
    }
})

// ADMIN

// http://localhost:3000/user/cpanel/list-admin
router.get('/list-admin', async function(req, res, next) {
    const result = await userController.getAllAdmin()
    res.render('user/admin-management', {result})
})

// http://localhost:3000/user/cpanel/:id/delete
router.get('/:id/delete',  async function(req, res, next) {
    const {id} = req.params;
    try {
        
        await userController.deleteById(id)
        return res.json({status: true, id: id})
    } catch (error) {
        console.log(error)
        return res.json({status: false, error: id})
    }
})


// http://localhost:3000/user/cpanel/register
router.get('/register', function(req, res) {
    res.render('user/register');
});

module.exports = router;