
const destinationService = require('./DestinationService');

const getAllDestination = async () => {
    try {
        return await destinationService.getAllDestination();
    } catch (error) {
        throw error;
    }

}

const getDataByArrayOfIds = async (ids) => {
    try {
        return await destinationService.getDataByArrayOfIds(ids);
    } catch (error) {
        throw error;
    }
}

const addNewDestination = async (destinationName, contents, address,area) => {
    try {
        await destinationService.addNewDestination(destinationName,contents, address,area);
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

const updateDestination = async (id, destinationName, content, mainImage, address,area) => {
    try {
        return await destinationService.updateDestination(id, destinationName, content, mainImage, address,area);
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
    getDesById,
    getDataByArrayOfIds
};