const { async } = require("@firebase/util");
const mybookingModel = require("./MyBookingModel");
const userModel = require('../user/UserModel');
const tourModel = require('../tour/TourModel');

const MyBookingModel = require("./MyBookingModel");
const HotelModel = require("../hotel/HotelModel");
const TourGuideModel = require("../tourGuide/TourGuideModel");

const tourService = require('../tour/TourService');
const TourModel = require("../tour/TourModel");
const getListBooking = async (userID) => {
  try {
    return await mybookingModel.find({ user_id: userID }).populate('tour_id').sort({ bookingDate: -1 });
  } catch (error) {
    console.log("get list booking", error);
  }
  return [];
};

const slotPerson = async (tourId, quantity) => {
  try {
      const tour =  await tourModel.findOne({_id: tourId}); 
      if (tour) {
          console.log(tour.availablePerson +" "+quantity)
          if ( tour.availablePerson >= quantity) {
              tour.availablePerson = tour.availablePerson - quantity
              await tour.save();
              return true
          } else {
              console.log("đã hết lượt")
              return false
          }
      }
  } catch (error) {
      console.log("getTourRating failed: ", error);
  }
}

const slotPersonWhenCancelTour = async (tourId, quantity) => {
  try {
      const tour =  await tourModel.findOne({_id: tourId}); 
      if (tour) {
          console.log(tour.availablePerson +" "+quantity)
          
              tour.availablePerson = tour.availablePerson + quantity
              await tour.save();
              return true
      } else {
        return false
      }
  } catch (error) {
      console.log("getTourRating failed: ", error);
  }
}

const getTourById = async (id) => {
  try {
      let tour = await tourModel.findById(id);
      return tour;
  } catch (error) {
      console.log("getTourById " + error);
      return false;
  }
}

