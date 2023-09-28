var express = require('express');
var router = express.Router();
var tourController = require('../component/tour/TourController')

const hotelController = require('../component/hotel/HotelController')
const destinationController = require('../component/destination/DestinationController')
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const appFirebase = require("../component/config/FirebaseConfig")
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();
const storageRef = ref(storage, 'tour/');
const multerStorage = multer.memoryStorage();
const uploadImage = multer({ storage: multerStorage });



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
router.post('/insert-tour',[uploadImage.array('tourImage',10)],async (req,res,next) =>{
    try {
         let {body,files} = req;
         let tourImage = [];

         
         if (files && files.length > 0) {
            const uploadedImagePromises = files.map(async (file) => {
              const filename = `${Date.now()}-${file.originalname}`;
              const fileRef = ref(storageRef, filename);
      
              const metadata = {
                contentType: file.mimetype,
              };
      
              const snapshot = await uploadBytesResumable(fileRef, file.buffer, metadata);
              const downloadURL = await getDownloadURL(snapshot.ref);
      
              console.log(`File ${file.originalname} successfully uploaded to Firebase Storage.`);
      
              return downloadURL;
            });
      
            tourImage = await Promise.all(uploadedImagePromises);
          }

        let {tourName, adultPrice, childrenPrice,address, limitedDay,
            operatingDay, vehicle,description,rating,isState,hotel_id,destination_id} =body;
            console.log(tourName, adultPrice, childrenPrice, tourImage,address, limitedDay,
                operatingDay, vehicle,description,rating,isState,hotel_id,destination_id);
        await tourController.addNewTour(tourName, adultPrice, childrenPrice, tourImage,address, limitedDay,
            operatingDay, vehicle,description,rating,isState,hotel_id,destination_id);
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
router.post('/:id/edit-tour',[uploadImage.array('tourImage',10)],async (req,res,next) =>{
    try {
        let {body,files} = req;
        let tourImage = [];
        let {id} = req.params;
         if (files && files.length > 0) {
            const uploadedImagePromises = files.map(async (file) => {
              const filename = `${Date.now()}-${file.originalname}`;
              const fileRef = ref(storageRef, filename);
      
              const metadata = {
                contentType: file.mimetype,
              };
      
              const snapshot = await uploadBytesResumable(fileRef, file.buffer, metadata);
              const downloadURL = await getDownloadURL(snapshot.ref);
      
              console.log(`File ${file.originalname} successfully uploaded to Firebase Storage.`);
      
              return downloadURL;
            });
      
            tourImage = await Promise.all(uploadedImagePromises);
          }
          let {tourName, adultPrice, childrenPrice,address, limitedDay,
            operatingDay, vehicle,description,rating,isState,hotel_id,destination_id} =body;
            console.log(tourName, adultPrice, childrenPrice, tourImage,address, limitedDay,
                operatingDay, vehicle,description,rating,isState,hotel_id,destination_id);

        await tourController.updateTour(id,tourName, adultPrice, childrenPrice, tourImage,address, limitedDay,
            operatingDay, vehicle,description,rating,isState,hotel_id,destination_id);
        return res.redirect('/tour/cpanel/tour-table');
    } catch (error) {
        console.log('update  error:',error);
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