const destinationModel = require('./DestinationModel');

const getAllDestination = async () => {
    try {
        return await destinationModel.find();
    } catch (error) {
        console.log("getAllDestination  failed: ", error);
    }
    return [];
}

const addNewDestination = async (destinationName,content, mainImage,address) => {
    try {
        const newDestination = {
            destinationName,
            content,
            mainImage,
            address
        }
        await destinationModel.create(newDestination);
        return true;
      } catch (error) {
        console.log("addNewDestination error: " + error)
        return false;
      }
}

const deleteDesById = async (id)=>{
    try {
        await destinationModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log("Delete tour: ",error);
        return false;
    }
}


module.exports = {
    getAllDestination,addNewDestination, deleteDesById
};