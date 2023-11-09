
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

const addNewDestination = async (destinationName, contents) => {
    try {
        await destinationService.addNewDestination(destinationName,contents);
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

const updateDestination = async (id, destinationName, content) => {
    try {
        return await destinationService.updateDestination(id, destinationName, content);
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