const {check, body} = require('express-validator');

const checkLogin = async (req, res, next) => { 
    try {
        const {email, password} = req.body
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!email || !password) {
            return res.status(400).json({result: false, message: 'Vui lòng nhập đầy đủ thông tin'}) 
        } else if (emailRegex.test(email)) {
            return res.status(400).json({result: false, message:'Email không hợp lệ'})
        } else {
            next();
        }
    } catch (error) {
        console.log('check register error: ',error);
        return res.status(400).json({result: false})
    }
}

const checkFormHotel = async (req, res, next) => {
    try {
        const {hotelName, description, rating, address, phoneNumber} = req.body;
        const phoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const checkHotelName = hotelName != "";
        const checkDescription = description != "";
        const checkRating = rating != "";
        const checkAddress = address != "";
        const checkPhoneNumber = checkDescription != "";

        if(!checkHotelName || !description || !checkRating || !checkAddress || !checkPhoneNumber){
            return res.status(400).json({result: false, message: 'Vui lòng nhập đầy đủ thông tin'});
        } else if (phoneRegex.test(phoneNumber) == false){
            return res.status(400).json({result: false, message:'Số điện thoại không hợp lệ'});
        }else if (rating < 0 || rating > 5){
            return res.status(400).json({result: false, message:'Rating từ 1 đến 5'});
        } else {
            next();
        }
    } catch (error) {
        console.log('Check form hotel error: ',error);
        return res.status(400).json({result: false})
    }
}

const validate = function(req, res, next) {
    try {
        const phoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const {body: {hotelName, description, image, rating, address, phoneNumber}} = req;
        const checkHotelName = hotelName != "" && hotelName.trim().length > 0;
        const checkDescription = description != "" && description.trim().length > 0;
        const checkImage = image != "" && image.trim().length > 0;
        const checkRating = rating != "" && rating.trim().length > 0 && (rating < 0 || rating > 5);
        const checkAddress = address != "" && address.trim().length > 0;
        const checkPhoneNumber = phoneNumber != "" && phoneNumber.trim().length > 0 && phoneRegex.test(phoneNumber);

        if(checkHotelName && checkDescription && checkPhoneNumber && checkAddress && checkImage && checkRating) {
            next();
        } else {
            console.log("=======> Validating form hotel error");
            res.status(400).json({error: true, message: "Validating form hotel false"});
        }
    } catch (error) {
        res.status(400).json({error: true, message: "Validate Failed"});
    }
};

module.exports = {checkLogin, checkFormHotel}