const addMyBooking = async (name, children, adult, totalPrice, user_id, tour_id, guestInfo, 
  quantity, departmentDate, departmentHour, expectedDate) => {
  try {
    const bookingDate = new Date().toLocaleString();
    const isAvailable = await slotPerson(tour_id, quantity)
    const tour = await getTourById(tour_id)
    if(isAvailable && tour) {
      const newBooking = {
        name,
        children,
        adult,
        totalPrice,
        user_id,
        tour_id,
        guestInfo,
        bookingDate,
        departmentDate,
        departmentHour,
        expectedDate
      };
      tour.isBooking = true
      await tour.save()
      const b = new MyBookingModel(newBooking);
      const save_b = await b.save()
      //const booking = await mybookingModel.create(newBooking);
      console.log("create booking", save_b);
      if (save_b) {
        return save_b;
      } else {
        return false
      }
    } else {
      console.log("Không đủ slot")
      return false
    }
  } catch (error) {
    console.log(error)
  }
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

const getAllBooking = async () => {
  try {
    const allBooking = await mybookingModel.find();
    if (allBooking) {
      const bookingOfUser = await Promise.all(allBooking.map(async (booking) => {
        const userId = booking.user_id;
        const tourId = booking.tour_id;
        // console.log('userid ,', userId)
        // Tìm người dùng tương ứng với user_id
        const user = await userModel.findOne({ _id: userId });
        const tour = await tourModel.findOne({ _id: tourId })

        if (user) {
          booking.user_id = user;
        }
        if (tour) {
          booking.tour_id = tour;
        }
        return booking
      }))
      return bookingOfUser;
    }
  } catch (error) {
    console.log("get all booking err", error);
  }
};


const getAllTourBooking = async () => {
  try {
    return await mybookingModel.find();
  } catch (error) {
    console.log("get all booking", error);
  }
  return [];
};



const tourIsBooking = async (tourId) => {
  try {
    return await mybookingModel.find({ tour_id: tourId });
  } catch (error) {
    console.log("get tourIsBooking", error);
  }
  return [];
};

const getBookingById = async (id) => {
  try {
    const booking = await mybookingModel.findOne({ _id: id });
    //console.log('Booking: '+ booking)
    if (booking) {

        const userId = booking.user_id;
        const tourId = booking.tour_id;
        // const hotelId = booking.hotel_id;
        // const tourGuideId = booking.tourGuide_id;
        // console.log('hotelId ,', hotelId)
        // Tìm người dùng tương ứng với user_id
        const user = await userModel.findOne({ _id: userId });
        const tour = await tourModel.findOne({ _id: tourId })
        // const hotel = await HotelModel.findOne({ _id: hotelId })
        // const tourguide = await TourGuideModel.findOne({ _id: tourGuideId })

        if (user) {
          booking.user_id = user;
        }
        if (tour) {
          booking.tour_id = tour;
        }
        // if (hotel) {
        //   booking.hotel_id = hotel;
        // }
        // if (tourguide) {
        //   booking.tourGuide_id = tourguide;
        // }
        return booking
      }
    // if (booking) {
    //   return booking;
    // } else {
    //   return false
    // }
  } catch (error) {
    console.log("getBookingById", error);
  }
}

const getBookingByIdUser = async (id) => {
  try {
    //const booking = await mybookingModel.find({ user_id: id });
    const booking = await mybookingModel.find({ user_id: id }).populate('tour_id').sort({ bookingDate: -1 });
    console.log('Booking: ' + booking)
    if (booking) {
      return booking;
    } else {
      return false
    }
  } catch (error) {
    console.log("getBookingById", error);
  }
}

const getCompletedBooking = async () => {
  try {
    //const booking = await mybookingModel.find({ user_id: id });
    const booking = await mybookingModel.find().populate('tour_id').populate('user_id').sort({ bookingDate: -1 });
    //console.log('Booking: '+ booking)
    if (booking) {
      return booking;
    } else {
      return false
    }
  } catch (error) {
    console.log("getBookingById", error);
  }
}

const confirmBooking = async (id) => {
  try {
    const booking = await MyBookingModel.findOne({ _id: id })
    if (booking) {
      booking.confirm = true;
      const b = await booking.save();
      return b
    }
  } catch (error) {
    console.log("confirmBooking", error);
  }
}

// const expectedDate = async (id) => {
//   try {
//     const booking = await MyBookingModel.findOne({ _id: id })
//     if (booking) {
//       booking.confirm = true;
//       const b = await booking.save();
//       return b
//     }
//   } catch (error) { 
//     console.log("confirmBooking", error);
//   }
// }

const completedBooking = async (id) => {
  try {
    const booking = await MyBookingModel.findOne({ _id: id })
    if (booking) {
      booking.isCompleted = true;
      const b = await booking.save();
      return b
    }
  } catch (error) {
    console.log("confirmBooking", error);
  }
}

const canceledBooking = async (id) => {
  try {
    const booking = await MyBookingModel.findOne({ _id: id })
    if (booking) {
      await slotPersonWhenCancelTour(booking.tour_id, booking.children + booking.adult)
      if (slotPersonWhenCancelTour) {
        console.log("slotPersonWhenCancelTour: success")
      } else {
        console.log("slotPersonWhenCancelTour: fail")
      }
      booking.isCancel = true;
      const b = await booking.save();
      return b
    }
  } catch (error) {
    console.log("confirmBooking", error);
  }
}

const closeTourInMyBooking = async (tourId) => {
  try {
    const bookings = await MyBookingModel.find({ tour_id: tourId })
    if (bookings && bookings.length > 0) {
      for (const booking of bookings) {
        booking.isCancel = true;
        await booking.save();
      }
      return true;
    } else {
      console.log("No bookings found for tourId:", tourId);
      return false; // Or handle the case where no bookings are found
    }
  } catch (error) {
    console.log("closeTourInMyBooking", error);
  }
}

const openTourInMyBooking = async (tourId) => {
  try {
    const bookings = await MyBookingModel.find({ tour_id: tourId })
    if (bookings && bookings.length > 0) {
      for (const booking of bookings) {
        booking.isCancel = false;
        await booking.save();
      }
      return true;
    } else {
      console.log("No bookings found for tourId:", tourId);
      return false; // Or handle the case where no bookings are found
    }
  } catch (error) {
    console.log("confirmBooking", error);
  }
}

const handleCanceledBooking = async (id) => {
  try {
    const booking = await MyBookingModel.findOne({ _id: id })
    if (booking) {
      booking.handleCancel = true;
      const b = await booking.save();
      return b
    }
  } catch (error) {
    console.log("confirmBooking", error);
  }
}

const cancelRequired = async (id) => {
  try {
    const booking = await MyBookingModel.findOne({ _id: id })
    if (booking) {
      booking.handleCancel = false;
      const b = await booking.save();
      return b
    }
  } catch (error) {
    console.log("confirmBooking", error);
  }
}

const addReason = async (id, reason) => {
  try {
    const booking = await MyBookingModel.findOne({ _id: id })
    if (booking) {
      booking.reason = reason ? reason : booking.reason;
      const b = await booking.save();
      return b
    } else {
      console.log("null")
    }
  } catch (error) {
    console.log("confirmBooking", error);
  }
}


module.exports = {
  getListBooking, addMyBooking,
  deleteBooking, getAllBooking, tourIsBooking, getAllTourBooking,
  getBookingById, confirmBooking, addReason, completedBooking,
  canceledBooking, getBookingByIdUser, handleCanceledBooking, cancelRequired,
  getCompletedBooking, closeTourInMyBooking, openTourInMyBooking
};
