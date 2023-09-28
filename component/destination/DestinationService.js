const destinationModel = require('./DestinationModel');

const getAllDestination = async () => {
    try {
        return await destinationModel.find();
    } catch (error) {
        console.log("getAllDestination  failed: ", error);
    }
    return [];
}

const addNewDestination = async (destinationName, content, mainImage, address) => {
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

const deleteDesById = async (id) => {
    try {
        await destinationModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log("Delete tour: ", error);
        return false;
    }
}

const getDesById = async (id) => {
    try {
        let destination = await destinationModel.findById(id);
        return destination;
    } catch (error) {
        console.log("getdesById error" + error);
        return false;
    }
}


const updateDestination = async (id, destinationName, content, mainImage, address) => {
    try {
        let destination = await destinationModel.findById(id);
        if (destination) {
            destination.destinationName = destinationName ? destinationName : destination.destinationName;
            destination.content = content ? content : destination.content;
            destination.mainImage = mainImage ? mainImage : destination.mainImage;
            destination.address = address ? address : destination.address;
            await destination.save();
            return true;
        }
    } catch (error) {
        console.log("Update destination error :", error);
        return false;
    }
}


module.exports = {
    getAllDestination, addNewDestination, deleteDesById, updateDestination, getDesById
};