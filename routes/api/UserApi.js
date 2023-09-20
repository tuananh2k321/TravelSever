var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../../component/user/UserController')
const nodemailer = require('nodemailer');

const accountSid = "AC8e6d6d91ef6f9d54fbefa4e641512eeb";
const authToken = "725564a0a92f0bd20ac32260d2f5575b";
const verifySid = "VAa426a315b4b5f6b338bfc2fb20065568";
const client = require("twilio")(accountSid, authToken);



//http://localhost:3000/user/api/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await userController.login(email, password);
        if (user) {
            const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' })
            return res.status(200).json({ result: true, user: user, token: token, message: "Login Success" });

        } else {
            return res.status(400).json({ result: false, user: null, token: null, message: "Login Failed" });
        }
    } catch (error) {
        console.log(error);
        // next(error); for web
        //api 200
        //error can control 400
        //error can't controll system 500
        return res.status(500)
            .json({ result: false, message: 'Error System' })
    }
})
//http://localhost:3000/user/api/register
router.post('/register',  async (req, res, next) => {
    try {
        const { phoneNumber, password, name, lastName, email, address, gender, dob, avatar, role, createAt } = req.body;


        const user = await userController.register(phoneNumber, password, name, lastName, email, address, gender, dob, avatar, role, createAt);
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Register Success" });
        }
        return res.status(400).json({ result: false, user: null, message: "Register Failed" });


        // let result =await textflow.verifyCode(phoneNumber, code)
        // if (!result.valid) {
        //     return res.status(400).json({ result: false, user: null, message: "Register Failed" });
        // }else{
        //     const user = await userController.register(phoneNumber, password, name);
        //     if (user) {
        //         return res.status(200).json({ result: true, user: user, message: "Register Success" });
        //     }
        //     return res.status(400).json({ result: false, user: null, message: "Register Failed" });
        // }

    } catch (error) {
        return res.status(500).json({ result: false, user: null })
    }
})

//http://localhost:3000/user/api/otp
// Xử lý request POST để lấy mã OTP
router.post('/otp', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
  
    // Gửi mã OTP đến số điện thoại
    await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phoneNumber, channel: "sms" })
      .then((verification) => {
        res.json({ message: "OTP sent successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
});
  
//http://localhost:3000/user/api/otp/verify
// Xử lý request POST để kiểm tra mã OTP
router.post("/otp/verify", async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const otpCode = req.body.otpCode;

    // Kiểm tra mã OTP
    await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: phoneNumber, code: otpCode })
        .then((verificationCheck) => {
        if (verificationCheck.status === "approved") {
            res.json({ message: "OTP verification successful" });
        } else {
            res.status(400).json({ error: "Invalid OTP" });
        }
        })
        .catch((error) => {
        res.status(500).json({ error: error.message });
        });
});

//http://localhost:3000/user/api/update
router.post('/update', async (req, res, next) => {
    try {
        const { email, name, phoneNumber, address, gender, dob, avatar, role } = req.body;
        console.log(email, name, address, gender, dob, avatar, role, phoneNumber,);
        const user = await userController.updateUser(email, phoneNumber, name, address, gender, dob, avatar, role,);
        console.log(user)
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Update Success" });
        } else {
            return res.status(400).json({ result: false, user: null, message: "User not exist" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ result: false, user: null });
    }
});

//http://localhost:3000/user/api/updatePassword
router.post('/updatePassword', async (req, res) => {
    try {
        const email = req.query.email.toString();
        const password = req.body.password.toString()
        const user = await userController.updatePassword(password, email)
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Update Success" });
        } else {
            return res.status(400).json({ result: false, user: null, message: "change password fail" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ result: false});
    }
})

//http://localhost:3000/user/api/verifyAccount
router.get('/verifyAccount', async (req, res) => {
    try {
        const email = req.query.email.toString()
        const user = await userController.verifyAccount(email)
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "verify Success" });
        } else {
            return res.status(400).json({ result: false, user: null, message: "verify fail" });
        }
    }catch (error){
        console.log(error);
        return res.status(500).json({ result: false});
    }
})

//http://localhost:3000/user/api/list
router.get('/list', async (req, res, next) => {
    try {
        const users = await userController.getAllUser();
        console.log(users)
        return res.status(200).json({ result: true, users: users });
    } catch (error) {
        console.log("List User:" + error)
        return res.status(500).json({ result: false, massage: "Can't get list user" })
    }
})

//http://localhost:3000/user/api/listAdmin
router.get('/listAdmin', async (req, res, next) => {
    try {
        const users = await userController.getAllAdmin();
        console.log(users)
        return res.status(200).json({ result: true, users: users });
    } catch (error) {
        console.log("List User:" + error)
        return res.status(500).json({ result: false, massage: "Can't get list user" })
    }
})


//http://localhost:3000/user/api/send-mail
router.post('/send-mail', async (req, res, next) => {
    const email = req.body.email
    //const isUser = await userController.findUserByEmail(email)
    if (email) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'haizzj123@gmail.com',
                pass: 'xakpztqusyejqykx'
            }
        });

        // URL của API xác thực
        const authenticationUrl = 'https://example.com/authenticate';

        // Tạo một đường link trong email với href trỏ đến API xác thực
        const emailHtml = `
            <p>Nhấn vào xác thực để xác thực email:</p>
            <a href="${authenticationUrl}">xác thực</a>
        `;
        
        const mailOptions = {
            from: 'haizzj123@gmail.com',
            to: email,
            subject: 'XÁC THỰC EMAIL',
            html: emailHtml
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(200).json({result:true,message:"send fail"})
            } else {
                res.status(200).json({result:true,message:"send success"})
            }
        });
    } else {
        res.status(400).json({result:false,message:"email is not exist!"})
    }
    
})


//http://localhost:3000/user/api/delete
router.delete('/delete',async (req,res,next)=>{
    try{

        const {phoneNumber} = req.query;
        const user = await userController.deleteByPhoneNumber(phoneNumber);
        if(user){
            res.status(200).json({result:true,message:"Delete Success"})
        }else{
            res.status(400).json({result:false,massage:"Delete Failed"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({result:false,massage:"Error System"})
    }
})


module.exports = router;