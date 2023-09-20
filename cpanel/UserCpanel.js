var express = require('express');
var router = express.Router();
const userController = require('../component/user/UserController');
const jwt = require('jsonwebtoken')
const authen = require('../middleware/Authen')
const validation = require('../middleware/Validation')
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const appFirebase = require("../component/config/FirebaseConfig")

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

// http://localhost:3000/user/cpanel/upload
router.post("/upload", upload.single("filename"), async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `user-avatar/${req.file.originalname + "       " + dateTime}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

// USER

// http://localhost:3000/user/cpanel/login
router.get('/login', function(req, res) {
    res.render('user/login');
});


router.post('/login', [authen.checkTokenCpanel], async function(req, res, next) {
    const { email, password } = req.body;
    const result = await userController.login(email, password);
  
    if (result) {
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

// http://localhost:3000/user/cpanel/search-user
router.post('/search-user', async function(req, res, next) {
    const {keyword} = req.body
    console.log("keyword: ",keyword)
    const result = await userController.searchUsers(keyword)
    console.log("result: ",result)
    res.render('user/user-management', {result})
})

// ADMIN

// http://localhost:3000/user/cpanel/list-admin
router.get('/list-admin', async function(req, res, next) {
    const result = await userController.getAllAdmin()
    res.render('user/admin-management', {result})
})

// http://localhost:3000/user/cpanel/search-admin
router.post('/search-admin', async function(req, res, next) {
    const {keyword} = req.body
    console.log("keyword: ",keyword)
    const result = await userController.searchAdmins(keyword)
    console.log("result: ",result)
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