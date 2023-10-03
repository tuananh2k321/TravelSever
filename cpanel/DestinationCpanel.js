var express = require('express');
var router = express.Router();
var destinationController = require("../component/destination/DestinationController");

const authen = require('../middleware/Authen')

const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const appFirebase = require("../component/config/FirebaseConfig")
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();
const storageRef = ref(storage, 'tour/');
const multerStorage = multer.memoryStorage();
const uploadImage = multer({ storage: multerStorage });

//http://localhost:3000/destination/cpanel/get-destination
router.get("/get-destination", [authen.checkTokenCpanel], async (req, res, next) => {
    const destinations = await destinationController.getAllDestination();
    res.render('destination/destinationTable', { destinations });
})

router.get('/:id/delete', [authen.checkTokenCpanel], async (req, res, next) => {
    try {
        const { id } = req.params;
        await destinationController.deleteDesById(id);
        return res.json({ status: true })
    } catch (error) {
        return res.json({ status: false })
    }
})

//http://localhost:3000/destination/cpanel/insert-destination
router.get('/insert-destination', [authen.checkTokenCpanel], async (req, res, next) => {
    res.render('destination/insertdestination',);
});

router.post('/insert-destination', [uploadImage.array('mainImage', 10)], async (req, res, next) => {
    try {
        let { body, files } = req;
        let mainImage = [];


        if (files && files.length > 0) {
            const uploadedImagePromises = files.map(async (file) => {
                const filename = `${Date.now()}-${file.originalname}`;
                const fileRef = ref(storageRef, filename);

                const metadata = {
                    contentType: file.mimetype,
                };

                const snapshot = await uploadBytesResumable(fileRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);

                console.log(`File ${file.originalname} successfully uploaded to Firebase Storage.`);

                return downloadURL;
            });

            mainImage = await Promise.all(uploadedImagePromises);
        }

        let { destinationName, content, address } = body;
        console.log(destinationName, content, mainImage, address);
        await destinationController.addNewDestination(destinationName, content, mainImage, address);
        return res.render('destination/destinationTable');
    } catch (error) {
        console.log('Add new  error:', error);
        next(error);
    }
})

router.get("/:id/edit-destination", [authen.checkTokenCpanel], async (req, res, next) => {
    try {
        const { id } = req.params;
        const destination = await destinationController.getDesById(id);
        console.log(destination);
        res.render('destination/editdestination', { destination });
    } catch (error) {
        console.log('edit new  error:', error);
        next(error);
    }
})

router.post('/:id/edit-destination', [uploadImage.array('mainImage', 10),], async function (req, res, next) {
    try {
        let { body, files } = req;
        const { id } = req.params;
        let mainImage = [];


        if (files && files.length > 0) {
            const uploadedImagePromises = files.map(async (file) => {
                const filename = `${Date.now()}-${file.originalname}`;
                const fileRef = ref(storageRef, filename);

                const metadata = {
                    contentType: file.mimetype,
                };

                const snapshot = await uploadBytesResumable(fileRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);

                console.log(`File ${file.originalname} successfully uploaded to Firebase Storage.`);

                return downloadURL;
            });

            mainImage = await Promise.all(uploadedImagePromises);
        }
        let { destinationName, content, address } = body;

        await destinationController.updateDestination(id, destinationName, content, mainImage, address);
        return res.render('destination/destinationTable');
    } catch (error) {
        console.log("Update hotel error: ", error);
        next(error);
    }
});


module.exports = router;