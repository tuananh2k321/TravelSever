var express = require('express');
var router = express.Router();
var MyBookingController = require('../component/my_booking/MyBookingController')
const authen = require('../middleware/Authen')

const notificationService= require("../component/notification/NotificationService");
const tokenController = require("../component/token-notification/TokenService");
const serviceAccount = require('../component/notification/travelapp-3e538-firebase-adminsdk-5rk78-49812ee71f.json');
const admin = require('firebase-admin');
const bookingService = require("../component/my_booking/MyBookingService");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     messagingSenderId: '579542678002'
//   });

//http://localhost:3000/booking/cpanel/push-notification-feedback?userId=""&tourId=""&bookingId=""
router.get("/push-notification-feedback", async (req, res, next) => {
  try {
    const { userId, tourId, bookingId } = req.query;
    const tokens = await tokenController.getTokenByUserId(userId);
    const tokensArray = tokens.map((tokenObj) => tokenObj.token);
    console.log(tokensArray);

    const currentTime = new Date().toLocaleTimeString();
    const message = {
      notification: {
        title: "Phản hồi của khách hàng!",
        body: "Hãy ghi ra những trải nghiệm trong chặng hành trình của bạn!",
      },
      data: {
        score: "850",
        time: currentTime,
      },
      tokens: tokensArray,
    };

    const image = 'https://firebasestorage.googleapis.com/v0/b/travelapp-3e538.appspot.com/o/user-avatar%2Flogo.png?alt=media&token=94c7da08-1361-4b42-9f7c-b993c03b85f1'
    const title = "Phản hồi của khách hàng!"
    const content = "Hãy ghi ra những trải nghiệm trong chặng hành trình của bạn!"
    const timeStamp = currentTime
    const type = "feedback"
    const notification = await notificationService.addNotification(image, title, content, timeStamp,type, userId, tourId)
    await bookingService.completedBooking(bookingId)
    console.log(notification)
    if (notification) {
        const response = await admin.messaging().sendEachForMulticast(message);
        console.log("Successfully sent message:", response);
        res.status(200).json({ result: true, notification: notification, message: "success" });
      } else {
        res.status(400).json({ result: true, notification: null, message: "fail" });
      }
      
      
    } catch (error) {
      console.log("Error sending message:", error);
      res.status(400).json({ result: false, error: error, message: "fail" });
    }
});

router.get('/all-my-booking', [authen.checkTokenCpanel], async(req, res, next)=>{
    const allMybooking = await MyBookingController.getAllBooking();
    const user = req.session.user;
    res.render('mybooking/mybookingTable', {allMybooking, user})
})


//http://localhost:3000/booking/cpanel/push-notification-confirm?userId=""&tourId=""&id=""
router.get("/push-notification-confirm", async (req, res, next) => {
  try {
    const { userId, tourId, id } = req.query;
    const tokens = await tokenController.getTokenByUserId(userId);
    const tokensArray = tokens.map((tokenObj) => tokenObj.token);
    console.log(tokensArray);

    const currentTime = new Date().toLocaleTimeString();
    const message = {
      notification: {
        title: "Đặt tour thành công!",
        body: "Chúc bạn có 1 chuyến đi tốt đẹp",
      },
      data: {
        score: "850",
        time: currentTime,
      },
      tokens: tokensArray,
    };

    const image = 'https://firebasestorage.googleapis.com/v0/b/travelapp-3e538.appspot.com/o/user-avatar%2Flogo.png?alt=media&token=94c7da08-1361-4b42-9f7c-b993c03b85f1'
    const title = "Đặt tour thành công!"
    const content = "Chúc bạn có 1 chuyến đi tốt đẹp"
    const timeStamp = currentTime
    const type = "confirm"
    const notification = await notificationService.addNotification(image, title, content, timeStamp,type, userId, tourId)
    await bookingService.confirmBooking(id)
    console.log(notification)
    if (notification) {
      const response = await admin.messaging().sendEachForMulticast(message);
      //console.log("Successfully sent message:", response);
      res.status(200).json({ result: true, notification: notification, message: "success" });
    } else {
      res.status(400).json({ result: true, notification: null, message: "fail" });
    }
    
    
  } catch (error) {
    console.log("Error sending message:", error);
    res.status(400).json({ result: false, error: error, message: "fail" });
  }
});



