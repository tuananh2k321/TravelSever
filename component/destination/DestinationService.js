const destinationModel = require('./DestinationModel');

const getAllDestination = async () => {
    try {
        return await destinationModel.find();
    } catch (error) {
        console.log("getAllDestination  failed: ", error);
    }
    return [];
}

const addNewDestination = async (destinationName,description, image,address) => {
    try {
        const newDestination = {
            destinationName,
            description,
            image,
            address
        }
        await destinationModel.create(newDestination);
        return true;
      } catch (error) {
        console.log("addNewDestination error: " + error)
        return false;
      }
}



module.exports = {
    getAllDestination,addNewDestination
};