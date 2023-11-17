var express = require('express');
var router = express.Router();
const bookingController = require('../../component/my_booking/MyBookingController');
const tourController = require('../../component/tour/TourController')

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



  // chart
// http://localhost:3000/booking/api/getAllBooking
router.get('/getAllBooking', async (req, res, next) => {
    try {
        const bookings = await bookingController.getAllBooking();
        let totalPriceBooking = 0;
        let totalBooking = bookings.length;
        for(let i = 0 ; i < bookings.length ; i++){
            totalPriceBooking = totalPriceBooking +  bookings[i].totalPrice;
           
        }
        res.status(200).json({ result: true, totalPriceBooking: totalPriceBooking,totalBooking : totalBooking, message: "Get booking Success" })
       // res.status(200).json({ result: true, totalPriceBooking:bookings, })
    } catch (error) {
        res.status(400).json({ result: false, error, message: "Get totalPrice Booking fail" })
    }
});


// http://localhost:3000/booking/api/tourIsBooking
router.get('/tourIsBooking', async (req, res, next) => {
    try {
        let dem = {};
        let ketQua = [];
        const bookings = await bookingController.getAllBooking();
        bookings.forEach(function (obj) {
            let keyString = obj['tour_id'].toString();
        //    let price = obj['totalPrice'].toString();
        if (dem[keyString]) {
            dem[keyString].soLan++;
            dem[keyString].totalPrice += obj['totalPrice']; // Assuming there is a 'price' property in your object
        } else {
            dem[keyString] = {
                soLan: 1,
                totalPrice: obj['totalPrice']
            };
        }
    });
          // Tạo đối tượng kết quả và thêm vào mảng kết quả
          for (let item in dem) {
            if (dem.hasOwnProperty(item)) {
                let resultObj = {
                    tour_id: item,
                    soLan: dem[item].soLan,
                    totalPrice: dem[item].totalPrice
                };
                ketQua.push(resultObj);
            }
        }

        
        res.status(200).json({ result: true, tourIsBooking: ketQua, message: "Get booking Success" })
    } catch (error) {
        res.status(400).json({ result: false, error, message: "Get totalPrice Booking fail" })
    }
});



module.exports = router;