//http://localhost:3000/booking/cpanel/push-notification-delete?userId=""&tourId=""&id=""
router.get("/push-notification-delete", async (req, res, next) => {
  try {
    const { userId, tourId, id } = req.query;
    const tokens = await tokenController.getTokenByUserId(userId);
    const tokensArray = tokens.map((tokenObj) => tokenObj.token);
    console.log(tokensArray);

    const currentTime = new Date().toLocaleTimeString();
    const message = {
      notification: {
        title: "Hủy tour thành công!",
        body: "Hãy sớm đặt lại tour nhé!",
      },
      data: {
        score: "850",
        time: currentTime,
      },
      tokens: tokensArray,
    };

    const image = 'https://firebasestorage.googleapis.com/v0/b/travelapp-3e538.appspot.com/o/user-avatar%2Flogo.png?alt=media&token=94c7da08-1361-4b42-9f7c-b993c03b85f1'
    const title = "Hủy tour thành công!"
    const content = "Hãy sớm đặt lại tour nhé!"
    const timeStamp = currentTime
    const type = "delete"
    const notification = await notificationService.addNotification(image, title, content, timeStamp,type, userId, tourId)
    await bookingService.deleteBooking(id)
    console.log(notification)
    if (notification) {
      const response = await admin.messaging().sendEachForMulticast(message);
      //console.log("Successfully sent message:", response);
      res.status(200).json({ result: true, notification: notification, message: "success" });
    } else {
      res.status(400).json({ result: true, notification: null, message: "fail" });
    }
    
    
  } catch (error) {
    console.log("Error sending message:", error);
    res.status(400).json({ result: false, error: error, message: "fail" });
  }
});



// cpanel
// http://localhost:3000/booking/cpanel/get-new-booking-cpanel
router.get('/get-new-booking-cpanel', [authen.checkTokenCpanel], async (req, res, next) => {
  try {
      const response = await MyBookingController.getAllBooking();

      // Lọc danh sách có response.isCancel === true
      const newBookings = response.filter(booking => booking.confirm === false && booking.handleCancel === false && booking.isCompleted == false && booking.isCancel === false);

      console.log("Canceled Bookings:", newBookings);

      const user = req.session.user;
    res.render('mybooking/bookingConfirmTable', {newBookings, user})
  } catch (error) {
      res.status(400).json({ result: false, error, message: "Get bookings failed" });
  }
});

// http://localhost:3000/booking/cpanel/getBookingById?id=""
router.get('/getBookingById', async (req, res, next) => {
  try {
      const { id } = req.query;
      const booking = await MyBookingController.getBookingById(id);
      const user = req.session.user;
      // console.log('Booking: '+ booking)
      if (booking) {
        res.render('mybooking/bookingDetail', { booking, user});
      } else {
          res.status(200).json({ result: false, booking: null, message: "Get booking fail" })
      }

  } catch (error) {
      res.status(400).json({ result: false, error, message: error })
  }
});

// http://localhost:3000/booking/api/get-confirmed-booking-cpanel
router.get("/get-confirmed-booking-cpanel", async (req, res, next) => {
  try {
    const response = await MyBookingController.getCompletedBooking();

    // Lọc danh sách có response.isCancel === true
    const completedBookings = response.filter(
      (booking) => booking.confirm === true && booking.handleCancel === false && booking.isCancel === false
    );

    // Lọc theo điều kiện departmentdate > date now < expectedDate
    const currentDate = new Date();
      console.log("currentDate:", currentDate)
    const filteredBookings = completedBookings.filter((booking) => {
      // departmentDate
      const [day, month, year] = booking.departmentDate.split('/');
      const adjustedMonth = parseInt(month, 10) - 1; // Adjust for zero-based month
      const adjustedDay = parseInt(day, 10) + 1; // Adjust for zero-based day
      const departmentDate = new Date(year, adjustedMonth, adjustedDay);
      
      
      return  currentDate < departmentDate  ;
    });

    const user = req.session.user;

    res.render('mybooking/bookingTrue', { filteredBookings, user});

  } catch (error) {
    res.status(400).json({ result: false, error, message: "Get bookings failed" });
  }
});

// http://localhost:3000/booking/cpanel/get-canceled-booking
router.get('/get-canceled-booking', [authen.checkTokenCpanel], async (req, res, next) => {
  try {
      const response = await MyBookingController.getAllBooking();

      // Lọc danh sách có response.isCancel === true
      const canceledBookings = response.filter(booking => booking.isCancel === true && booking.handleCancel === true);
      const user = req.session.user;
      // console.log("Canceled Bookings:", canceledBookings, response  );

      res.render('mybooking/bookingCancel', { canceledBookings, user});
  } catch (error) {
      res.status(400).json({ result: false, error, message: "Get bookings failed" });
  }
});

