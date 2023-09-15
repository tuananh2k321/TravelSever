
const categoryService = require('./CategoryService');

const getAllCategory = async () =>{
    return await categoryService.getAllCategory();
}

const addNewCategory = async (categoryName, image) => {
    return await categoryService.addNewCategory(categoryName,image);
}

const updateCategory = async (id,categoryName,image) => {
    return await categoryService.updateCategory(id,categoryName,image);
}

const deleteCategory = async (id) => {
    return await categoryService.deleteCategory(id);
}

module.exports = {
    getAllCategory,
    addNewCategory,
    updateCategory,
    deleteCategory
};