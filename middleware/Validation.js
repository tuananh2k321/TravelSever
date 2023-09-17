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


module.exports = {checkLogin}