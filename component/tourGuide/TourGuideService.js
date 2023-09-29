const tourGuideModel = require("./TourGuideModel");

//lấy toàn bộ tourGuide trong database
const getAllTourGuide = async () => {
    try {
        return await tourGuideModel.find();
    } catch (error) {
        console.log("Get all hotels error: " + error);
    }
    return [];
};

// Create a new tour guide
const createNewTourGuide = async (
    name,
    phoneNumber,
    email,
    avatar,
    workPlaces
) => {
    try {
        const newTourGuide = {
            name,
            phoneNumber,
            email,
            avatar,
            workPlaces,
        };
        const tourGuide = await tourGuideModel.create(newTourGuide);
        return tourGuide;
    } catch (error) {
        console.log("Create new tour guide error: " + error);
    }
    return false;
};

// xóa tour guide
const removeTourGuide = async (id) => {
    try {
        await tourGuideModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log("Delete  tour guider", error);
    }
};


// Update tour guide

// cập nhật hotel mới vào database
const updateTourGuide = async (id, name,
    phoneNumber,
    email,
    avatar,
    workPlaces) => {
    try {
        let item = await tourGuideModel.findById(id);
        if (item) {
            item.name = name ? name : item.name;
            item.email = email ? email : item.email;
            item.avatar = avatar ? avatar : item.avatar;
            item.workPlaces = workPlaces ? workPlaces : item.workPlaces;
            item.phoneNumber = phoneNumber ? phoneNumber : item.phoneNumber;
            await tourGuideModel.findByIdAndUpdate(id, item);
            return true;
        }
    } catch (error) {
        console.log("Update hotel error: " + error);
    }
    return false;
};


module.exports = { getAllTourGuide, createNewTourGuide, removeTourGuide, updateTourGuide };
