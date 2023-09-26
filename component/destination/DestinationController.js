
const destinationService = require('./DestinationService');

const getAllDestination = async () =>{
    return await destinationService.getAllDestination();
}

const addNewDestination = async (destinationName,description, image,address) => {
    return await destinationService.addNewDestination(destinationName,description, image,address);
}



module.exports = {
    getAllDestination,
    addNewDestination
};