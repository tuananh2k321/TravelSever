var express = require('express');
var router = express.Router();

const favoriteController = require('../../component/favorite/FavoriteController');
const tourController = require('../../component/tour/TourController');
const favoriteService = require('../../component/favorite/FavoriteService')
function getCurrentDateTimeString() {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    return `${dateString} ${timeString}`;
}

//http://localhost:3000/favorite/api/getFavorite
router.get('/getFavorite', async (req, res, next) => {
    try {
        const { id_user } = req.query;
        const favorite = await favoriteController.getListFavorite(id_user);
        console.log("favorite", favorite);

        // Sử dụng Promise.all để lấy danh sách tour theo các tour_id trong favorite
        const favoriteListPromises = favorite.map(async (item) => {
            try {
                const tour = await tourController.getTourById(item.tour_id);
                tour._id = item._id;
                return tour;
            } catch (error) {
                // Xử lý lỗi ở đây
                console.error(`Error fetching tour: ${error.message}`);
                throw error; // Đảm bảo rằng lỗi được truyền xuống Promise.all
            }
        });
        const favoriteList = await Promise.all(favoriteListPromises);

        
        res.status(200).json({ result: true, favorite: favoriteList, message: "Get favorite Success" });
        
         
    } catch (err) {
        console.log(err);
        res.status(400).json({ result: false, error: err });
    }
});

//http://localhost:3000/favorite/api/getFavorite2?id_user=""
router.get('/getFavorite2', async (req, res, next) => {
    try {
        const { id_user } = req.query;
        const favorite = await favoriteService.getListFavorite2(id_user);
        console.log("favorite", favorite);

        res.status(200).json({ result: true, favorite: favorite, message: "Get favorite Success" });
        
         
    } catch (err) {
        console.log(err);
        res.status(400).json({ result: false, error: err });
    }
});



router.get('/:user_id/:tour_id/addFavorite', async (req, res, next) => {
    try {
        const { user_id, tour_id } = req.params;
        const timestamp = getCurrentDateTimeString();
        console.log(timestamp); // 1667135221000
        await favoriteController.addFavorite(timestamp, user_id, tour_id);

        res.status(200).json({ result: true, message: "Add favorite Success" })
    } catch (error) {
        console.log("CHeck error: ", error);
        res.status(400).json({ result: false, message: "Add favorite fail" })
    }
});



router.delete('/:id/deleteFavorite', async (req, res, next) => {
    try {
        const { id } = req.params;
        await favoriteController.deleteFavoritebyid(id);
        return res.status(200).json({ result: true, message: "Delete favorite Success" })
    } catch (error) {
        return res.status(400).json({ result: false, message: "Dekete favorite fail" })
    }
})

module.exports = router;