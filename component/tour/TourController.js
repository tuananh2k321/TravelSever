var express = require('express');
var router = express.Router();
const tourService = require('./TourService');

const getAllTour = async () => {
    return await tourService.getAllTour();
}

const getTourById = async (id) => {
    return await tourService.getTourById(id);
}

const addNewTour = async (tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
    operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id) => {
        return await tourService.addNewTour(tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
            operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id);
}

const updateTour = async (id,tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
    operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id) => {
        return await tourService.updateTour(id,tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
            operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id);
    }

const deleteTour = async (id) => {
    return await tourService.deleteTour(id);
}

const getTourSearchName = async (keyword) => {
    return await tourService.getTourSearhName(keyword);
}
const getTourSearhDomain = async (keyword) => {
    return await tourService.getTourSearhDomain(keyword);
}

const getTourRating = async () => {
    return await tourService.getTourRating();
}


module.exports = {
    getAllTour,
    addNewTour,
    updateTour,
    deleteTour,
    getTourById,
    getTourSearchName,
    getTourRating,
    getTourSearhDomain
};