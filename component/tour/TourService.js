
const tourModel = require('./TourModel');


const getAllTour = async () => {
    try {
        return await tourModel.find().sort({createdAt:-1});
    } catch (error) {
        console.log("getAllTour failed: ", error);
    }
    return [];
}

const getTourById = async (id) => {
    try {
        let tour = await tourModel.findById(id);
        return tour;
    } catch (error) {
        console.log("getTourById error" + error);
        return false;
    }
}

const addNewTour = async (tourName, adultPrice, childrenPrice, tourImage,address, limitedDay,
    operatingDay, vehicle,description,rating,isState,hotel_id,destination_id ) => {
    try {
        // const newTour = { tourName, description, price, mainImage,checking, rating, address, imageMap,specificAddress, hotel_id,destination_id,domain};
        // const u = new tourModel(newTour);
        // await u.save();
        const newTour = {
            tourName, adultPrice, childrenPrice, tourImage,address, limitedDay,
            operatingDay, vehicle,description,rating,isState,hotel_id,destination_id
        }
         await tourModel.create(newTour); 
        return true;
    } catch (error) {
        console.log("addTour error" + error);
       
    }
    return false;
}

const updateTour = async (id,tourName, adultPrice, childrenPrice, tourImage,address, limitedDay,
    operatingDay, vehicle,description,rating,isState,hotel_id,destination_id) => {
    try {
        let tour = await tourModel.findById(id);
        if(tour) {
            tour.tourName = tourName ? tourName : tour.tourName;
            tour.adultPrice = adultPrice ? adultPrice : tour.adultPrice;
            tour.childrenPrice = childrenPrice ? childrenPrice : tour.childrenPrice;
            tour.tourImage = tourImage ? tourImage : tour.tourImage;
            tour.address = address ? address : tour.address;
            tour.limitedDay = limitedDay ? limitedDay : tour.limitedDay;
            tour.operatingDay = operatingDay ? operatingDay : tour.operatingDay;
            tour.vehicle = vehicle ? vehicle : tour.vehicle;
            tour.description = description ? description : tour.description;
            tour.rating = rating ? rating : tour.rating;
            tour.isState = isState ? isState : tour.isState;
            tour.hotel_id = hotel_id ? hotel_id : tour.hotel_id;
            tour.destination_id = destination_id ? destination_id : tour.destination_id;
            await tour.save();
            return true;
        }
    } catch (error) {
        console.log("Update tour error :",error);
        return false;
    }
}
const deleteTour = async (id) => {
    try {
        await tourModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log("Delete tour: ",error);
        return false;
    }
}

const getTourSearhName = async (keyword) => {
   try {
    let query =  {tourName:{$regex:new RegExp(keyword,'i')}};
    let filteredTours = await tourModel.find(query);
    return filteredTours;
   } catch (error) {
    console.error('search failed:', error);
    return false;
   }
}

const getTourRating = async () => {
    try {
        return await tourModel.find({ rating: { $exists: true, $ne: null } })
        .sort({ rating: -1 }); // Sắp xếp theo rating giảm dần
        
    } catch (error) {
        console.log("getTourRating failed: ", error);
    }
    return [];
}

const getTourDomain = async (keyword) => {
    try {
        let query =  {domain:{$regex:new RegExp(keyword,'i')}};
        let filteredTours = await tourModel.find(query);
        return filteredTours;
    } catch (error) {
        console.log("getTourDomain failed: ", error);
    }
    return [];
}

module.exports = {
    getAllTour,
    addNewTour,
    updateTour,
    deleteTour,
    getTourById,
    getTourSearhName,
    getTourRating,
    getTourDomain
};