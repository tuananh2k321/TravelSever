var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const session = require('express-session');


// API
var indexRouter = require("./routes/api/Index");
var tourAPIRouter = require("./routes/api/TourApi");
var destinationAPIRouter = require("./routes/api/DestinationApi");
var hotelAPIRouter = require("./routes/api/HotelAPI");
var userAPIRouter = require("./routes/api/UserApi");
var favoriteAPIRouter = require("./routes/api/FavoriteApi");
var notificationAPIRouter = require("./routes/api/NotificationApi");
var cartAPIRouter = require("./routes/api/CartApi");
var bookingAPIRouter = require("./routes/api/BookingApi");
var tourGuideAPIRouter = require("./routes/api/TourGuideApi");
const paymentRoutes = require('./routes/api/PaymentRoutes');
var commentAPIRouter = require("./routes/api/CommentApi")
var tokenAPIRouter = require("./routes/api/TokenNotificationApi")
// CPANEL
var tourCpanelRouter = require("./cpanel/TourCpanel");
var userCpanelRouter = require("./cpanel/UserCpanel");
var hotelCpanelRouter = require("./cpanel/HotelCpanel");
var homePageCpanelRouter = require("./cpanel/HomePageCpanel");
var destinationCpanelRouter = require("./cpanel/DestinationCpanel");

var tourGuideCpanelRouter = require("./cpanel/TouGuideCpanel")
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// set session
app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

//MongoDB
mongoose
  .connect(
    "mongodb+srv://haizzj123:Ae1nha@cluster0.b59zk9t.mongodb.net/GoTravel?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));

// Link Api
// http://localhost:3000/
app.use("/", indexRouter);

// API
// http://localhost:3000/tour/api
app.use("/tour/api", tourAPIRouter);

// http://localhost:3000/destination/api
app.use("/destination/api", destinationAPIRouter);

// http://localhost:3000/user/api
app.use("/user/api", userAPIRouter);

// http://localhost:3000/hotel/api
app.use("/hotel/api", hotelAPIRouter);
// http://localhost:3000/booking/api
app.use("/booking/api", bookingAPIRouter);

//
app.use("/tourGuide/api", tourGuideAPIRouter)
// http://localhost:3000/cart/api
app.use("/cart/api", cartAPIRouter);

// http://localhost:3000/favorite/api
app.use("/favorite/api", favoriteAPIRouter);

// http://localhost:3000/notification/api
app.use("/notification/api", notificationAPIRouter);
// http://localhost:3000/payments
app.use('/payments', paymentRoutes);

// http://localhost:3000/comment/api
app.use("/comment/api", commentAPIRouter);

// http://localhost:3000/tokenNotification/api
app.use("/tokenNotification/api", tokenAPIRouter);

// CPANEL
// http://localhost:3000/tour/cpanel
app.use("/tour/cpanel", tourCpanelRouter);

// http://localhost:3000/user/cpanel
app.use("/user/cpanel", userCpanelRouter);

// http://localhost:3000/user/cpanel
app.use("/hotel/cpanel", hotelCpanelRouter);

// http://localhost:3000/home-page/cpanel
app.use("/home-page/cpanel", homePageCpanelRouter);

// http://localhost:3000/destination/cpanel
app.use("/destination/cpanel", destinationCpanelRouter);
// http://localhost:3000/tourguide/cpanel
app.use("/tourguide/cpanel", tourGuideCpanelRouter)
//
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
