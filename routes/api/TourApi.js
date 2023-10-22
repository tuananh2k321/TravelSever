var express = require('express');
var router = express.Router();
const tourController = require('../../component/tour/TourController');
const tourModel = require('../../component/tour/TourModel');


// http://localhost:3000/tour/api/get-all-tour
router.get('/get-all-tour', async function(req,res,next){
    try {
        const tours = await tourController.getAllTour();
        res.status(200).json({result : true , tours});
    } catch (error) {
        res.status(400).json({result:false,error});
    }
});
// http://localhost:3000/tour/api/inser-tour
// them tour
router.post('/inser-tour', async function(req,res,next){
  try {
    const { tourName, adultPrice, childrenPrice, tourImage,departmentPlace,departmentDate, limitedDay,
        operatingDay, vehicle,description,rating,isState,hotel_id,destination_id } = req.body;
    const tour = await tourController.addNewTour(tourName, adultPrice, childrenPrice, tourImage,departmentPlace,departmentDate, limitedDay,
        operatingDay, vehicle,description,rating,isState,hotel_id,destination_id );
    if (tour) {
        return res.status(200).json({ result: true, hotel: tour, message: "Add hotel Success" });
    }
} catch (error) {
    return res.status(400).json({ result: false, error: error, message: "Add hotel Failed" });
}
});
//http://localhost:3000/api/tourApi/:id/delete
// xoa tour
router.post('/:id/delete', async function(req,res,next){
    try {
        const {id} = req.params;
        await tourController.deleteTour(id);
        return res.status(200).json({ result: true, message: "Delete tour Success" });
    } catch (error) {
        return res.status(400).json({ result: false, message: "Delete tour Success" });
    }
});
// http://localhost:3000/api/tourApi/:id
// get tour theo id
router.get('/:id',async function(req,res,next)  {
  try {
      const {id} = req.params;
      const tour = await tourController.getTourById(id);
  res.status(200).json({result:true,tour});
  } catch (error) {
      res.status(400).json({result: false,error});
  }
});
// http://localhost:3000/api/tourApi/search/name?keyword=abc
router.get('/search/name',async function(req,res,next)  {
    try {
        const {keyword} = req.query;
        const tours = await tourController.getTourSearchName(keyword);
        return res.status(200).json({tours});
    } catch (error) {
        console.log("search: ", error)
        return res.status(400).json({});
    }
  });
  // http://localhost:3000/tour/api/listDomain/isdomain?keyword=abc
router.get('/listDomain/isdomain',async function(req,res,next)  {
    try {
      //  const keyword = 'Mien Bac';
        const {keyword} = req.query;
        const tours = await tourController.getTourSearhDomain(keyword);
        return res.status(200).json({tours});
    } catch (error) {
        console.log("search: ", error)
        return res.status(400).json({});
    }
  });

  // http://localhost:3000/tour/api/list/tourRating
router.get('/list/tourRating',async function(req,res,next)  {
    try {
        const tours = await tourController.getTourRating();
        res.status(200).json({result : true , tours});
    } catch (error) {
        res.status(400).json({result:false,error});
    }
  });

//http://localhost:3000/tour/api/updateDomain
router.post('/updateDomain', async (req, res) => {
    try {
        const id = req.body.id;
        const isdomain = req.body.isdomain;
        const result = tourController.updateDomain(id, isdomain)
        if (result) {
            return res.status(200).json({ result: true, message: "Update Success" });
        } else {
            return res.status(400).json({ result: false,  message: "fail" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ result: false});
    }
})
 

module.exports = router;