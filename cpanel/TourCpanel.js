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
router.post('/insert-tour',[uploadImage.array('mainImage',10)],async (req,res,next) =>{
    try {
         let {body,files} = req;
         let mainImage = [];
         if (files && files.length > 0) {
           mainImage = files.map(file => `http://192.168.2.25:3000/images/${file.filename}`);
         }

        let {tourName, description, price,checking, rating, address, 
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


// xóa tour
router.get('/:id/delete', async (req, res, next) =>{
    try {
        const {id} = req.params;
        await tourController.deleteTour(id);
        return res.json({status: true})
    } catch (error) {
        return res.json({status: false})
    }
});


// trang edit tour
router.get('/:id/edit-tour', async (req, res, next) =>{
    try {
        const {id} = req.params;
        const tour = await tourController.getTourById(id);
        let hotel = await hotelController.getAllHotels();
        let destination = await destinationController.getAllDestination();
        

        for(let index =0; index<hotel.length; index++){
            const element = hotel[index];
            hotel[index].selected =false;
            if(element._id == tour.hotel_id){
                hotel[index].selected = true;
            }
        }


        res.render('tour/editTour', {tour, hotel,destination});
    } catch (error) {
        console.log('edit new  error:',error);
        next(error);
    }
});
// xử lí edit tour
router.post('/:id/edit-tour',[uploadImage.single('mainImage')],async (req,res,next) =>{
    try {
         let {body,file} = req;
         let {id} = req.params;
        if(file){
            let mainImage = `http://192.168.2.25:3000/images/${file.filename}`;
            body = {...body, mainImage: mainImage};
        }
        let {tourName, description, price, mainImage,checking, rating, address, 
            hotel_id,destination_id,domain} =body;

            console.log(tourName, description, price, mainImage,checking, rating, address,
             hotel_id,destination_id,domain);

        await tourController.updateTour(id, tourName, description, price, mainImage,checking, rating, address,
              hotel_id,destination_id,domain);
        return res.redirect('/tour/cpanel/tour-table');
    } catch (error) {
        console.log('Add new  error:',error);
        next(error);
    }
});




// http://localhost:3000/tour/cpanel/tour-table/rating
// get tour theo rating
router.get('/tour-table/rating',async function(req, res,next) {
    const tours = await tourController.getTourRating();
    res.render('tour/tourTable',{tours});
});


// http://localhost:3000/tour/cpanel/tour-table/search?searchName=asd
router.get('/tour-table/search', async (req, res) => {
    try {
        const {searchName} = req.query;
        if(searchName == null) {
            return res.render('tour/tourTable');
        }else {
            const tours = await tourController.getTourSearchName(searchName);
            res.render('tour/tourTable',{tours});
        }
    } catch (error) {
        console.log("search error ", error);
        next(error);
    }
    
  });




module.exports = router;