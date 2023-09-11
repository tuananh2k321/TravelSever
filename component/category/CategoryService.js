const categoryModel = require('./CategoryModel');

const getAllCategory = async () => {
    try {
        return await categoryModel.find().sort({createdAt:-1});
    } catch (error) {
        console.log("getAllCategory  failed: ", error);
    }
    return [];
}