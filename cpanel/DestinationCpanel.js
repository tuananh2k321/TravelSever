var express = require('express');
var router = express.Router();
var tourController = require('../component/tour/TourController')


const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const appFirebase = require("../component/config/FirebaseConfig")
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();
const storageRef = ref(storage, 'tour/');
const multerStorage = multer.memoryStorage();
const uploadImage = multer({ storage: multerStorage });


module.exports = router;