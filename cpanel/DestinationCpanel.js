var express = require('express');
var router = express.Router();
var destinationController = require("../component/destination/DestinationController");

const authen = require('../middleware/Authen')
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");

const multer = require("multer");
 const appFirebase = require("../component/config/FirebaseConfig")
// // Initialize Cloud Storage and get a reference to the service
const storage = getStorage();
const storageRef = ref(storage, 'destination/');
const multerStorage = multer.memoryStorage();
const uploadImage = multer({ storage: multerStorage });

//http://localhost:3000/destination/cpanel/get-destination
router.get("/get-destination", [authen.checkTokenCpanel], async (req, res, next) => {
    const user = req.session.user;
    const destinations = await destinationController.getAllDestination();
    res.render('destination/destinationTable', { destinations, user });
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
    const user = req.session.user;
    res.render('destination/insertdestination', {user});
});

router.post('/insert-destination', [uploadImage.array('destinationImage',10)], async (req, res, next) => {
    try {
         const contentData = req.body;
         const contents = [];

         // Xử lý và lưu hình ảnh lên Firebase Storage
        
         
        // for (let i = 1; i <= 5; i++) {
        //     const destinationImage = req.body[`destinationImage${i}`];
        //     const description = req.body[`description${i}`];

        //     if (files && files.length > 0) {
        //         const uploadedImagePromises = files.map(async (file) => {
        //             const filename = `${Date.now()}-${file.originalname}`;
        //             const fileRef = ref(storageRef, filename);
    
        //             const metadata = {
        //                 contentType: file.mimetype,
        //             };
    
        //             const snapshot = await uploadBytesResumable(fileRef, file.buffer, metadata);
        //             const downloadURL = await getDownloadURL(snapshot.ref);
    
        //             console.log(`File ${file.originalname} successfully uploaded to Firebase Storage.`);
    
        //             return downloadURL;
        //         });
    
        //         destinationImage = await Promise.all(uploadedImagePromises);
        //     }
            
      

        // console.log('File successfully uploaded.');
        //     if (destinationImage && description ) {
        //         contents.push({ destinationImage, description });
        //     }
        // }
        for(let i = 0 ; i < contentData.description.length ; i++){
            const imageFile = req.files[i];
            let destinationImage = "";
            const description = contentData.description[i];
                // Lưu hình ảnh lên Firebase Storage
            
            const filename = `${Date.now()}-${imageFile.originalname}`;
            const fileRef = ref(storageRef, filename);
            const metadata = {
            contentType: imageFile.mimetype,
            };

            const snapshot = await uploadBytesResumable(fileRef, imageFile.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log(`File ${imageFile.originalname} successfully uploaded to Firebase Storage.`);

            // const content ={
            //     destinationName:contentData.destinationName,
            //     content :{
            //         data:[
            //             {
            //                 destinationImage:downloadURL,
            //                 description:contentData.description[i],
            //             }
            //         ]
            //     },
            //     address:contentData.address,
            //     area:contentData.area
            // };
               
         //   contents.push(content);
         
                   
         destinationImage = downloadURL;
               
        
            if (destinationImage && description ) {
                contents.push({ destinationImage, description });
             }
        }
        
       // Xóa tệp tạm sau khi tải lên
            // for (let i = 0; i < contentData.description.length; i++) {
            //     fs.unlink(req.files[i].tempFilePath, (err) => {
            //     if (err) {
            //         console.error('Lỗi khi xóa tệp tạm:', err);
            //     }
            //     });
            // }
            await destinationController.addNewDestination(contentData.destinationName , contents , contentData.address , contentData.area);
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
        const user = req.session.user;
        console.log(destination);
        res.render('destination/editdestination', { destination, user });
    } catch (error) {
        console.log('edit new  error:', error);
        next(error);
    }
})

router.post('/:id/edit-destination', [uploadImage.array('mainImage', 10)], async function (req, res, next) {
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
        let { destinationName, content, address,area } = body;

        await destinationController.updateDestination(id, destinationName, content, mainImage, address,area);
        return res.render('destination/destinationTable');
    } catch (error) {
        console.log("Update hotel error: ", error);
        next(error);
    }
});


module.exports = router;