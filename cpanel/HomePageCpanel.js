var express = require('express');
var router = express.Router();
const authen = require('../middleware/Authen')
const userController = require('../component/user/UserController')
const bookingController = require('../component/my_booking/MyBookingController')
const tourController = require('../component/tour/TourController')

// http://localhost:3000/home-page/cpanel/home
router.get('/home', [authen.checkTokenCpanel],async function(req, res) {
    const user = req.session.user
    
    try {
        const bookings = await bookingController.getAllBooking();
        const tours = await tourController.getAllTour();
        let totalPriceBooking = 0;
        let totalBooking = bookings.length; // số lượng booking
        for(let i = 0 ; i < bookings.length ; i++){
            totalPriceBooking = totalPriceBooking +  bookings[i].totalPrice; // tổng doanh thu
        }

        // let tour = [];
        // for(const i= 0 ;i < tours.length ; i++ ){
        //     if(tours[i]._id != bookings.tour_id){
        //         tour.push(tours[i]);
        //     }
        // }
        res.render('home-page/home', {user,totalPriceBooking, totalBooking});
    } catch (error) {
        next(error);
    }
    
});


// http://localhost:3000/home-page/cpanel/form
router.get('/form', [authen.checkTokenCpanel], function(req, res) {
    res.render('home-page/form');
});

// http://localhost:3000/home-page/cpanel/chart
router.get('/chart', [authen.checkTokenCpanel], function(req, res) {
    res.render('home-page/chart');
});

// http://localhost:3000/home-page/cpanel/profile
router.get('/profile', [authen.checkTokenCpanel], function(req, res) {
    const user = req.session.user
    console.log("user: ",user);
    res.render('home-page/profile', {user});
});

// http://localhost:3000/tour/cpanel/error404
router.get('/error404', function(req, res) {
    res.render('home-page/error404');
});





module.exports = router;