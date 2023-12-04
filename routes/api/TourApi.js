var express = require("express");
var router = express.Router();
const tourController = require("../../component/tour/TourController");
const hotelController = require("../../component/hotel/HotelController");
const tourGuideController = require("../../component/tourGuide/TourGuideController");
const destinationController = require("../../component/destination/DestinationController");
const tourModel = require("../../component/tour/TourModel");
const tourService = require("../../component/tour/TourService");
const userService = require("../../component/user/UserService")
const myBookingService = require("../../component/my_booking/MyBookingService")
const nodemailer = require("nodemailer");
// http://localhost:3000/tour/api/get-all-tour
router.get("/get-all-tour", async function (req, res, next) {
  try {
    const tours = await tourController.getAllTour();
    res.status(200).json({ result: true, tours });
  } catch (error) {
    res.status(400).json({ result: false, error });
  }
});


// http://localhost:3000/tour/api/get-closed-tour
router.get("/get-closed-tour", async function (req, res, next) {
  try {
    const tours = await tourService.getClosedTour();
    res.status(200).json({ result: true, tours });
  } catch (error) {
    res.status(400).json({ result: false, error });
  }
});

// http://localhost:3000/tour/api/inser-tour
// them tour
router.post("/inser-tour", async function (req, res, next) {
  try {
    const {
      tourName,
      adultPrice,
      childrenPrice,
      tourImage,
      departmentPlace,
      departmentDate,
      limitedDay,
      operatingDay,
      vehicle,
      description,
      rating,
      isState,
      hotel_id,
      destination_id,
    } = req.body;
    const tour = await tourController.addNewTour(
      tourName,
      adultPrice,
      childrenPrice,
      tourImage,
      departmentPlace,
      departmentDate,
      limitedDay,
      operatingDay,
      vehicle,
      description,
      rating,
      isState,
      hotel_id,
      destination_id
    );
    if (tour) {
      return res
        .status(200)
        .json({ result: true, hotel: tour, message: "Add hotel Success" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ result: false, error: error, message: "Add hotel Failed" });
  }
});
//http://localhost:3000/api/tourApi/:id/delete
// xoa tour
router.post("/:id/delete", async function (req, res, next) {
  try {
    const { id } = req.params;
    await tourController.deleteTour(id);
    return res
      .status(200)
      .json({ result: true, message: "Delete tour Success" });
  } catch (error) {
    return res
      .status(400)
      .json({ result: false, message: "Delete tour Success" });
  }
});
// http://localhost:3000/tour/api/:id/detail
// get tour theo id
router.get("/:id/detail", async function (req, res, next) {
  try {
    const { id } = req.params;
    const tour = await tourController.getTourById(id);
    // get hotelName
    const idToQuery = tour.hotel_id;
    const datahotel = await hotelController.getHotelById(idToQuery);

    //get tourGuideName
    const idTourGuide = tour.tourGuide_id;
    console.log(">>>>>>>>>>>>>>>>", idTourGuide);
    const dataTourGuide = await tourGuideController.getTourGuide(idTourGuide);

    // get destinatioonName
    const idToQuery1 = tour.destination_id;
    console.log(">>>>>>>>>>>>>>>>", idToQuery1);
    const dataDestination = await destinationController.getDesById(idToQuery1);
    console.log(">>>>>>>>>>>>>>>>", dataDestination);
    res
      .status(200)
      .json({ result: true, tour, datahotel, dataDestination, dataTourGuide });
  } catch (error) {
    res.status(400).json({ result: false, error });
  }
});

// http://localhost:3000/tour/api/list/name?keyword=abc
router.get("/list/name", async function (req, res, next) {
  try {
    const { keyword } = req.query;
    const tours = await tourController.getTourListName(keyword);
    return res.status(200).json({ tours });
  } catch (error) {
    console.log("search: ", error);
    return res.status(400).json({});
  }
});

// http://localhost:3000/tour/api/search/name?q=abc
router.get("/search/name", async function (req, res, next) {
  try {
    const { q } = req.query;
    const tours = await tourController.getTourSearchName(q);
    
    return res.status(200).json({ result: true, tours });
  } catch (error) {
    console.log("search: ", error);
    return res.status(400).json({});
  }
});
// http://localhost:3000/tour/api/listDomain/isdomain?keyword=abc
router.get("/listDomain/isdomain", async function (req, res, next) {
  try {
    //  const keyword = 'Mien Bac';
    const { keyword } = req.query;
    const tours = await tourController.getTourSearhDomain(keyword);
    return res.status(200).json({ result: true, tours });
  } catch (error) {
    console.log("search: ", error);
    return res.status(400).json({});
  }
});

// http://localhost:3000/tour/api/list/tourRating
router.get("/list/tourRating", async function (req, res, next) {
  try {
    const tours = await tourController.getTourRating();
    res.status(200).json({ result: true, tours });
  } catch (error) {
    res.status(400).json({ result: false, error });
  }
});

//http://localhost:3000/tour/api/updateDomain
router.post("/updateDomain", async (req, res) => {
  try {
    const id = req.body.id;
    const isdomain = req.body.isdomain;
    const result = tourController.updateDomain(id, isdomain);
    if (result) {
      return res.status(200).json({ result: true, message: "Update Success" });
    } else {
      return res.status(400).json({ result: false, message: "fail" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});
//http://localhost:3000/tour/api/departmentDate
router.post("/departmentDate", async (req, res) => {
  try {
    const id = req.body.id;
    const departmentDate = req.body.departmentDate;
    const ngayThangNamDate = new Date(departmentDate);  
    const ngayThangNamDaFormat = ngayThangNamDate.toLocaleDateString('en-GB');// định dạng dd/mm/yyyy
    let tour = await tourModel.findById(id);
    if (tour) {
        tour.departmentDate = ngayThangNamDaFormat ? ngayThangNamDaFormat : tour.departmentDate;
        await tour.save();
        return res.status(200).json({ result: true, message: "Update Success" });
    }else {
      return res.status(400).json({ result: false, message: "fail" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});

//http://localhost:3000/tour/api/expectedDate
router.post("/expectedDate", async (req, res) => {
  try {
    const id = req.body.id;
    let tour = await tourModel.findById(id);
    const chuoiDate = tour.limitedDay.toString();
    // Cắt chuỗi và lấy số
    const soNgay = parseInt(chuoiDate.match(/\d+/)[0]);
    
    // Tách chuỗi thành mảng [ngày, tháng, năm]
    const [ngay, thang, nam] = tour.departmentDate.split('/');

// Tạo đối tượng Date từ mảng trên (chú ý rằng tháng trong JavaScript là từ 0 đến 11)
    const ngayThangNamDate = new Date(nam, thang - 1, ngay);

    
     ngayThangNamDate.setDate(ngayThangNamDate.getDate() + soNgay);
     
     // Định dạng ngày tháng năm thành chuỗi "dd/mm/yyyy"
    const expectedDate = ngayThangNamDate.toLocaleDateString('en-GB');
    if (tour) {
        tour.expectedDate = expectedDate ? expectedDate : tour.expectedDate;
        await tour.save();
        return res.status(200).json({ result: true, message: "Update Success" });
    }else {
      return res.status(400).json({ result: false, message: "fail" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});

//http://localhost:3000/tour/api/departmentHour
router.post("/departmentHour", async (req, res) => {
  try {
    const id = req.body.id;
    const departmentHour = req.body.departmentHour;
    const result = tourController.departmentHour(id, departmentHour);
    if (result) {
      return res.status(200).json({ result: true, message: "Update Success" });
    } else {
      return res.status(400).json({ result: false, message: "fail" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});

//http://localhost:3000/tour/api/updateAvailable
router.post("/updateAvailable", async (req, res) => {
  try {
    const id = req.body.id;
    const result = tourService.updateAvailablePerson(id);
    if (result) {
      return res.status(200).json({ result: true, message: "Update Success" });
    } else {
      return res.status(400).json({ result: false, message: "fail" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});

// http://localhost:3000/tour/api/list/sortBy?sortBy=asc
router.get("/list/sortBy", async function (req, res, next) {
  try {
    const tours = await tourController.getAllTour();
    const sortBy = req.query.sortBy || "asc";
    // Sắp xếp sản phẩm theo giá tiền
    let sortedtTours;
    if (sortBy === "asc") {
        sortedtTours = tours.sort((a, b) => a.adultPrice - b.adultPrice);
    } else if (sortBy === "desc") {
        sortedtTours = tours.sort((a, b) => b.adultPrice - a.adultPrice);
    } else {
      // Nếu không xác định, sắp xếp theo thứ tự mặc định
      sortedtTours = tours;
    }
    res.status(200).json({ result: true, sortedtTours });
  } catch (error) {
    res.status(400).json({ result: false, error });
  }
});


// http://localhost:3000/tour/api/list/search?q=asc
router.get("/list/search", async function (req, res, next) {
    try {
     // const {q,byDate,byDomain} = req.params;
      const q = req.query.q;
      const byDate = req.query.byDate || "";
      const byDomain = req.query.byDomain || "";
      
      const query = {
        tourName: { $regex: new RegExp(q, 'i') },
      };
  
      // Thêm điều kiện tìm kiếm theo limitedDay nếu byDate được cung cấp
      if (byDate !== undefined && byDate !== '') {
        query.limitedDay = { $regex: new RegExp('^' + byDate, 'i') };
      }
  
      // Thêm điều kiện tìm kiếm theo isdomain nếu byDomain được cung cấp và không phải là chuỗi rỗng
      if (byDomain !== undefined && byDomain !== '') {
        query.isdomain = { $regex: new RegExp(byDomain, 'i') };
      }
      const sortedtTours = await tourModel.find(query);
     
      res.status(200).json({ result: true, sortedtTours });
    } catch (error) {
      res.status(400).json({ result: false, error });
      console.log(error);
    }
  });

//http://localhost:3000/tour/api/send-mail-close-tour?tourId=""
router.post("/send-mail-close-tour", async (req, res, next) => {
  const {reason} = req.body
  const {tourId} = req.query
  const userEmails = await userService.getAllEmailUser()
  const isCloseTour = await tourService.closeTour(tourId, reason) 
  const detailTour = await tourService.getTourById(tourId)
  // send mail
  if (isCloseTour) {
    for(const email of userEmails) {
      console.log(email)
      if (email) {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "haizzj123@gmail.com",
            pass: "xakpztqusyejqykx",
          },
        });
    
        // Tạo một đường link trong email với href trỏ đến API xác thực
        const emailHtml = `
                <h1> Chúng tôi đóng sẽ đóng ${detailTour.tourName}</h1>
                <p>Với lí do là: ${detailTour.reasonCloseTour}</p>
                <img src="${detailTour.tourImage[0]}" width="300px" height="300">
            `;
    
        const mailOptions = {
          from: "haizzj123@gmail.com",
          to: email,
          subject: `Chúng tôi đóng sẽ đóng ${detailTour.tourName}`,
          html: emailHtml,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            //res.status(200).json({ result: true, message: "send fail" });
            console.log("send fail")
          } else {
            //res.status(200).json({ result: true, message: "send success" });
            console.log("send success")
          }
        });
      } else {
        console.log("send fail")
        //res.status(400).json({ result: false, message: "email is not exist!" });
      }
    }
  }
  if (isCloseTour) {
    res.status(200).json({ result: true, message: "close tour success" });
  } else {
    res.status(200).json({ result: false, message: "close tour fail" });
  }
});
module.exports = router;
