var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../../component/user/UserController");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require('dotenv').config();
const accountSid = "AC8e6d6d91ef6f9d54fbefa4e641512eeb";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VAa426a315b4b5f6b338bfc2fb20065568";
const client = require("twilio")(accountSid, authToken);

//http://localhost:3000/user/api/login
router.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    console.log(email, password);
    const user = await userController.findUserByEmail(email);
    console.log(user);
    if (user) {
      if (user.isVerify) {
        if (user.isBan == false) {
          const userLogin = await userController.login(email, password);
          if (userLogin) {
            const token = jwt.sign({ user }, "secret", { expiresIn: "1h" });
            return res
              .status(200)
              .json({
                result: true,
                user: user,
                token: token,
                message: "Login Success",
              });
          } else {
            return res
              .status(200)
              .json({
                result: false,
                user: null,
                token: null,
                message: "Sai tài khoản hoặc mật khẩu",
              });
          }
        } else {
          return res
            .status(200)
            .json({
              result: false,
              user: null,
              token: null,
              message: "Tài khoản của bạn đã bị cấm",
            });
        }
      } else {
        return res
          .status(200)
          .json({
            result: false,
            user: null,
            token: null,
            message: "Email chưa được xác minh",
          });
      }
    } else {
      return res
        .status(200)
        .json({
          result: false,
          user: null,
          token: null,
          message: "Tài khoản không tồn tại",
        });
    }
  } catch (error) {
    console.log(error);
    // next(error); for web
    //api 200
    //error can control 400
    //error can't controll system 500
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/user/api/loginFB
router.post("/loginFB", async (req, res, next) => {
  try {
    const { email, name } = req.body;
    console.log(email, name);
    const user = await userController.loginFB(email, name);
    console.log(user);
    if (user) {
      if (user.isBan == false) {
        const token = jwt.sign({ user }, "secret", { expiresIn: "1h" });
        return res
          .status(200)
          .json({
            result: true,
            user: user,
            token: token,
            message: "Login Success",
          });
      } else {
        return res
          .status(200)
          .json({
            result: false,
            user: null,
            token: null,
            message: "Tài khoản của bạn đã bị cấm",
          });
      }
    } else {
      return res
        .status(200)
        .json({
          result: false,
          user: null,
          token: null,
          message: "Tài khoản không tồn tại",
        });
    }
  } catch (error) {
    console.log(error);
    // next(error); for web
    //api 200
    //error can control 400
    //error can't controll system 500
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/user/api/register
router.post("/register", async (req, res, next) => {
  try {
    const {
      phoneNumber,
      password,
      name,
      lastName,
      email,
      address,
      gender,
      dob,
      avatar,
      role,
      createAt,
    } = req.body;

    const user = await userController.register(
      phoneNumber,
      password,
      name,
      lastName,
      email,
      address,
      gender,
      dob,
      avatar,
      role,
      createAt
    );
    if (user) {
      return res
        .status(200)
        .json({ result: true, user: user, message: "Register Success" });
    }
    return res
      .status(200)
      .json({ result: false, user: null, message: "Email is exits" });
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});

//http://localhost:3000/user/api/otp
// Xử lý request POST để lấy mã OTP
router.post("/otp", async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  // Gửi mã OTP đến số điện thoại
  await client.verify.v2
    .services(verifySid)
    .verifications.create({ to: "+84" + phoneNumber, channel: "sms" })
    .then((verification) => {
      res.json({
        result: true,
        phoneNumber: phoneNumber,
        message: "OTP sent successfully",
      });
    })
    .catch((error) => {
      res
        .status(200)
        .json({
          result: false,
          error: error.message,
          message: "Đã xảy ra lỗi!",
        });
    });
});

//http://localhost:3000/user/api/otp/verify?phoneNumber=
// Xử lý request POST để kiểm tra mã OTP
router.post("/otp/verify", async (req, res) => {
  const phoneNumber = req.query.phoneNumber;
  const otpCode = req.body.otpCode;

  // Kiểm tra mã OTP
  await client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to: "+84" + phoneNumber, code: otpCode })
    .then((verificationCheck) => {
      if (verificationCheck.status === "approved") {
        res
          .status(200)
          .json({ result: true, message: "OTP verification successful" });
      } else {
        res.status(200).json({ result: false, message: "OTP không đúng!" });
      }
    })
    .catch((error) => {
      res
        .status(200)
        .json({
          result: false,
          error: error.message,
          message: "Đã xảy ra lỗi!",
        });
    });
});

//http://localhost:3000/user/api/update
router.post("/update", async (req, res, next) => {
  try {
    const { email } = req.query;
    const { name, lastName, address, avatar, phoneNumber, dob } = req.body;
    console.log(email, name, address, dob, avatar, phoneNumber, lastName);
    const user = await userController.updateUser(
      email,
      name,
      address,
      avatar,
      phoneNumber,
      dob,
      lastName
    );
    console.log(user);
    if (user) {
      return res
        .status(200)
        .json({ result: true, user: user, message: "Update Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, user: null, message: "User not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, user: null });
  }
});

//http://localhost:3000/user/api/updateIsBan
router.post("/updateIsBan", async (req, res, next) => {
  try {
    const { email, isBan } = req.body;
    console.log(email, isBan);
    const user = await userController.updateIsBan(email, isBan);
    console.log(user);
    if (user) {
      return res
        .status(200)
        .json({ result: true, user: user, message: "Update Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, user: null, message: "User not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, user: null });
  }
});

//http://localhost:3000/user/api/updateRole
router.post("/updateRole", async (req, res, next) => {
  try {
    const { email, role } = req.body;
    console.log(email, role);
    const user = await userController.updateRole(email, role);
    console.log(user);
    if (user) {
      return res
        .status(200)
        .json({ result: true, user: user, message: "Update Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, user: null, message: "User not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, user: null });
  }
});

//http://localhost:3000/user/api/updatePasswordByEmail
router.post("/updatePasswordByEmail", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userController.updatePasswordByEmail(password, email);
    if (user) {
      return res
        .status(200)
        .json({ result: true, user: user, message: "Thay đổi thành công" });
    } else {
      return res
        .status(200)
        .json({ result: false, user: null, message: "Thay đổi thất bại" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});

//http://localhost:3000/user/api/verifyAccount
router.get("/verifyAccount", async (req, res) => {
  try {
    const email = req.query.email.toString();
    const user = await userController.verifyAccount(email);
    if (user) {
      res.render("user/success");
    } else {
      return res
        .status(400)
        .json({ result: false, user: null, message: "verify fail" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});

//http://localhost:3000/user/api/list
router.get("/list", async (req, res, next) => {
  try {
    const users = await userController.getAllUser();
    console.log(users);
    return res.status(200).json({ result: true, users: users });
  } catch (error) {
    console.log("List User:" + error);
    return res
      .status(500)
      .json({ result: false, massage: "Can't get list user" });
  }
});

//http://localhost:3000/user/api/listAdmin
router.get("/listAdmin", async (req, res, next) => {
  try {
    const users = await userController.getAllAdmin();
    console.log(users);
    return res.status(200).json({ result: true, users: users });
  } catch (error) {
    console.log("List User:" + error);
    return res
      .status(500)
      .json({ result: false, massage: "Can't get list user" });
  }
});

//http://localhost:3000/user/api/send-mail/email=?''
router.get("/send-mail", async (req, res, next) => {
  const email = req.query.email;
  //const isUser = await userController.findUserByEmail(email)
  if (email) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "haizzj123@gmail.com",
        pass: "xakpztqusyejqykx",
      },
    });

    // URL của API xác thực
    const authenticationUrl =
      "http://localhost:3000/user/api/verifyAccount?email=" + email;

    // Tạo một đường link trong email với href trỏ đến API xác thực
    const emailHtml = `
            <p>Nhấn vào xác thực để xác thực email:</p>
            <a href="${authenticationUrl}">xác thực</a>
        `;

    const mailOptions = {
      from: "haizzj123@gmail.com",
      to: email,
      subject: "XÁC THỰC EMAIL",
      html: emailHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(200).json({ result: true, message: "send fail" });
      } else {
        res.status(200).json({ result: true, message: "send success" });
      }
    });
  } else {
    res.status(400).json({ result: false, message: "email is not exist!" });
  }
});

//http://localhost:3000/user/api/send-mail-change-password?email=''
router.get("/send-mail-change-password", async (req, res, next) => {
  const email = req.query.email;
  //const isUser = await userController.findUserByEmail(email)
  if (email) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "haizzj123@gmail.com",
        pass: "xakpztqusyejqykx",
      },
    });

    // URL của API xác thực
    const authenticationUrl =
      "http://localhost:3000/user/cpanel/changePassword";

    // Tạo một đường link trong email với href trỏ đến API xác thực
    const emailHtml = `
            <p>Nhấn vào để vào trang đổi mật khẩu</p>
            <a href="${authenticationUrl}">tại đây</a>
        `;

    const mailOptions = {
      from: "haizzj123@gmail.com",
      to: email,
      subject: "Thay Đổi Mật Khẩu",
      html: emailHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(200).json({ result: true, message: "send fail" });
      } else {
        res.status(200).json({ result: true, message: "send success" });
      }
    });
  } else {
    res.status(400).json({ result: false, message: "email is not exist!" });
  }
});

//http://localhost:3000/user/api/delete
router.delete("/delete", async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await userController.deleteByEmail(email);
    if (user) {
      res.status(200).json({ result: true, message: "Delete Success" });
    } else {
      res.status(400).json({ result: false, massage: "Delete Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, massage: "Error System" });
  }
});

module.exports = router;
