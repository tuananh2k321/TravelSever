var express = require('express');
var router = express.Router();
const hotelController = require('../component/hotel/HotelController');


// http://localhost:3000/hotel/cpanel/hotel-table
router.get('/hotel-table', async function (req, res) {
    const hotels = await hotelController.getAllHotels();
    console.log('hotel', hotels)
    res.render('hotel/hotelTable', { hotels });
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
router.post('/add-hotel', async function (req, res, next) {
    try {
        let { hotelName, description, image, rating, address, phoneNumber } = req.body;
        await hotelController.addNewHotel(hotelName, description, image, rating, address, phoneNumber);
        return res.redirect('../../tour/cpanel/home');
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
        return res.redirect('../../tour/cpanel/home', {hotel});
    } catch (error) {
        console.log("Update new hotel error: ", error);
        next(error);
    }
});


// xử lí trang thêm cập nhật hotel
// http://localhost:3000/hotel/cpanel/update-hotel/64a94d4b8edee1be600646c2
router.put('/update-hotel/:id', async function (req, res, next) {
    try {
        let {id} = req.params;
        let { hotelName, description, image, rating, address, phoneNumber } = req.body;
        await hotelController.updateHotel(id, hotelName, description, image, rating, address, phoneNumber);
        return res.redirect('../../tour/cpanel/home');
    } catch (error) {
        console.log("Update new hotel error: ", error);
        next(error);
    }
});

module.exports = router;