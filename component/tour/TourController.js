var express = require('express');
var router = express.Router();
const tourService = require('./TourService');

const getAllTour = async () => {
    return await tourService.getAllTour();
}

const getTourById = async (id) => {
    return await tourService.getTourById(id);
}

const addNewTour = async (tourName, description, price, mainImage,checking, rating, address, 
    imageMap,specificAddress, hotel_id,domain ) => {
        return await tourService.addNewTour(tourName, description, price, mainImage,checking, rating, address, imageMap,specificAddress, hotel_id,domain );
}

const updateTour = async (id,tourName, description, price, mainImage,checking, rating, address, 
    imageMap,specificAddress, hotel_id,domain) => {
        return await tourService.updateTour(id,tourName, description, price, mainImage,checking, rating, address, 
            imageMap,specificAddress, hotel_id,domain);
    }

const deleteTour = async (id) => {
    return await tourService.deleteTour(id);
}

const getTourSearchName = async (keyword) => {
    return await tourService.getTourSearhName(keyword);
}

const getTourRating = async (keyword) => {
    return await tourService.getTourRating(keyword);
}
const getTourDomain = async (keyword) => {
    return await tourService.getTourDomain(keyword);
}

module.exports = {
    getAllTour,
    addNewTour,
    updateTour,
    deleteTour,
    getTourById,
    getTourSearchName,
    getTourRating,
    getTourDomain
};