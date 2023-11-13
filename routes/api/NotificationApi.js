var express = require("express");
var router = express.Router();
const notificationController = require("../../component/notification/NotificationController");
const serviceAccount = require('../../component/notification/travelapp-3e538-firebase-adminsdk-5rk78-49812ee71f.json');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    messagingSenderId: '579542678002'
  });

//http://localhost:3000/notification/api/push-notification
router.get("/push-notification", async (req, res, next) => {
  try {
    const registrationToken = "AAAAhu9vefI:APA91bHj_mji44A51bcrHrleCMpRpGo_qEhPSJ88bYEeTkcugw_Y8us-WlMt8dchgPiRYZgEW2TffaBnAzyrklqR4qZOGISeUlA-4freUZemi9zUUhdgDZZ7Bct9GT0OvhNVBbyIG_OC";

    const message = {
      data: {
        score: "850",
        time: "2:45",
      },
      token: registrationToken,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log("Successfully sent message:", response);
  })
  .catch((error) => {
    console.log("Error sending message:", error);
  });

  } catch (error) {
    console.log(error)
    res.status(400).json({ result: false, error: error, message: "fail" });
  }
});

//http://localhost:3000/notification/api
router.get("/getNotification", async (req, res, next) => {
  try {
    const notify = await notificationController.getNotification();
    res
      .status(200)
      .json({ result: true, notify: notify, message: "Get notify Success" });
  } catch (error) {
    res.status(400).json({ result: false, error, message: "Get notify fail" });
  }
});

router.post("/:user_id/addNotification", async (req, res, next) => {
  try {
    const { image, title, content, timestamp } = req.body;
    const { user_id } = req.params;

    await notificationController.addNotification(
      image,
      title,
      content,
      timestamp,
      user_id
    );
    res.status(200).json({ result: true, message: "Add notify Success" });
  } catch (error) {
    res.status(400).json({ result: false, message: "Add notify fail" });
  }
});

module.exports = router;
