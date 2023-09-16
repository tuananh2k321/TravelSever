var express = require('express');
var router = express.Router();
const hotelController = require('../../component/hotel/HotelController');
const { getAllHotels } = require('../../component/hotel/HotelService');

//http://localhost:3000/hotel/api/addHotel
router.post('/addHotel', async (req, res, next) => {
    try {
        const { hotelName, description, image, rating, address, phoneNumber, } = req.body;
        console.log(hotelName, description, image, rating, address, phoneNumber)
        const hotel = await hotelController.addNewHotel(hotelName, description, image, rating, address, phoneNumber);
        return res.status(200).json({ result: true, hotel: hotel, message: "Add hotel Success" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, error: error, message: "Add hotel Failed" });
    }
})

// cập nhật hotels
// http://localhost:3000/hotel/api/update-hotel/64a94d4b8edee1be600646c2
router.put('/update-hotel/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {hotelName, description, image, rating, address, phoneNumber, } = req.body;
        console.log(id, hotelName, description, image, rating, address, phoneNumber)
        const hotel = await hotelController.updateHotel(id, hotelName, description, image, rating, address, phoneNumber);
        return res.status(200).json({ result: true, hotel: hotel, message: "Update hotel Success" });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, error: error, message: "Update hotel Failed" });
    }
})

// Xóa hotel
// http://localhost:3000/hotel/api/delete-hotel/64a94eeb8edee1be600646c4
router.delete('/delete-hotel/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const hotel = await hotelController.removeHotel(id);
        return res.status(200).json({ result: true, hotel: hotel, message: "Delete hotel Success" });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, error: error, message: "Delete hotel Failed" });
    }
})

// Lấy danh sách hotels
// http://localhost:3000/hotel/api/get-all-hotels
router.get("/get-all-hotels", async (req, res) => {
    try {
        const hotels = await hotelController.getAllHotels();
        return res.status(200).json({ result: true, hotels: hotels, message: "Get All list hotel Successfully" });
    } catch (error) {
        return res.status(400).json({ result: false, hotels: [], message: "Get All list hotel Failed" });
    }
});

// lấy danh sách hotel theo id
// http://localhost:3000/hotel/api/get-all-hotels/65001f25c369188783fc4dd1
router.get("/get-all-hotels/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const hotels = await hotelController.getHotelById(id);
        return res.status(200).json({ result: true, hotels: hotels, message: "Get list hotel Successfully" });
    } catch (error) {
        return res.status(400).json({ result: false, hotels: [], message: "Get list hotel Failed" });
    }
});

// lấy danh sách hotel theo rating
// http://localhost:3000/hotel/api/get-all-hotels/search/rating?rating=3
router.get("/get-all-hotels/search/rating", async (req, res, next) => {
    try {
        const {rating} = req.query;
        let rate = parseInt(rating);
        const hotels = await hotelController.getHotelByRating(rate);
        return res.status(200).json({ result: true, hotels: hotels, message: "Get All list hotel by rating Successfully" });
    } catch (error) {
        return res.status(400).json({ result: false, hotels: [], message: "Get All list hotel by rating Failed" });
    }
});

module.exports = router;