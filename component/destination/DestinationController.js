
const destinationService = require('./DestinationService');

const getAllDestination = async () => {
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

const deleteDesById = async (id) => {
    try {
        return await destinationService.deleteDesById(id);
    } catch (error) {
        throw error;
    }
}

const updateDestination = async (id, destinationName, content, mainImage, address) => {
    try {
        return await destinationService.updateDestination(id, destinationName, content, mainImage, address);
    } catch (error) {
        throw error;
    }
}

const getDesById = async (id) => {
    return await destinationService.getDesById(id);
}


module.exports = {
    getAllDestination,
    addNewDestination,
    deleteDesById,
    updateDestination,
    getDesById
};