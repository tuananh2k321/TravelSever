const notificationService = require('./NotificationService');

const getNotification = async (user_id) =>{
    try {
        return await notificationService.getNotificationByIdUser(user_id);
    } catch (error) {
        throw error;
    }
}

const updateIsRead = async (id) =>{
    try {
        return await notificationService.updateIsRead(id);
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

const deleteNotification = async (id) =>{
    try {
        await notificationService.deleteById(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {getNotification, addNotification, deleteNotification, updateIsRead}