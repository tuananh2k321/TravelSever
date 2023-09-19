var express = require('express');
var router = express.Router();
var tourController = require('../component/tour/TourController')
const uploadImage = require('../middleware/UpLoadImage');
const hotelController = require('../component/hotel/HotelController')
const destinationController = require('../component/destination/DestinationController')


// http://localhost:3000/tour/cpanel/tour-table
router.get('/tour-table',async function(req, res,next) {
    const tours = await tourController.getAllTour();
    res.render('tour/tourTable',{tours});
});


// http://localhost:3000/tour/cpanel/insert/tour
// trang thêm tour
router.get('/insert-tour',async function(req, res,next) {
    const hotel = await hotelController.getAllHotels();
    const destination = await destinationController.getAllDestination();
    res.render('tour/insertTour',{hotel,destination});
});
// xử lí thêm tour
router.post('/insert-tour',[uploadImage.single('mainImage')],async (req,res,next) =>{
    try {
         let {body,file} = req;
        if(file){
            let mainImage = `http://192.168.2.25:3000/images/${file.filename}`;
            body = {...body, mainImage: mainImage};
        }
        let {tourName, description, price, mainImage,checking, rating, address, 
            hotel_id,destination_id,domain} =body;
            console.log(tourName, description, price, mainImage,checking, rating, address,
             hotel_id,destination_id,domain);
        await tourController.addNewTour(tourName, description, price, mainImage,checking, rating, address,
              hotel_id,destination_id,domain);
        return res.render('tour/insertTour');
    } catch (error) {
        console.log('Add new  error:',error);
        next(error);
    }
});

module.exports = router;