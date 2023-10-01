var express = require('express');
var router = express.Router();
const tourGuideController = require('../component/tourGuide/TourGuideController');
// const uploadImage = require('../middleware/UpLoadImage');
const validation = require('../middleware/Validation');
const authen = require('../middleware/Authen')

const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const appFirebase = require("../component/config/FirebaseConfig")
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();
const storageRef = ref(storage, 'hotel/');
const multerStorage = multer.memoryStorage();
const uploadImage = multer({ storage: multerStorage });

// http://localhost:3000/tourguide/cpanel/tour-guide

router.get('/tour-guide', [authen.checkTokenCpanel], async function (req, res) {
    const tourGuides = await tourGuideController.getAllTourGuide();
    console.log('tourGuides>>>>>', tourGuides)
    const user = req.session.user;
    res.render('tour-guide/touGuideTable', { tourGuides, user });
});

// http://localhost:3000/tourguide/cpanel/insert-form


router.get('/insert-form', [authen.checkTokenCpanel], async function (req, res) {
    const user = req.session.user;
    res.render('tour-guide/formInsert', { user });
});

// hiển thị trang chi tiet hotel
// http://localhost:3000/hotel/cpanel/detail-hotel/6513010dd9a0f3bd36583d8e
router.get('/detail-hotel/:id', [authen.checkTokenCpanel], async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = req.session.user;
        const hotel = await hotelController.getHotelById(id);
        console.log("Hotel update id: ", hotel);
        res.render('hotel/cardDetail', { hotel, user });
    } catch (error) {
        console.log("Get detail hotel error: ", error);
        next(error);
    }
});

// http://localhost:3000/tourguide/cpanel/delete-tourguide/:id
router.get('/delete-tourguide/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        await tourGuideController.removeTourGuide(id);
        return res.json({ status: 200 });
    } catch (error) {
        console.log("Delete tourguide error: ", error);
        return res.json({ status: 400 });
    }
});

// xử lí trang thêm mới tour-guide
//http://localhost:3000/tourguide/cpanel/add-tour-guide
router.post('/add-tour-guide', async function (req, res, next) {
    try {
        let { body, files } = req;
        let { name, phoneNumber, email, avatar, workPlaces } = body;
        console.log("Add tour guide: ", name, phoneNumber, email, avatar, workPlaces)
        // image = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
        await tourGuideController.createNewTourGuide(name, phoneNumber, email, avatar, workPlaces);
        return res.redirect('/tourguide/cpanel/tour-guide');
    } catch (error) {
        console.log("Add tour guide error: ", error);
        next(error);
    }
});

// hiển thị trang thêm cập nhật tourguide
// http://localhost:3000/tourguide/cpanel/update-tourguide/64a94d4b8edee1be600646c2
router.get('/update-tourguide/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = req.session.user;
        const tourguide = await tourGuideController.getTourGuide(id);
        console.log("tourguide update id: ", tourguide);
        res.render('tour-guide/formEdit', { tourguide, user });
    } catch (error) {
        console.log("Update new hotel error: ", error);
        next(error);
    }
});

// xử lí trang cập nhật tourguide
// http://localhost:3000/tourguide/cpanel/update-tourguide/64a94d4b8edee1be600646c2
router.post('/update-tourguide/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        let { body, files } = req;
        let { name, phoneNumber, email, avatar, workPlaces } = body;
        console.log("Add tour guide: ", id, name, phoneNumber, email, avatar, workPlaces)
        // image = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
        await tourGuideController.updateTourGuide(id, name, phoneNumber, email, avatar, workPlaces);
        return res.redirect('/tourguide/cpanel/tour-guide');
    } catch (error) {
        console.log("Update tour guide error: ", error);
        next(error);
    }
});

// lấy danh sách hotel theo tên hoac theo dia chi
// http://localhost:3000/hotel/cpanel/get-all-hotels/search/keyword?keyword=abc
router.get("/search", [authen.checkTokenCpanel], async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const user = req.session.user;
        if (keyword == null) {
            return res.render('hotel/hotelTable');
        } else {
            const hotels = await hotelController.searchHotelName(keyword);
            res.render('hotel/hotelTable', { hotels, user });
        }
    } catch (error) {
        console.log("search error ", error);
        next(error);
    }
});

module.exports = router;