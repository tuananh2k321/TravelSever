const myBookingService = require("./MyBookingService");

const getListBooking = async () => {
  try {
    return await myBookingService.getListBooking();
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
module.exports = { getListBooking, addMyBooking };
