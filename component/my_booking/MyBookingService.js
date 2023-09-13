const mybookingModel = require("./MyBookingModel");

const getListBooking = async () => {
  try {
    return await mybookingModel.find();
  } catch (error) {
    console.log("get list booking", error);
  }
};

const addMyBooking = async (timestamp, user_id, tour_id) => {
  try {
    const newBooking = {
      timestamp,
      user_id,
      tour_id,
    };
    const u = new HotelModel(newHotel);
    await u.save();
    return true;
  } catch (error) { }
  return false;
};

module.exports = { getListBooking, addMyBooking };
