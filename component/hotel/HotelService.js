const hotelModel = require("./HotelModel");

//lấy toàn bộ hotel trong database
const getAllHotels =  async () => {
    try {
        return await hotelModel.find();
    } catch (error) {
        console.log("Get all hotels error: " + error);
    }
    return [];
};


//lấy hotel theo id
const getHotelById = async (id) => {
    try {
        let hotel = await hotelModel.findById(id);
        return hotel;
    } catch (error) {
        console.log("Get hotel by id error: " + error);
    }
    return null;
};

// thêm hotel mới vào database
const addNewHotel = async (hotelName, description, image, rating, address, phoneNumber) => {
    try {
        const newHotel = {
            hotelName, 
            description, 
            image, 
            rating, 
            address, 
            phoneNumber
        }  
        await hotelModel.create(newHotel);
        return true;
    } catch (error) {
        console.log("Create new hotel error: " + error);
    }
    return false;
};

// lấy danh sách hotel bằng xếp hạng

const getHotelByRating = async (rate) => {
    try {
        let hotel = await hotelModel.find(rate);
        return hotel;
    } catch (error) {
        console.log("get hotel by rating error: " + error);
    }
    return [];
}

module.exports = {getAllHotels, getHotelById, getHotelByRating, addNewHotel};
