var express = require('express');
var router = express.Router();
var tourController = require('../component/tour/TourController')
const authen = require('../middleware/Authen')
const hotelController = require('../component/hotel/HotelController')
const destinationController = require('../component/destination/DestinationController')
const tourGuideController = require('../component/tourGuide/TourGuideController')
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const appFirebase = require("../component/config/FirebaseConfig")
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();
const storageRef = ref(storage, 'tour/');
const multerStorage = multer.memoryStorage();
const uploadImage = multer({ storage: multerStorage });



// http://localhost:3000/tour/cpanel/tour-table
router.get('/tour-table', [authen.checkTokenCpanel],async function(req, res,next) {
    const tours = await tourController.getAllTour();
    const user = req.session.user;
    res.render('tour/tourTable',{tours,user});
});


// hiển thị trang chi tiet tour
// http://localhost:3000/tour/cpanel/detail-tour/6513010dd9a0f3bd36583d8e
router.get('/detail-tour/:id', [authen.checkTokenCpanel], async function (req, res, next) {
    try {
        const {id} = req.params;
        const user = req.session.user;
        const tour = await tourController.getTourById(id);
        // get hotelName
        const idToQuery = tour.hotel_id;
        const datahotel = await hotelController.getHotelById(idToQuery);

        //get tourGuideName
        const idTourGuide = tour.tourGuide_id;
        console.log(">>>>>>>>>>>>>>>>" , idTourGuide);
        const dataTourGuide = await tourGuideController.getTourGuide(idTourGuide);

        // get destinatioonName
        const idToQuery1 = tour.destination_id;
        console.log(">>>>>>>>>>>>>>>>" , idToQuery1);
        const dataDestination = await destinationController.getDataByArrayOfIds(idToQuery1);
        console.log(">>>>>>>>>>>>>>>>" , dataDestination);
        res.render('tour/tourDetail', {tour, user,datahotel,dataDestination,dataTourGuide});
    } catch (error) {
        console.log("Get detail tour error: ", error);
        next(error);
    }
});


// http://localhost:3000/tour/cpanel/insert-tour
// trang thêm tour
router.get('/insert-tour', [authen.checkTokenCpanel],async function(req, res,next) {
    const hotel = await hotelController.getAllHotels();
    const user = req.session.user;
    const destination = await destinationController.getAllDestination();
    const tourGuide = await tourGuideController.getAllTourGuide();
    res.render('tour/insertTour',{hotel,destination,user,tourGuide});
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

        let {tourName, adultPrice, childrenPrice,childrenAge,adultAge,departmentPlace,departmentDate, limitedDay,
            operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id} =body;
            console.log(tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
                operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id);
        await tourController.addNewTour(tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
            operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id);
        return res.render('tour/insertTour');
    } catch (error) {
        console.log('Add new  error:',error);
        next(error);
    }
});


// xóa tour
router.get('/:id/delete', [authen.checkTokenCpanel], async (req, res, next) =>{
    try {
        const {id} = req.params;
        await tourController.deleteTour(id);
        return res.json({status: true})
    } catch (error) {
        return res.json({status: false})
    }
});


// trang edit tour
router.get('/:id/edit-tour', [authen.checkTokenCpanel], async (req, res, next) =>{
    try {
        const {id} = req.params;
        const tour = await tourController.getTourById(id);
        const user = req.session.user;
        let hotel = await hotelController.getAllHotels();
        const destination = await destinationController.getAllDestination();
        const tourGuide = await tourGuideController.getAllTourGuide();

        // check destination (false:ko đc chọn , true:đc chọn)
        for(let index =0; index<destination.length; index++){ // vòng lập duyệt phần tử mà destination có
            const element = destination[index]; // gán cho destination  tại vị trí index là element
            destination[index].checked =false;  // gán cho destination  tại vị trí index có checkes là false
            for(let i = 0 ; i< tour.destination_id.length ; i++){ // vòng lập chạy hết dữ liệu mà tour.destination_id có
                if(element._id == tour.destination_id[i]){   // nếu element có id == với tour.destination_id[i] tại một giá trị nào đó
                    destination[index].checked = true; // gán cho destination tại vị trí index có cheked là true
                }
            }
            
        }

        // check TourGuide (false:ko đc chọn , true:đc chọn)

        for(let i = 0 ; i< tourGuide.length ; i++){// vòng lập duyệt phần tử mà tourguidee có
            const element = tourGuide[i];
            tourGuide[i].checked = false;
            if(element._id == tour.tourGuide_id){ // nếu có 1 giá trị mà element._id = với id_tourGuide trong tour hiện tại 
                tourGuide[i].checked = true; // thì gán thành true
                console.log(">>>>>>>>>>>>>>>",element._id)
                break;  // dừng lại
            }
        }

        res.render('tour/editTour', {tour, hotel,destination,user,tourGuide});
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
          let {tourName, adultPrice, childrenPrice,childrenAge,adultAge,departmentPlace,departmentDate, limitedDay,
            operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id} =body;
            console.log(tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
                operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id);

        await tourController.updateTour(id,tourName, adultPrice, childrenPrice,childrenAge,adultAge, tourImage,departmentPlace,departmentDate, limitedDay,
            operatingDay,limitedPerson,offer, vehicle,description,rating,isdomain,isState,hotel_id,tourGuide_id,destination_id);
        return res.redirect('/tour/cpanel/tour-table');
    } catch (error) {
        console.log('update  error:',error);
        next(error);
    }
});




// http://localhost:3000/tour/cpanel/tour-table/rating
// get tour theo rating
router.get('/tour-table/rating', [authen.checkTokenCpanel], async function(req, res,next) {
    const tours = await tourController.getTourRating();
    res.render('tour/tourTable',{tours});
});


// http://localhost:3000/tour/cpanel/tour-table/search?searchName=asd
router.get('/tour-table/search', [authen.checkTokenCpanel], async (req, res) => {
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