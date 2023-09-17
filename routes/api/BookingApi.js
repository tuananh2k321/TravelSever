var express = require('express');
var router = express.Router();
const bookingController = require('../../component/my_booking/MyBookingController');

// http://localhost:3000/mybooking/api/



router.post('/addBooking', async (req, res, next) => {
    try {
        const { timestamp, user_id, tour_id } = req.body;
        await bookingController.addMyBooking(timestamp, user_id, tour_id);
        res.status(200).json({ result: true, message: "Add booking Success" })
    } catch (error) {
        res.status(400).json({ result: false, message: "Add booking fail" })
    }
});

router.get('/getListBooking', async (req, res, next) => {
    try {
        const booking = await bookingController.getListBooking();
        console.log("check booking", booking);
        res.status(200).json({ result: true, booking: booking, message: "Get booking Success" })
    } catch (error) {
        res.status(400).json({ result: false, error, message: "Get favorite fail" })
    }
});

module.exports = router;
