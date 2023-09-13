const myBookingService = require("./MyBookingService");

const getListBooking = async () => {
  try {
    return await myBookingService.getListBooking();
  } catch (error) {
    throw error;
  }
};

const addMyBooking = async (timestamp, user_id, tour_id, hotel_id) => {
  try {
    await favoriteService.addMyBooking(timestamp, user_id, tour_id, hotel_id);
  } catch (error) {
    throw error;
  }
};
module.exports = { getListBooking, addMyBooking };
