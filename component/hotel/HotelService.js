
const HotelModel = require('./HotelModel');

const addHotel = async (hotelName, description, image, rating, address, phoneNumber,  ) => {
    try {
        const newHotel= { hotelName, description, image, rating, address, phoneNumber,};
        const u = new HotelModel(newHotel);
        await u.save();
        return true;
    } catch (error) {
        console.log("addHotel error" + error)
        return false;
    }
}

module.exports = {
    addHotel
};