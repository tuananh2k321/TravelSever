var express = require('express');
var router = express.Router();
var MyBookingController = require('../component/my_booking/MyBookingController')
const authen = require('../middleware/Authen')

const notificationService= require("../component/notification/NotificationService");
const tokenController = require("../component/token-notification/TokenService");
const serviceAccount = require('../component/notification/travelapp-3e538-firebase-adminsdk-5rk78-49812ee71f.json');
const admin = require('firebase-admin');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     messagingSenderId: '579542678002'
//   });

//http://localhost:3000/booking/cpanel/push-notification-feedback?userId=""&tourId=""
router.get("/push-notification-feedback", async (req, res, next) => {
  try {
    const { userId, tourId } = req.query;
    const tokens = await tokenController.getToken();
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

module.exports = router;