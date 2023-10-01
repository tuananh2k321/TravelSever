const tourGuideService = require("./TourGuideService");


const getAllTourGuide = async () => {
    try {
        return await tourGuideService.getAllTourGuides();
    } catch (error) {
        throw error;
    }
}

const createNewTourGuide = async (name, phoneNumber, email, avatar, workPlaces) => {
    try {
        return await tourGuideService.createNewTourGuides(name, phoneNumber, email, avatar, workPlaces);
    } catch (error) {
        throw error;
    }
}



const removeTourGuide = async (id) => {
    try {
        return await tourGuideService.removeTourGuides(id);
    } catch (error) {
        throw error;
    }
}

const updateTourGuide = async (id, name, phoneNumber,
    email,
    avatar,
    workPlaces) => {
    try {
        return await tourGuideService.updateTourGuide(id, name, phoneNumber,
            email,
            avatar,
            workPlaces);
    } catch (error) {
        throw error;
    }
}
module.exports = { getAllTourGuide, createNewTourGuide, removeTourGuide, updateTourGuide }