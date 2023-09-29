var express = require('express');
var router = express.Router();
const destinationController = require('../../component/destination/DestinationController');


// http://localhost:3000/destination/api
router.get('/get-destination', async function(req,res,next){
    try {
        const destinations = await destinationController.getAllDestination();
        res.status(200).json({result : true , destinations});
    } catch (error) {
        res.status(400).json({result:false,error});
    }
});

// http://localhost:3000/destination/api/insert-destination
router.post('/insert-destination',async function(req,res,next){
    try {
        const {destinationName, content, mainImage, address} = req.body;
        await destinationController.addNewDestination(destinationName, content, mainImage, address);
        res.status(200).json({result: true,});
    } catch (error) {
        res.status(400).json({result: false ,error});
    }
});

router.post('/:id/delete', async function(req,res,next){
    try {
        const {id} = req.params;
        await destinationController.deleteDesById(id);
        return res.status(200).json({ result: true, message: "Delete destination Success" });
    } catch (error) {
        return res.status(400).json({ result: false, message: "Delete destination fail" });
    }
});


module.exports = router;