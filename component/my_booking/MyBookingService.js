const mybookingModel = require("./MyBookingModel");

const getListBooking = async (userID) => {
  try {
    return await mybookingModel.find({user_id: userID}).populate('tour_id').sort({bookingDate: -1});
  } catch (error) {
    console.log("get list booking", error);
  }
  return [];
};

const addMyBooking = async (name, children, adult, totalPrice, user_id, tour_id) => {
  try {
    const newBooking = {
      name, 
      children, 
      adult, 
      totalPrice, 
      user_id, 
      tour_id
    };
    return await mybookingModel.create(newBooking);
    
  } catch (error) { }
  return false;
};
const deleteBooking = async (id) => {
  try {
    await mybookingModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log("delete booking by id err: ", error);
  }
  return false;
};

module.exports = { getListBooking, addMyBooking, deleteBooking };
