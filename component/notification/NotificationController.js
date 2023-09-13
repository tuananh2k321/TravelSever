const notificationService = require('./NotificationService');

const getNotification = async () =>{
    try {
        return await notificationService.getNotification();
    } catch (error) {
        throw error;
    }
}

const addNotification = async (image, title, content, timestamp, user_id) =>{
    try {
        await notificationService.addNotification(image, title, content, timestamp, user_id);
    } catch (error) {
        throw error;
    }
}

module.exports = {getNotification, addNotification}