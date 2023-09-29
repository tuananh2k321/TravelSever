var express = require('express');
var router = express.Router();

const favoriteController = require('../../component/favorite/FavoriteController');

//http://localhost:3000/favorite/api
router.get('/getFavorite', async (req, res, next) =>{
    try {
        const favorite = await favoriteController.getListFavorite();
        res.status(200).json({result: true, favorite: favorite, message: "Get favorite Success"})
    } catch (error) {
        res.status(400).json({result: false, error, message: "Get favorite fail"})
    }
});

router.get('/:timestamp/:user_id/:tour_id/addFavorite', async(req, res, next)=>{
    try {
        const {timestamp, user_id, tour_id} = req.params;
        await favoriteController.addFavorite(timestamp, user_id, tour_id);
        res.status(200).json({result: true, message: "Add favorite Success"})
    } catch (error) {
        res.status(400).json({result: false, message: "Add favorite fail"})
    }
});

router.delete('/:id/deleteFavorite', async(req,res, next)=>{
    try {
        const {id} = req.params;
        await favoriteController.deleteFavoritebyid(id);
        return res.status(200).json({result: true, message: "Delete favorite Success"})
    } catch (error) {
        return res.status(400).json({result: true, message: "Dekete favorite fail"})
    }
})

module.exports = router;