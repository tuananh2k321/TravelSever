var express = require("express");
var router = express.Router();
const bookingController = require("../../component/my_booking/MyBookingController");
const bookingService = require("../../component/my_booking/MyBookingService");
const tourController = require("../../component/tour/TourController");
const tourModel = require("../../component/tour/TourModel");

// http://localhost:3000/booking/api/addBooking
router.post("/addBooking", async (req, res, next) => {
  try {
    const { name, children, adult, totalPrice, user_id, tour_id, guestInfo } =
      req.body;
    const booking = await bookingService.addMyBooking(
      name,
      children,
      adult,
      totalPrice,
      user_id,
      tour_id,
      guestInfo
    );
    console.log(booking);
    if (booking) {
      res.status(200).json({ result: true, message: "Add booking Success" });
    } else {
      res.status(400).json({ result: false, message: "Add booking fail" });
    }
  } catch (error) {
    res.status(400).json({ result: false, message: error });
  }
});

// http://localhost:3000/booking/api/addReason?id=""
router.post("/addReason", async (req, res, next) => {
  try {
    const { reason } = req.body;
    const { id } = req.query;
    const booking = await bookingService.addReason(id, reason);
    await bookingService.handleCanceledBooking(id);
    console.log(booking);
    if (booking) {
      res.status(200).json({ result: true, message: "Add reason Success" });
    } else {
      res.status(400).json({ result: false, message: "Add reason fail" });
    }
  } catch (error) {
    res.status(400).json({ result: false, message: error });
  }
});

// http://localhost:3000/booking/api/getListBooking?userID=6538c6fb748be49fbcde2a1f
router.get("/getListBooking", async (req, res, next) => {
  try {
    const { userID } = req.query;
    const booking = await bookingController.getListBooking(userID);
    console.log("check booking", booking);
    res
      .status(200)
      .json({ result: true, booking: booking, message: "Get booking Success" });
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get favorite fail" });
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
    return res
      .status(400)
      .json({ result: true, message: "Delete booking fail" });
  }
});

// http://localhost:3000/booking/api/get-All-Booking
router.get("/get-All-Booking", async (req, res, next) => {
  try {
    const reponse = await bookingController.getAllBooking();

    console.log("check booking", reponse[0].user_id);
    res
      .status(200)
      .json({ result: true, reponse, message: "Get booking Success" });
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get favorite fail" });
  }
});

