var express = require('express');
var router = express.Router();
const tourGuideController = require('../../component/tourGuide/TourGuideController');


//http://localhost:3000/tourGuide/api/addTourGuide
router.post('/addTourGuide', async (req, res, next) => {
    try {
        const { name, phoneNumber, email, avatar, workPlaces } = req.body;
        console.log(name, phoneNumber, email, avatar, workPlaces)
        const tourGuide = await tourGuideController.createNewTourGuide(name, phoneNumber, email, avatar, workPlaces);
        return res.status(200).json({ result: true, tourGuide: tourGuide, message: "Add tourGuide Success" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, error: error, message: "Add tourGuide Failed" });
    }
})



// cập nhật tourGuide
// http://localhost:3000/tourGuide/api/update-tourGuide/64a94d4b8edee1be600646c2
router.put('/update-tourGuide/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, phoneNumber, email, avatar, workPlaces } = req.body;
        console.log(id, name, phoneNumber, email, avatar, workPlaces)
        const tourGuide = await tourGuideController.updateTourGuide(id, name, phoneNumber, email, avatar, workPlaces);
        return res.status(200).json({ result: true, tourGuide: tourGuide, message: "Update tourGuide Success" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, error: error, message: "Update tourGuide Failed" });
    }
})


// Xóa tourGuide
// http://localhost:3000/tourGuide/api/delete-tourGuide/64a94eeb8edee1be600646c4
router.delete('/delete-tourGuide/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const tourGuide = await tourGuideController.removeTourGuide(id);
        return res.status(200).json({ result: true, tourGuide: tourGuide, message: "Delete tourGuide Success" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, error: error, message: "Delete tourGuide Failed" });
    }
})


// Lấy danh sách tourGuide
// http://localhost:3000/tourGuide/api/get-all-tourGuide
router.get("/get-all-tourGuide", async (req, res) => {
    try {
        const tourGuide = await tourGuideController.getAllTourGuide();
        return res.status(200).json({ result: true, tourGuide: tourGuide, message: "Get All list tourGuide Successfully" });
    } catch (error) {
        return res.status(400).json({ result: false, hotels: [], message: "Get All list tourGuide Failed" });
    }
});

module.exports = router;