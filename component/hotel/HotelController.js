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
        console.log("Get hotelById error: ",error);
    }
}

const getHotelByRating = async (rating) => {
    try {
        return await hotelService.getHotelByRating(rating);
    } catch (error) {
        throw error;
    }
}

const addNewHotel = async (hotelName, description, rating, listImage, address, phoneNumber) => {
    try {
        return await hotelService.addNewHotel(hotelName, description, rating, listImage, address, phoneNumber);
    } catch (error) {
        throw error;
    }
}

const updateHotel = async (id,hotelName, description, rating, listImage, address, phoneNumber) => {
    try {
        return await hotelService.updateHotel(id, hotelName, description, rating, listImage, address, phoneNumber);
    } catch (error) {
        console.log("Update hotel failed: " + error);
    }
}

const removeHotel = async (id) => {
    try {
        return await hotelService.removeHotel(id);
    } catch (error) {
        throw error;
    }
}

const searchHotelName = async (keyword) => {
    try {
        return await hotelService.searchHotelName(keyword);
    } catch (error) {
        throw error;
    }
}

module.exports = {getAllHotels, getHotelById, getHotelByRating, addNewHotel, updateHotel, removeHotel, searchHotelName}
