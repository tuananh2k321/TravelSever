const hotelModel = require("./HotelModel");

//lấy toàn bộ hotel trong database
const getAllHotels = async () => {
    try {
        return await hotelModel
            .find()
            .sort({ rating: -1 })
            .limit(10);
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

// lấy danh sách hotel bằng xếp hạng

const getHotelByRating = async (rating) => {
    try {
        let query = {
            rating: { $eq: rating }
        }
        let hotel = await hotelModel.find(query);
        return hotel;
    } catch (error) {
        console.log("get hotel by rating error: " + error);
    }
    return null;
}

// thêm hotel mới vào database
const addNewHotel = async (hotelName, description, rating, listImage, address, phoneNumber) => {
    try {
        const newHotel = {
            hotelName,
            description,
            rating,
            listImage,
            address,
            phoneNumber
        }
        const hotel = await hotelModel.create(newHotel);
        return hotel;
    } catch (error) {
        console.log("Create new hotel error: " + error);
    }
    return false;
};

// cập nhật hotel mới vào database
const updateHotel = async (id, hotelName, description, rating, listImage, address, phoneNumber) => {
    try {
        let item = await hotelModel.findById(id);
        if (item) {
            item.hotelName = hotelName ? hotelName : item.hotelName;
            item.description = description ? description : item.description;
            // item.image = image ? image : item.image;
            item.rating = rating ? rating : item.rating;
            item.listImage = listImage ? listImage : item.listImage;
            item.address = address ? address : item.address;
            item.phoneNumber = phoneNumber ? phoneNumber : item.phoneNumber;
            await hotelModel.findByIdAndUpdate(id, item);
            return true;
        }
    } catch (error) {
        console.log("Update hotel error: " + error);
        return false;
    }
};

// xóa hotel
const removeHotel = async (id) => {
    try {
        await hotelModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log('Delete hotel by ID error', error);
    }
}

//search hotel theo tên

const searchHotelName = async (keyword) => {
    try {
        let query = {
            // hotelName: { $regex: keyword, $options: 'i' },
            $or: [ { hotelName: { $regex: keyword, $options: 'i' } }, { address: { $regex: keyword, $options: 'i' }} ]
        }
        let hotel = await hotelModel.find(query);
        return hotel;
    } catch (error) {
        console.log("Search hotel error: " + error);
    }
    return null;
}

module.exports = { getAllHotels, getHotelById, getHotelByRating, addNewHotel, updateHotel, removeHotel, searchHotelName };
