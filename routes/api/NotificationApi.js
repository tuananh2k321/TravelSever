var express = require('express');
var router = express.Router();

const notificationController = require('../../component/notification/NotificationController');

//http://localhost:3000/notification/api
router.get('/getNotification', async (req,res,next)=>{
    try {
        const notify = await notificationController.getNotification();
        res.status(200).json({result: true, notify: notify, message: "Get notify Success"})
    } catch (error) {
        res.status(400).json({result: false, error, message: "Get notify fail"})
    }
});

module.exports = router;