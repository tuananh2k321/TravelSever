const hotelService = require("./HotelService");


const getAllHotels = async () => {
    try {
        return await hotelService.getAllHotels();
    } catch (error) {
        throw error;
    }
}

const getHotelById = async (id) => {
    try {
        return await hotelService.getHotelById(id);
    } catch (error) {
        throw error;
    }
}

const getHotelByRating = async (rate) => {
    try {
        return await hotelService.getHotelByRating(rate);
    } catch (error) {
        throw error;
    }
}

const addNewHotel = async () => {
    try {
        return await hotelService.addNewHotel(hotelName, description, image, rating, address, phoneNumber);
    } catch (error) {
        throw error;
    }
}

module.exports = {getAllHotels, getHotelById, getHotelByRating, addNewHotel}
