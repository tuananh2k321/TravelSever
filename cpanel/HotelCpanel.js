var express = require('express');
var router = express.Router();
const hotelController = require('../component/hotel/HotelController');
const uploadImage = require('../middleware/UpLoadImage');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



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
router.post('/add-hotel', [uploadImage.single('image'),], async function (req, res, next) {
    try {
        let {body, file} = req;
        if(file) {
            let image = `http://192.168.1.7:3000/images/${file.filename}`;
            body = {...body, image: image};
        }
        let { hotelName, description, image, rating, address, phoneNumber } =body;
        console.log("Add hotel: " ,hotelName, description, image, rating, address, phoneNumber)
        // image = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
        await hotelController.addNewHotel(hotelName, description, image, rating, address, phoneNumber);
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
router.post('/update-hotel/:id',[uploadImage.single('image'),], async function (req, res, next) {
    try {
        let {id} = req.params;
        let {body, file} = req;
        if(file) {
            let image = `http://192.168.1.7:3000/images/${file.filename}`;
            body = {...body, image: image};
        }
        let { hotelName, description, image, rating, address, phoneNumber } = body;
        console.log("=====> All pẩm: ", hotelName, description, image, rating, address, phoneNumber);
        await hotelController.updateHotel(id, hotelName, description, image, rating, address, phoneNumber);
        return res.redirect('/hotel/cpanel/hotel-table');
    } catch (error) {
        console.log("Update hotel error: ", error);
        next(error);
    }
});

module.exports = router;