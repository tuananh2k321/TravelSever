var express = require('express');
var router = express.Router();
const destinationController = require('../../component/destination/DestinationController');


// http://localhost:3000/destination/api
router.get('/', async function(req,res,next){
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
        const {destinationName,description, image,address} = req.body;
        await destinationController.addNewDestination(destinationName,description, image,address);
        res.status(200).json({result: true,});
    } catch (error) {
        res.status(400).json({result: false ,error});
    }
});


module.exports = router;