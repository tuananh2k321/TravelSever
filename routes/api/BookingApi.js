var express = require('express');
var router = express.Router();
const bookingController = require('../../component/my_booking/MyBookingController');

// http://localhost:3000/booking/api/addBooking
router.post('/addBooking', async (req, res, next) => {
    try {
        const { name, children, adult, totalPrice, user_id, tour_id } = req.body;
        await bookingController.addMyBooking(name, children, adult, totalPrice, user_id, tour_id);
        res.status(200).json({ result: true, message: "Add booking Success" })
    } catch (error) {
        res.status(400).json({ result: false, message: "Add booking fail" })
    }
});
// http://localhost:3000/booking/api/getListBooking?userID=6538c6fb748be49fbcde2a1f
router.get('/getListBooking', async (req, res, next) => {
    try {
        const {userID} = req.query;
        const booking = await bookingController.getListBooking(userID);
        console.log("check booking", booking);
        res.status(200).json({ result: true, booking: booking, message: "Get booking Success" })
    } catch (error) {
        res.status(400).json({ result: false, error, message: "Get favorite fail" })
    }
});

router.delete("/deleteBooking/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await bookingController.deleteBookingbyID(id);
      return res
        .status(200)
        .json({ result: true, message: "Delete booking Success" });
    } catch (error) {
      return res.status(400).json({ result: true, message: "Delete booking fail" });
    }
  });

module.exports = router;
