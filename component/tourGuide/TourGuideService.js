const tourGuideModel = require("./TourGuideModel");

//lấy toàn bộ tourGuide trong database
const getAllTourGuides = async () => {
    try {
        return await tourGuideModel.find();
    } catch (error) {
        console.log("Get all tourGuide error: " + error);
    }
    return [];
};

// Create a new tour guide
const createNewTourGuides = async (
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
const removeTourGuides = async (id) => {
    try {
        await tourGuideModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log("Delete  tour guider", error);
    }
};


// Update tour guide

// cập nhật tour guide mới vào database
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
        console.log("Update tour guide error: " + error);
    }
    return false;
};
//lấy hotel theo id
const getTourGuide = async (id) => {
    try {
        let tourGuide = await tourGuideModel.findById(id);
        return tourGuide;
    } catch (error) {
        console.log("Get tourGuide by id error: " + error);
    }
    return null;
};


module.exports = { getAllTourGuides, createNewTourGuides, removeTourGuides, updateTourGuide, getTourGuide };
