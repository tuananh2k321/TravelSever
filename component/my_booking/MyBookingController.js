const myBookingService = require("./MyBookingService");

const getListBooking = async (userID) => {
  try {
    return await myBookingService.getListBooking(userID);
  } catch (error) {
    throw error;
  }
};

const addMyBooking = async (name, children, adult, totalPrice, user_id, tour_id) => {
  try {
    return await myBookingService.addMyBooking(name, children, adult, totalPrice, user_id, tour_id);
  } catch (error) {
    return error;
  }
};

const deleteBookingbyID = async (id) => {
  try {
    return await myBookingService.deleteBooking(id);
  } catch (error) {
    throw error;
  }
};

const getAllBooking = async () => {
  try {
      return await myBookingService.getAllBooking();

  } catch (error) {
      return false;
  }
}

module.exports = { getListBooking, addMyBooking, deleteBookingbyID, getAllBooking };
