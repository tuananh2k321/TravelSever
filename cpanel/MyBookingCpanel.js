var express = require('express');
var router = express.Router();
var MyBookingController = require('../component/my_booking/MyBookingController')
const authen = require('../middleware/Authen')

router.get('/all-my-booking', [authen.checkTokenCpanel], async(req, res, next)=>{
    const allMybooking = await MyBookingController.getAllBooking();
    const user = req.session.user;
    res.render('mybooking/mybookingTable', {allMybooking, user})
})

module.exports = router;