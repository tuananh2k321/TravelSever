var express = require('express');
var router = express.Router();
const bookingController = require('../../component/my_booking/MyBookingController');

// http://localhost:3000/mybooking/api/

router.post('/add-booking', async (req, res) => {
    try {
        const { timestamp, user_id, tour_id } = req.body;

        const newBooking = await bookingController.addMyBooking(timestamp, user_id, tour_id);
        if (newBooking) {
            return res.status(200).json({ result: true, message: "Add boookg Success" });
        }
    } catch (error) {
        return res.status(400).json({ result: false, error: error, message: "Add booking Failed" });
    }
})
router.get('/list-booking', async (req, res, next) => {
    try {
        const booking = await bookingController.getListBooking();
        return res.status(200).json({ result: true, booking: booking });
    } catch (error) {
        console.log("List booking:" + error)
        return res.status(500).json({ result: false, massage: "Can't get list booking" })
    }
})


module.exports = router;
