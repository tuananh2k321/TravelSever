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

const getHotelByRating = async (rating) => {
    try {
        return await hotelService.getHotelByRating(rating);
    } catch (error) {
        throw error;
    }
}

const addNewHotel = async (hotelName, description, image, rating, address, phoneNumber) => {
    try {
        return await hotelService.addNewHotel(hotelName, description, image, rating, address, phoneNumber);
    } catch (error) {
        throw error;
    }
}

const updateHotel = async (id,hotelName, description, image, rating, address, phoneNumber) => {
    try {
        return await hotelService.updateHotel(id, hotelName, description, image, rating, address, phoneNumber);
    } catch (error) {
        throw error;
    }
}

const removeHotel = async (id) => {
    try {
        return await hotelService.removeHotel(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {getAllHotels, getHotelById, getHotelByRating, addNewHotel, updateHotel, removeHotel}
