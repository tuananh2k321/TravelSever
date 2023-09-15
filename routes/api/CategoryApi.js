var express = require('express');
var router = express.Router();
const categoryController = require('../../component/category/CategoryController');


// http://localhost:3000/api/categoryApi
router.get('/', async function(req,res,next){
    try {
        const categories = await categoryController.getAllCategory();
        res.status(200).json({result : true , categories});
    } catch (error) {
        res.status(400).json({result:false,error});
    }
});

// http://localhost:3000/api/categoryApi
router.post('/',async function(req,res,next){
    try {
        const {categoryName,image} = req.body;
        await categoryController.addNewCategory(categoryName,image);
        res.status(200).json({result: true,});
    } catch (error) {
        res.status(400).json({result: false ,error});
    }
});


module.exports = router;