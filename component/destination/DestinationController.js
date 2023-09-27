
const destinationService = require('./DestinationService');

const getAllDestination = async () =>{
    try {
        return await destinationService.getAllDestination();
    } catch (error) {
        throw error;
    }
    
}

const addNewDestination = async (destinationName, content, mainImage, address) => {
    try {
        await destinationService.addNewDestination(destinationName, content, mainImage, address);
    } catch (error) {
        throw error;
    }
    
}

const deleteDesById = async (id)=>{
    try {
        return await destinationService.deleteDesById(id);
    } catch (error) {
        throw error;
    }
}



module.exports = {
    getAllDestination,
    addNewDestination,
    deleteDesById
};