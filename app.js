var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// API
var indexRouter = require("./routes/api/Index");
var productAPIRouter = require("./routes/api/ProductApi");
var userAPIRouter = require("./routes/api/UserApi");

// CPANEL
var productCpanelRouter = require("./cpanel/ProductCpanel");
var userCpanelRouter = require("./cpanel/UserCpanel");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
// http://localhost:3000/product/api
app.use("/product/api", productAPIRouter);

// http://localhost:3000/user/api
app.use("/user/api", userAPIRouter);

// CPANEL
// http://localhost:3000/product/cpanel
app.use("/product/cpanel", productCpanelRouter);

// http://localhost:3000/user/cpanel
app.use("/user/cpanel", userCpanelRouter);

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
