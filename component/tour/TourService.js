
const TourModel = require('./TourModel');


const addTour = async (tourName, description, price, image, rating, address, mainImage, comment, hotel_id, ) => {
    try {
        const newTour = { tourName, description, price, image, rating, address, mainImage, comment, checking, hotel_id};
        const u = new TourModel(newTour);
        await u.save();
        return true;
    } catch (error) {
        console.log("addTour error" + error)
        return false;
    }
}

module.exports = {
    addTour
};