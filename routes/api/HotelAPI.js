const express = require('express');
const router = express.Router();
const hotelController = require("../../component/hotel/HotelController");

//	http://localhost:3000/hotel/api

// lấy hết danh sách hotels
//	http://localhost:3000/hotel/api/get-all-hotels
router.get('/get-all-hotels',async (req, res, next) => {
    try {
        const hotels = await hotelController.getAllHotels();
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({hotels,returnData});
    } catch (error) {
        return res.status(400).json({});
    }
});

// lấy hết danh sách hotel bằng id
//	http://localhost:3000/hotel/api/get-all-hotels/:id
router.get('/get-all-hotels/:id',async (req, res, next) => {
    try {
        const {id} = req.params;
        const hotels = await hotelController.getHotelById(id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({hotels,returnData});
    } catch (error) {
        return res.status(400).json({});
    }
});

// lấy hết danh sách hotel bằng rating
//	http://localhost:3000/hotel/api/get-all-hotels?rate=5
router.get('/get-all-hotels',async (req, res, next) => {
    try {
        const {rate} = req.query;
        const hotels = await hotelController.getHotelByRating(rate);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({hotels,returnData});
    } catch (error) {
        return res.status(400).json({});
    }
});

// Thêm 1 hotel mới
//	http://localhost:3000/hotel/api/new-hotel
router.post('/new-hotel',async (req, res, next) => {
    try {
        const {hotelName, description, image, rating, address, phoneNumber} = req.body;
        const hotels = await hotelController.addNewHotel(hotelName, description, image, rating, address, phoneNumber);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({hotels,returnData});
    } catch (error) {
        console.log(error);
        return res.status(400).json({});
    }
});

module.exports = router;