var express = require('express');
var router = express.Router();
const tourService = require('./TourService');

const getAllTour = async () => {
    return await tourService.getAllTour();
}

const getTourById = async (id) => {
    return await tourService.getTourById(id);
}

const addNewTour = async (tourName, adultPrice, childrenPrice, tourImage,departmentPlace,departmentDate, limitedDay,
    operatingDay, vehicle,description,rating,isState,hotel_id,destination_id) => {
        return await tourService.addNewTour(tourName, adultPrice, childrenPrice, tourImage,departmentPlace,departmentDate, limitedDay,
            operatingDay, vehicle,description,rating,isState,hotel_id,destination_id);
}

const updateTour = async (id,tourName, adultPrice, childrenPrice, tourImage,departmentPlace,departmentDate, limitedDay,
    operatingDay, vehicle,description,rating,isState,hotel_id,destination_id ) => {
        return await tourService.updateTour(id,tourName, adultPrice, childrenPrice, tourImage,departmentPlace,departmentDate, limitedDay,
            operatingDay, vehicle,description,rating,isState,hotel_id,destination_id);
    }

const deleteTour = async (id) => {
    return await tourService.deleteTour(id);
}

const getTourSearchName = async (keyword) => {
    return await tourService.getTourSearhName(keyword);
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
    getTourRating
};