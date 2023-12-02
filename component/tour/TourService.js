
const tourModel = require('./TourModel');


const getAllTour = async () => {
    try {
        return await tourModel.find().sort({createdAt:-1});
    } catch (error) {
        console.log("getAllTour failed: ", error);
    }
    return [];
}

const getTourListName = async (keyword) => {
    try {
     let query =  {tourName:{$regex:new RegExp(keyword,'i')}};
     let filteredTours = await tourModel.find(query);
     return filteredTours;
    } catch (error) {
     console.error('search failed:', error);
     return false;
    }
 }

const getTourById = async (id) => {
    try {
        let tour = await tourModel.findById(id);
        return tour;
    } catch (error) {
        console.log("getTourById " + error);
        return false;
    }
}

const addNewTour = async (tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
    operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id ) => {
    try {
        // const newTour = { tourName, description, price, mainImage,checking, rating, address, imageMap,specificAddress, hotel_id,destination_id,domain};
        // const u = new tourModel(newTour);
        // await u.save();
        const newTour = {
            tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
                operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id
        }
         await tourModel.create(newTour); 
        return true;
    } catch (error) {
        console.log("addTour error" + error);
       
    }
    return false;
}

const updateDomain = async (id, isdomain) => {
    try {
        let tour = await tourModel.findById(id);
        if (tour) {
            tour.isdomain = isdomain ? isdomain : tour.isdomain;
            await tour.save();
            return true;
        }
    } catch (e) {
        console.log("Update tour error :",error);
        return false;
    }
}
const departmentHour = async (id, departmentHour) => {
    try {
        let tour = await tourModel.findById(id);
        if (tour) {
            tour.departmentHour = departmentHour ? departmentHour : tour.departmentHour;
            await tour.save();
            return true;
        }
    } catch (e) {
        console.log("Update tour error :",error);
        return false;
    }
}
const expectedDate = async (id, expectedDate) => {
    try {
        let tour = await tourModel.findById(id);
        if (tour) {
            tour.expectedDate = expectedDate ? expectedDate : tour.expectedDate;
            await tour.save();
            return true;
        }
    } catch (e) {
        console.log("Update tour error :",error);
        return false;
    }
}

const updateTour = async (id,tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
    operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id) => {
    try {
        let tour = await tourModel.findById(id);
        if(tour) {
            tour.tourName = tourName ? tourName : tour.tourName;
            tour.adultPrice = adultPrice ? adultPrice : tour.adultPrice;
            tour.childrenPrice = childrenPrice ? childrenPrice : tour.childrenPrice;
            tour.childrenAge = childrenAge ? childrenAge : tour.childrenAge;
            tour.adultAge = adultAge ? adultAge : tour.adultAge;
            tour.tourImage = tourImage ? tourImage : tour.tourImage;
            tour.departmentPlace = departmentPlace ? departmentPlace : tour.departmentPlace;
            tour.departmentDate = departmentDate ? departmentDate : tour.departmentDate;
            tour.limitedDay = limitedDay ? limitedDay : tour.limitedDay;
            tour.operatingDay = operatingDay ? operatingDay : tour.operatingDay;
            tour.limitedPerson = limitedPerson ? limitedPerson : tour.limitedPerson;
            tour.offer = offer ? offer : tour.offer;
            tour.vehicle = vehicle ? vehicle : tour.vehicle;
            tour.description = description ? description : tour.description;
            tour.rating = rating ? rating : tour.rating;
            tour.isdomain = isdomain ? isdomain : tour.isdomain;
            tour.isState = isState ? isState : tour.isState;
            tour.hotel_id = hotel_id ? hotel_id : tour.hotel_id;
            tour.tourGuide_id = tourGuide_id ? tourGuide_id : tour.tourGuide_id;
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
const getTourSearhDomain = async (keyword) => {
    try {
        const query = {isdomain:{$regex:new RegExp(keyword,'i')}};
     // query =  {isdomain:{$regex:new RegExp(keyword,'i')}};
     let filteredTours = await tourModel.find(query);
     return filteredTours;
    } catch (error) {
     console.error('search failed:', error);
     return false;
    }
 }

const getTourRating = async () => {
    try {
        return await tourModel.find().sort({rating:-1}); //{ rating: { $exists: true, $ne: null } }
    } catch (error) {
        console.log("getTourRating failed: ", error);
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
    updateDomain,
    getTourSearhDomain,
    getTourListName,
    departmentHour
};