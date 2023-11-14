const notificationModel = require("./NotificationModel");
const userModel = require("../user/UserModel");
const NotificationModel = require("./NotificationModel");
const getNotificationByIdUser = async (id_user) => {
  try {
    const listComment = await notificationModel.find({ user_id: id_user });
    if (listComment) {
      return listComment;
    } else {
      console.log("Nothing to return");
    }
  } catch (error) {
    console.log("gert list err: ", error);
  }
  return [];
};

const addNotification = async (image, title, content, timestamp, type, user_id, tour_id) => {
  try {
    const newNotification = {
      image,
      title,
      content,
      timestamp,
      type,
      user_id,
      tour_id
    };
    const notification = new NotificationModel(newNotification)
    const savedNotification = await notification.save();
    console.log("service savedNotification: ",savedNotification)
    if (savedNotification) {
        return savedNotification;
    } else {
        return false
    }
  } catch (error) {
    console.log("gert list err: ", error);
  }
  return false;
};

module.exports = { getNotificationByIdUser, addNotification };
