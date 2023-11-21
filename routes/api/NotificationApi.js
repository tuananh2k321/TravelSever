var express = require("express");
var router = express.Router();
const notificationController = require("../../component/notification/NotificationController");
const notificationService= require("../../component/notification/NotificationService");
const tokenController = require("../../component/token-notification/TokenService");
const serviceAccount = require('../../component/notification/travelapp-3e538-firebase-adminsdk-5rk78-49812ee71f.json');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    messagingSenderId: '579542678002'
  });

//http://localhost:3000/notification/api/push-notification-feedback?userId=""&tourId=""
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

//http://localhost:3000/notification/api/push-notification-new-tour?registrationToken=""&userId=""
router.get("/push-notification-new-tour", async (req, res, next) => {
  try {
    const { registrationToken, userId, tourId } = req.query;

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
      token: registrationToken,
    };

    const image = 'https://firebasestorage.googleapis.com/v0/b/travelapp-3e538.appspot.com/o/user-avatar%2Flogo.png?alt=media&token=94c7da08-1361-4b42-9f7c-b993c03b85f1'
    const title = "Tour mới!"
    const content = "Hãy ghi ra những trải nghiệm trong chặng hành trình của bạn!"
    const timeStamp = currentTime
    const type = "new-tour"
    const notification = await notificationService.addNotificationNewTour(image, title, content, timeStamp,type, userId, tourId)
    console.log(notification)
    if (notification) {
      const response = await admin.messaging().send(message);
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

//http://localhost:3000/notification/api/getNotification?userId=""
router.get("/getNotification", async (req, res, next) => {
  try {
    const {userId} = req.query
    const notify = await notificationController.getNotification(userId);
    if (notify) {
      res
      .status(200)
      .json({ result: true, notify: notify, message: "Get notify Success" });
    } else {
      res
      .status(200)
      .json({ result: true, notify: null, message: "Get notify fail" });
    }
  } catch (error) {
    res.status(400).json({ result: false, error, message: "Get notify fail" });
  }
});



module.exports = router;
