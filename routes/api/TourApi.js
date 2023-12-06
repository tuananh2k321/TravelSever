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

// tour sap dien ra
// http://localhost:3000/tour/api/get-tour-will-travel
router.get("/get-tour-will-travel", async function (req, res, next) {
  try {
    const tours = await tourService.getBookingTour();

    // Lọc theo điều kiện departmentdate > date now < expectedDate
    const currentDate = new Date();
      console.log("currentDate:", currentDate)
    const filteredBookings = tours.filter((booking) => {
      // departmentDate
      const [day, month, year] = booking.departmentDate.split('/');
      const adjustedMonth = parseInt(month, 10) - 1; // Adjust for zero-based month
      const adjustedDay = parseInt(day, 10) + 1; // Adjust for zero-based day
      const departmentDate = new Date(year, adjustedMonth, adjustedDay);
      
      console.log("tour: "+ currentDate+" < "+booking.departmentDate)
      console.log("departmentDate:", departmentDate)
      
      return  currentDate < departmentDate  ;
    });

    res.status(200).json({ result: true, tours: filteredBookings });
  } catch (error) {
    res.status(400).json({ result: false, error });
  }
});

// tour dang dien ra
// http://localhost:3000/tour/api/get-traveling-tour
router.get("/get-traveling-tour", async function (req, res, next) {
  try {
    const tours = await tourService.getBookingTour();

    // Lọc theo điều kiện departmentdate > date now < expectedDate
    const currentDate = new Date();
      console.log("currentDate:", currentDate)
    const filteredBookings = tours.filter((booking) => {
      // departmentDate
      const [day, month, year] = booking.departmentDate.split('/');
      const adjustedMonth = parseInt(month, 10) - 1; // Adjust for zero-based month
      const adjustedDay = parseInt(day, 10) + 1; // Adjust for zero-based day
      const departmentDate = new Date(year, adjustedMonth, adjustedDay);
      
      //expectedDate
      const [day2, month2, year2] = booking.expectedDate.split('/');
      const adjustedMonth2 = parseInt(month2, 10) - 1; // Adjust for zero-based month
      const adjustedDay2 = parseInt(day2, 10) + 1; // Adjust for zero-based day
      const expectedDate = new Date(year2, adjustedMonth2, adjustedDay2);
      
      console.log("tour: "+ booking.departmentDate +" < "+currentDate+" < "+booking.expectedDate)
      console.log("departmentDate:", departmentDate)
      console.log("expectedDate:", expectedDate)
      
      return  currentDate > departmentDate  && currentDate < expectedDate;
    });

    res.status(200).json({ result: true, tours: filteredBookings });
  } catch (error) {
    res.status(400).json({ result: false, error });
  }
});

// tour da hoan thanh
// http://localhost:3000/tour/api/get-completed-tour
router.get("/get-completed-tour", async function (req, res, next) {
  try {
    const tours = await tourService.getBookingTour();

    // Lọc theo điều kiện departmentdate > date now < expectedDate
    const currentDate = new Date();
      console.log("currentDate:", currentDate)
    const filteredBookings = tours.filter((booking) => {

      //expectedDate
      const [day2, month2, year2] = booking.expectedDate.split('/');
      const adjustedMonth2 = parseInt(month2, 10) - 1; // Adjust for zero-based month
      const adjustedDay2 = parseInt(day2, 10) + 1; // Adjust for zero-based day
      const expectedDate = new Date(year2, adjustedMonth2, adjustedDay2);
      
      console.log("tour: "+currentDate+" > "+booking.expectedDate)
      console.log("expectedDate:", expectedDate)
      
      return  currentDate > expectedDate;
    });

    res.status(200).json({ result: true, tours: filteredBookings });
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
    console.log(id);
    const departmentDate = req.body.departmentDate;
    const ngayThangNamDate = new Date(departmentDate);  
    console.log("ngayThangNamDate",ngayThangNamDate)
    const ngayThangNamDaFormat = ngayThangNamDate.toLocaleDateString('en-GB');// định dạng dd/mm/yyyy
    function parseDateString(dateString) {
      // Tách ngày, tháng và năm từ chuỗi đầu vào
      const [day, month, year] = dateString.split('/');
  
      // Chuyển đổi thành đối tượng Date
      const formattedDate = new Date(`${year}-${month}-${day}`);
  
      return formattedDate;
  }
    let tour = await tourModel.findById(id);
    const chuoiDate = tour.limitedDay.toString();
    // Cắt chuỗi và lấy số
    const soNgay = parseInt(chuoiDate.match(/\d+/)[0]);
    
    // Tách chuỗi thành mảng [ngày, tháng, năm]
    const [ngay, thang, nam] = ngayThangNamDaFormat.split('/');

// Tạo đối tượng Date từ mảng trên (chú ý rằng tháng trong JavaScript là từ 0 đến 11)
    const ngayThangNamDate1 = new Date(nam, thang - 1, ngay);

    
     ngayThangNamDate1.setDate(ngayThangNamDate1.getDate() + soNgay);
     
     // Định dạng ngày tháng năm thành chuỗi "dd/mm/yyyy"
    const expectedDate = ngayThangNamDate1.toLocaleDateString('en-GB');
    const convertedDate = parseDateString(tour.expectedDate);
    
    const availablePerson = tour.limitedPerson; // cập nhật lại 
    if (ngayThangNamDate > convertedDate) {
        await tourService.updateIsBooking(id)
        tour.departmentDate = ngayThangNamDaFormat ? ngayThangNamDaFormat : tour.departmentDate;
        tour.expectedDate = expectedDate ? expectedDate : tour.expectedDate;
        tour.availablePerson = availablePerson ? availablePerson : tour.availablePerson;
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

//http://localhost:3000/tour/api/updateIsBookingTest
router.post("/updateIsBookingTest", async (req, res) => {
  try {
    const id = req.body.id;
    const result = tourService.updateIsBookingTest(id);
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
      let query;
      if(q != undefined || q != null){
         query = {
          tourName: { $regex: new RegExp(q, 'i') },
        };
      }else{
          query = {
          tourName: { $regex: new RegExp("", 'i') },
        };
      }
     
  
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

//http://localhost:3000/tour/api/send-mail-open-tour?tourId=""
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
                <p>Chúng tôi sẽ hoàn lại đúng số tiền mà quý khách đã đạt tour</p>
                <h2>Chúng tôi thành thật xin lỗi vì sự bất tiện này ${detailTour.tourName}</h2>
                <p>Nếu có thắc mắc hãy gọi số: 0921011337</p>
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

//http://localhost:3000/tour/api/send-mail-open-tour?tourId=""
router.post("/send-mail-open-tour", async (req, res, next) => {
  const {tourId} = req.query
  const userEmails = await userService.getAllEmailUser()
  const isOpenTour = await tourService.openTour(tourId) 
  const detailTour = await tourService.getTourById(tourId)
  // send mail
  if (isOpenTour) {
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
                <h1> Chúng tôi đã mở lại ${detailTour.tourName}</h1>
                <img src="${detailTour.tourImage[0]}" width="300px" height="300">
            `;
    
        const mailOptions = {
          from: "haizzj123@gmail.com",
          to: email,
          subject: `Chúng tôi đã mở lại ${detailTour.tourName}`,
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
  if (isOpenTour) {
    res.status(200).json({ result: true, message: "open tour success" });
  } else {
    res.status(200).json({ result: false, message: "open tour fail" });
  }
});
module.exports = router;