// http://localhost:3000/booking/api/get-canceled-booking
router.get("/get-canceled-booking", async (req, res, next) => {
  try {
    const response = await bookingController.getAllBooking();

    // Lọc danh sách có response.isCancel === true
    const canceledBookings = response.filter(
      (booking) => booking.isCancel === true && booking.handleCancel === true
    );

    console.log("Canceled Bookings:", canceledBookings);

    res
      .status(200)
      .json({
        result: true,
        canceledBookings: canceledBookings,
        message: "Get canceled bookings success",
      });
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});

// cpanel
// http://localhost:3000/booking/api/get-new-booking-cpanel
router.get("/get-new-booking-cpanel", async (req, res, next) => {
  try {
    const response = await bookingController.getAllBooking();

    // Lọc danh sách có response.isCancel === true
    const newBookings = response.filter(
      (booking) => booking.confirm === false && booking.handleCancel === true
    );

    console.log("Canceled Bookings:", newBookings);

    res
      .status(200)
      .json({
        result: true,
        newBookings: newBookings,
        message: "Get new bookings success",
      });
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});

// http://localhost:3000/booking/api/get-handle-booking-app?idUser=""
router.get("/get-handle-booking-app", async (req, res, next) => {
  try {
    const { idUser } = req.query;
    const response = await bookingController.getBookingByIdUser(idUser);

    // Lọc danh sách có response.isCancel === true
    const newBookings = response.filter(
      (booking) => booking.confirm === false && booking.handleCancel === false
    );

    console.log("Canceled Bookings:", newBookings);

    res
      .status(200)
      .json({
        result: true,
        newBookings: newBookings,
        message: "Get new bookings success",
      });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});

// http://localhost:3000/booking/api/get-confirmed-booking-app?idUser=""
router.get("/get-confirmed-booking-app", async (req, res, next) => {
  try {
    const { idUser } = req.query;
    const response = await bookingController.getBookingByIdUser(idUser);

    // Lọc danh sách có response.isCancel === true
    const newBookings = response.filter(
      (booking) => booking.confirm === true && booking.handleCancel === false
    );

    console.log("Canceled Bookings:", newBookings);

    res
      .status(200)
      .json({
        result: true,
        newBookings: newBookings,
        message: "Get new bookings success",
      });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});

// http://localhost:3000/booking/api/get-handle-cancel-booking-app?idUser=""
router.get("/get-handle-cancel-booking-app", async (req, res, next) => {
  try {
    const { idUser } = req.query;
    const response = await bookingController.getBookingByIdUser(idUser);

    // Lọc danh sách có response.isCancel === true
    const newBookings = response.filter(
      (booking) => booking.handleCancel === true
    );

    console.log("Canceled Bookings:", newBookings);

    res
      .status(200)
      .json({
        result: true,
        newBookings: newBookings,
        message: "Get new bookings success",
      });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});

// http://localhost:3000/booking/api/cancel-required?id=""
router.get("/cancel-required", async (req, res, next) => {
  try {
    const { id } = req.query;
    const response = await bookingController.cancelRequired(id);
    if (response) {
      res.status(200).json({ result: true, message: " success" });
    } else {
      res.status(200).json({ result: true, message: " fail" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});

// http://localhost:3000/booking/api/get-confirmed-booking
router.get("/get-confirmed-booking", async (req, res, next) => {
  try {
    const response = await bookingController.getAllBooking();

    // Lọc danh sách có response.isCancel === true
    const newBookings = response.filter((booking) => booking.confirm === false);

    console.log("Canceled Bookings:", newBookings);

    res
      .status(200)
      .json({
        result: true,
        newBookings: newBookings,
        message: "Get new bookings success",
      });
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});

// http://localhost:3000/booking/api/get-uncompleted-booking
router.get("/get-uncompleted-booking", async (req, res, next) => {
  try {
    const response = await bookingController.getCompletedBooking();

    // Lọc danh sách có response.isCancel === true
    const completedBookings = await response.filter(
      (booking) => booking.isCompleted === false
    );

    console.log("departmentDate:", completedBookings[0].tour_id.departmentDate);
    console.log(
      "expectedDate:",
      completedBookings[0].tour_id.departmentDate +
        completedBookings[0].tour_id.limitedDay.match(/\d+/)
    );
    res
      .status(200)
      .json({
        result: true,
        completedBookings: completedBookings,
        message: "Get completed bookings success",
      });
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});

// http://localhost:3000/booking/api/get-completed-booking
router.get("/get-completed-booking", async (req, res, next) => {
    try {
      const response = await bookingController.getCompletedBooking();
  
      // Lọc danh sách có response.isCancel === true
      const completedBookings = await response.filter(
        (booking) => booking.isCompleted === true
      );
  
    //   console.log("departmentDate:", completedBookings[0].tour_id.departmentDate);
    //   console.log(
    //     "expectedDate:",
    //     completedBookings[0].tour_id.departmentDate +
    //       completedBookings[0].tour_id.limitedDay.match(/\d+/)
    //   );
      res
        .status(200)
        .json({
          result: true,
          completedBookings: completedBookings,
          message: "Get completed bookings success",
        });
    } catch (error) {
      res
        .status(400)
        .json({ result: false, error, message: "Get bookings failed" });
    }
  });

// chart
// http://localhost:3000/booking/api/getAllBooking
router.get("/getAllBooking", async (req, res, next) => {
  try {
    const bookings = await bookingController.getAllTourBooking();
    let totalPriceBooking = 0;
    let totalBooking = bookings.length;
    for (let i = 0; i < bookings.length; i++) {
      totalPriceBooking = totalPriceBooking + bookings[i].totalPrice;
    }
    res.status(200).json({result: true,totalPriceBooking: totalPriceBooking,totalBooking: totalBooking,message: "Get booking Success",});
    // res.status(200).json({ result: true, totalPriceBooking:bookings, })
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get totalPrice Booking fail" });
  }
});

// http://localhost:3000/booking/api/tourIsBooking
router.get("/tourIsBooking", async (req, res, next) => {
  try {
    let dem = {};
    let ketQua = [];
    const bookings = await bookingController.getAllTourBooking();
    const tours = await tourController.getAllTour();
    bookings.forEach(function (obj) {
      let keyString = obj["tour_id"].toString();
      //    let price = obj['totalPrice'].toString();
      if (dem[keyString]) {
        dem[keyString].soLan++;
        dem[keyString].totalPrice += obj["totalPrice"]; // Assuming there is a 'price' property in your object
      } else {
        dem[keyString] = {
          soLan: 1,
          totalPrice: obj["totalPrice"],
        };
      }
    });
    // Tạo đối tượng kết quả và thêm vào mảng kết quả
    for (let item in dem) {
      if (dem.hasOwnProperty(item)) {
        let resultObj = {
          tour_id: item,
          soLan: dem[item].soLan,
          totalPrice: dem[item].totalPrice,
        };
        // Tìm tên tour dựa vào _id (hoặc tour_id) từ collection Tour
        const tour = tours.find((t) => t._id == item);
        if (tour) {
          resultObj.tour_name = tour.tourName;
        }

        ketQua.push(resultObj);
      }
    }

    //  Sort the ketQua array based on totalPrice in descending order
    ketQua.sort((a, b) => b.totalPrice - a.totalPrice);

    // Get the tour_id with the highest totalPrice
    const highestTotalPriceTourId =
      ketQua.length > 0 ? ketQua[0].tour_name : null;

    // Now highestTotalPriceTourId contains the tour_id with the highest totalPrice
    console.log(
      "Tour ID with the highest totalPrice:",
      highestTotalPriceTourId
    );
    console.log("Tour ID with the highest totalPrice:", ketQua);

    res
      .status(200)
      .json({
        result: true,
        tourIsBooking: ketQua,
        top: highestTotalPriceTourId,
        message: "Get booking Success",
      });
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get totalPrice Booking fail" });
  }
});

// http://localhost:3000/booking/api/tourIsBooking
router.get("/tourIsBooking/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookings = bookingController.tourIsBooking(id);
    const soLan = (await bookings).length;
    res
      .status(200)
      .json({ result: true, soLan: soLan, message: "Get booking Success" });
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get totalPrice Booking fail" });
  }
});

// http://localhost:3000/booking/api/getBookingById?id=""
router.get("/getBookingById", async (req, res, next) => {
  try {
    const { id } = req.query;
    const booking = await bookingController.getBookingById(id);
    // console.log('Booking: '+ booking)
    if (booking) {
      res
        .status(200)
        .json({
          result: true,
          booking: booking,
          message: "Get booking Success",
        });
    } else {
      res
        .status(200)
        .json({ result: false, booking: null, message: "Get booking fail" });
    }
  } catch (error) {
    res.status(400).json({ result: false, error, message: error });
  }
});

module.exports = router;
