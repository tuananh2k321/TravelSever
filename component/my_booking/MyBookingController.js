const myBookingService = require("./MyBookingService");

const getListBooking = async (userID) => {
  try {
    return await myBookingService.getListBooking(userID);
  } catch (error) {
    throw error;
  }
};

const addMyBooking = async (name, children, adult, totalPrice, user_id, tour_id, guestInfo) => {
  try {
    return await myBookingService.addMyBooking(name, children, adult, totalPrice, user_id, tour_id, guestInfo);
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
const getAllTourBooking = async () => {
  try {
      return await myBookingService.getAllTourBooking();

  } catch (error) {
      return false;
  }
}

const tourIsBooking = async (tourId) => {
  try {
    return await myBookingService.tourIsBooking(tourId);
  } catch (error) {
    throw error;
  }
};

const getBookingById = async (id) => {
  try {
    return await myBookingService.getBookingById(id);
  } catch (error) {
    throw error;
  }
};

const handleCanceledBooking = async (id) => {
  try {
    return await myBookingService.handleCanceledBooking(id);
  } catch (error) {
    throw error;
  }
};

const cancelRequired = async (id) => {
  try {
    return await myBookingService.cancelRequired(id);
  } catch (error) {
    throw error;
  }
};

const getBookingByIdUser = async (id) => {
  try {
    return await myBookingService.getBookingByIdUser(id);
  } catch (error) {
    throw error;
  }
};

module.exports = { getListBooking, addMyBooking, deleteBookingbyID,
  getAllBooking,tourIsBooking, getBookingById,
  getAllTourBooking, getBookingByIdUser, handleCanceledBooking, cancelRequired };
