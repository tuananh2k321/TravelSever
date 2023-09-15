const categoryModel = require('./CategoryModel');

const getAllCategory = async () => {
    try {
        return await categoryModel.find().sort({createdAt:-1});
    } catch (error) {
        console.log("getAllCategory  failed: ", error);
    }
    return [];
}

const addNewCategory = async (categoryName, image) => {
    try {
        const newCategory = {
            categoryName,
            image
        }
        await categoryModel.create(newCategory);
        return true;
      } catch (error) {
        console.log("addCategory error: " + error)
        return false;
      }
}

const updateCategory = async (id,categoryName,image) => {
    try {
        let category = await categoryModel.findById(id);
        if(category){
            category.categoryName = categoryName ? categoryName : category.categoryName;
            category.image = image ? image : category.image;
            await category.updateOne();
            return true;
        }
    } catch (error) {
        console.log("Update category error :",error);
        return false;
    }
}

const deleteCategory = async (id) => {
    try {
        await categoryModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log("Delete category: ",error);
        return false;
    }
}


module.exports = {
    getAllCategory,addNewCategory,updateCategory,deleteCategory
};