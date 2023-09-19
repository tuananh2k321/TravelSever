const mybookingModel = require("./MyBookingModel");

const getListBooking = async () => {
  try {
    return await mybookingModel.find();
  } catch (error) {
    console.log("get list booking", error);
  }
  return [];
};

const addMyBooking = async (timestamp, user_id, tour_id) => {
  try {
    const newBooking = {
      timestamp,
      user_id,
      tour_id,
    };
    return await mybookingModel.create(newBooking);
    
  } catch (error) { }
  return false;
};

module.exports = { getListBooking, addMyBooking };