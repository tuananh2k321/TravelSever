const TourModel = require('../tour/TourModel');
const destinationModel = require('./DestinationModel');

const getAllDestination = async () => {
    try {
        return await destinationModel.find();
    } catch (error) {
        console.log("getAllDestination  failed: ", error);
    }
    return [];
}

const getDataByArrayOfIds = async(ids) => {
    try {
        // Truy vấn dựa vào một mảng các ObjectId
    const query = { _id: { $in: ids.map(id => Array(id)) } };
    const result = await destinationModel.find(query);
    return result;
    } catch (error) {
        console.error('Lỗi truy vấn dữ liệu:', error);
    }
}

const addNewDestination = async (destinationName, content, mainImage, address,area) => {
    try {
        const newDestination = {
            destinationName,
            content,
            mainImage,
            address,
            area
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


const updateDestination = async (id, destinationName, content, mainImage, address,area) => {
    try {
        let destination = await destinationModel.findById(id);
        if (destination) {
            destination.destinationName = destinationName ? destinationName : destination.destinationName;
            destination.content = content ? content : destination.content;
            destination.mainImage = mainImage ? mainImage : destination.mainImage;
            destination.address = address ? address : destination.address;
            destination.area = area ? area : destination.area;
            await destination.save();
            return true;
        }
    } catch (error) {
        console.log("Update destination error :", error);
        return false;
    }
}


module.exports = {
    getAllDestination, addNewDestination, deleteDesById, updateDestination, getDesById,getDataByArrayOfIds
};