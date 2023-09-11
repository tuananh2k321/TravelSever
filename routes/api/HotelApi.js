var express = require('express');
var router = express.Router();
const hotelController = require('../../component/hotel/HotelController');

//http://localhost:3000/hotel/api/addHotel
router.post('/addHotel', async (req, res) => {
    try {
        const { hotelName, description, image, rating, address, phoneNumber, } = req.body;
        console.log(hotelName, description, image, rating, address, phoneNumber)
        const hotel = await hotelController.addHotel(hotelName, description, image, rating, address, phoneNumber,);
        if (hotel) {
            return res.status(200).json({ result: true, hotel: hotel, message: "Add hotel Success" });
        }
    } catch (error) {
        return res.status(400).json({ result: false, error: error, message: "Add hotel Failed" });
    }
})

module.exports = router;