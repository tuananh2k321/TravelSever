var express = require('express');
var router = express.Router();
const hotelController = require('../component/hotel/HotelController');
// const uploadImage = require('../middleware/UpLoadImage');
const validation = require('../middleware/Validation');

const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const appFirebase = require("../component/config/FirebaseConfig")
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();
const storageRef = ref(storage, 'hotel/');
const multerStorage = multer.memoryStorage();
const uploadImage = multer({ storage: multerStorage });

// http://localhost:3000/hotel/cpanel/hotel-table
router.get('/hotel-table', async function (req, res) {
    const hotels = await hotelController.getAllHotels();
    res.render('hotel/hotelTable', { hotels });
});

// http://localhost:3000/hotel/cpanel/insert-form
router.get('/insert-form', async function (req, res) {
    res.render('hotel/formInsert',);
});

// http://localhost:3000/hotel/cpanel/delete-hotel/:id
router.get('/delete-hotel/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        await hotelController.removeHotel(id);
        return res.json({ status: 200 });
    } catch (error) {
        console.log("Delete hotel error: ", error);
        return res.json({ status: 400 });
    }
});

// xử lí trang thêm mới hotel
// http://localhost:3000/hotel/cpanel/add-hotel
router.post('/add-hotel', [uploadImage.array('listImage',10), validation.checkFormHotel], async function (req, res, next) {
    try {
        let {body,files} = req;
         let listImage = [];

         
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
      
            listImage = await Promise.all(uploadedImagePromises);
          }
        let { hotelName, description, rating, address, phoneNumber } =body;
        console.log("Add hotel: " ,hotelName, description, rating, listImage, address, phoneNumber)
        // image = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
        await hotelController.addNewHotel(hotelName, description, rating, listImage, address, phoneNumber);
        return res.redirect('/hotel/cpanel/hotel-table');
    } catch (error) {
        console.log("Add new hotel error: ", error);
        next(error);
    }
});

// hiển thị trang thêm cập nhật hotel
// http://localhost:3000/hotel/cpanel/update-hotel/64a94d4b8edee1be600646c2
router.get('/update-hotel/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const hotel = await hotelController.getHotelById(id);
        console.log("Hotel update id: ", hotel);
        res.render('hotel/formEdit', {hotel});
    } catch (error) {
        console.log("Update new hotel error: ", error);
        next(error);
    }
});

// xử lí trang cập nhật hotel
// http://localhost:3000/hotel/cpanel/update-hotel/64a94d4b8edee1be600646c2
router.post('/update-hotel/:id',[uploadImage.array('listImage',10), validation.checkFormHotel], async function (req, res, next) {
    try {
        let {body,files} = req;
        const {id} = req.params;
         let listImage = [];

         
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
      
            listImage = await Promise.all(uploadedImagePromises);
          }
        let { hotelName, description, rating, address, phoneNumber } = body;
        console.log("=====> All pẩm: ",id, hotelName, description, rating, listImage, address, phoneNumber);
        await hotelController.updateHotel(id, hotelName, description, rating, listImage, address, phoneNumber);
        return res.redirect('/hotel/cpanel/hotel-table');
    } catch (error) {
        console.log("Update hotel error: ", error);
        next(error);
    }
});

// lấy danh sách hotel theo tên hoac theo dia chi
// http://localhost:3000/hotel/cpanel/get-all-hotels/search/keyword?keyword=abc
router.get("/search", async (req, res, next) => {
    try {
        const {keyword} = req.query;
        if(keyword == null) {
            return res.render('hotel/hotelTable');
        }else {
            const hotels = await hotelController.searchHotelName(keyword);
            res.render('hotel/hotelTable',{hotels});
        }
    } catch (error) {
        console.log("search error ", error);
        next(error);
    }
});

module.exports = router;