const notificationModel = require('./NotificationModel');

const getNotification  = async () =>{
    try {
        return await notificationModel.find();
    } catch (error) {
        console.log("gert list err: ", error);
    }
    return[];
}


const addNotification  = async (image, title, content, timestamp, user_id) =>{
    try {
        const newNotification = {
            image, title, content, timestamp, user_id
        };
        await notificationModel.create(newNotification);
        return true;
    } catch (error) {
        console.log("gert list err: ", error);
    }
    return false;
}

module.exports = {getNotification, addNotification};