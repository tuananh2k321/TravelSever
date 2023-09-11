const hotelService = require('./HotelService');

const addHotel = async (hotelName, description, image, rating, address, phoneNumber, ) => {
    try {
        return await hotelService.addHotel(hotelName, description, image, rating, address, phoneNumber,);
    } catch (error) {
        return false;
    }
}

module.exports = {
    addHotel
};