// http://localhost:3000/booking/api/get-completed-booking
router.get("/get-completed-booking", async (req, res, next) => {
  try {
    const response = await MyBookingController.getCompletedBooking();

    // Lọc danh sách có response.isCancel === true
    const completedBookings = await response.filter(
      (booking) => booking.isCompleted === false && booking.confirm == true
    );

  // Lọc theo điều kiện departmentdate > date now < expectedDate
  const currentDate = new Date();
    console.log("currentDate:", currentDate)
  const filteredBookings = completedBookings.filter((booking) => {

    //expectedDate
    const [day2, month2, year2] = booking.expectedDate.split('/');
    const adjustedMonth2 = parseInt(month2, 10) - 1; // Adjust for zero-based month
    const adjustedDay2 = parseInt(day2, 10) + 1; // Adjust for zero-based day
    const expectedDate = new Date(year2, adjustedMonth2, adjustedDay2);
    
    console.log("tour: "+currentDate+" > "+booking.expectedDate)
    console.log("expectedDate:", expectedDate)
    
    return  currentDate > expectedDate;
  });

  const user = req.session.user;


  res.render('mybooking/bookingComplete', { filteredBookings, user});
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});


// http://localhost:3000/booking/api/get-uncompleted-booking
router.get("/get-uncompleted-booking", async (req, res, next) => {
  try {
    const response = await MyBookingController.getCompletedBooking();

    // Lọc danh sách có response.isCancel === true
    const completedBookings = response.filter(
      (booking) => booking.isCompleted === false && booking.confirm === true
    );

    // Lọc theo điều kiện departmentdate > date now < expectedDate
    const currentDate = new Date();
      console.log("currentDate:", currentDate)
    const filteredBookings = completedBookings.filter((booking) => {
      // departmentDate
      const [day, month, year] = booking.departmentDate.split('/');
      const adjustedMonth = parseInt(month, 10) - 1; // Adjust for zero-based month
      const adjustedDay = parseInt(day, 10) + 1; // Adjust for zero-based day
      const departmentDate = new Date(year, adjustedMonth, adjustedDay);
      
      //expectedDate
      const [day2, month2, year2] = booking.expectedDate.split('/');
      const adjustedMonth2 = parseInt(month2, 10) - 1; // Adjust for zero-based month
      const adjustedDay2 = parseInt(day2, 10) + 1; // Adjust for zero-based day
      const expectedDate = new Date(year2, adjustedMonth2, adjustedDay2);
      
      console.log("tour: "+ booking.departmentDate +" < "+currentDate+" < "+booking.expectedDate)
      console.log("departmentDate:", departmentDate)
      console.log("expectedDate:", expectedDate)
      
      return  currentDate > departmentDate  && currentDate < expectedDate;
    });
    const user = req.session.user;
    res.render('mybooking/bookingUnComplete', { filteredBookings, user});
    
  } catch (error) {
    res.status(400).json({ result: false, error, message: "Get bookings failed" });
  }
});


// http://localhost:3000/booking/cpanel/get-handle-cancel-cpanel
router.get("/get-handle-cancel-cpanel", [authen.checkTokenCpanel], async (req, res, next) => {
  try {
    const response = await MyBookingController.getAllBooking();

    // Lọc danh sách có response.isCancel === true
    const handleCancel = response.filter(
      (booking) => booking.confirm === false && booking.handleCancel === true && booking.isCancel == false);

      const user = req.session.user;
      // console.log("Canceled Bookings:", canceledBookings, response  );

      res.render('mybooking/bookingHandleCancel', { handleCancel, user});

    
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});



//http://localhost:3000/booking/cpanel/push-notification-cancel?userId=""&tourId=""&id=""
router.get("/push-notification-cancel", async (req, res, next) => {
  try {
    const { userId, tourId, id } = req.query;
    const tokens = await tokenController.getTokenByUserId(userId);
    const tokensArray = tokens.map((tokenObj) => tokenObj.token);
    console.log(tokensArray);

    const currentTime = new Date().toLocaleTimeString();
    const message = {
      notification: {
        title: "Hủy tour thành công!",
        body: "Hãy sớm đặt lại tour nhé!",
      },
      data: {
        score: "850",
        time: currentTime,
      },
      tokens: tokensArray,
    };

    const image = 'https://firebasestorage.googleapis.com/v0/b/travelapp-3e538.appspot.com/o/user-avatar%2Flogo.png?alt=media&token=94c7da08-1361-4b42-9f7c-b993c03b85f1'
    const title = "Hủy tour thành công!"
    const content = "Hãy sớm đặt lại tour nhé!"
    const timeStamp = currentTime
    const type = "delete"
    const notification = await notificationService.addNotification(image, title, content, timeStamp,type, userId, tourId)
    await bookingService.canceledBooking(id)
    console.log(notification)
    if (notification) {
      const response = await admin.messaging().sendEachForMulticast(message);
      //console.log("Successfully sent message:", response);
      res.status(200).json({ result: true, notification: notification, message: "success" });
    } else {
      res.status(400).json({ result: true, notification: null, message: "fail" });
    }
    
    
  } catch (error) {
    console.log("Error sending message:", error);
    res.status(400).json({ result: false, error: error, message: "fail" });
  }
});

//http://localhost:3000/booking/cpanel/deleteBooking/:id
router.delete("/deleteBooking/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await MyBookingController.deleteBookingbyID(id);
    return res
      .status(200)
      .json({ result: true, message: "Delete booking Success" });
  } catch (error) {
    return res
      .status(400)
      .json({ result: true, message: "Delete booking fail" });
  }
});


// http://localhost:3000/booking/api/get-history-booking
router.get("/get-history-booking", async (req, res, next) => {
  try {
    const response = await MyBookingController.getCompletedBooking();

    // Lọc danh sách có response.isCancel === true
    const completedBookings = await response.filter(
      (booking) => booking.isCompleted === true && booking.confirm == true
    );

    const user = req.session.user;

    res.render('mybooking/bookingHistory', { completedBookings, user});
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error, message: "Get bookings failed" });
  }
});

module.exports = router;