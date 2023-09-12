const notificationService = require('./NotificationService');

const getNotification = async () =>{
    try {
        return await notificationService.getNotification();
    } catch (error) {
        throw error;
    }
}

const addNotification = async (id, title, content, quantity, user_id) =>{
    try {
        await notificationService.addNotification(id, title, content, quantity, user_id);
    } catch (error) {
        throw error;
    }
}

module.exports = {getNotification, addNotification}