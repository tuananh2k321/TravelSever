const UserModel = require('./UserModel')
const bcrypt = require('bcryptjs')
const accountSid = "AC8e6d6d91ef6f9d54fbefa4e641512eeb";
const authToken = "0d5a88edb0a6ab255900de8522eccd2e";
const verifySid = "VAa426a315b4b5f6b338bfc2fb20065568";
const client = require("twilio")(accountSid, authToken);

//http://localhost:3000/api/user/login
const login = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            const result = bcrypt.compareSync(password, user.password);
            return result ? user : false;
        }
    } catch (error) {
        console.log('Login error' + error)
        return false;
    }
}
//http://localhost:3000/api/user/register
const register = async (phoneNumber, password, name, lastName, email, address, gender, dob, avatar, role, createAt) => {
    try {
        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
        if (user) {
            return false;
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = { phoneNumber, password: hash, lastName, name, email, address, gender, dob, avatar, role, createAt };
            const u = new UserModel(newUser);
            await u.save();
            return true;
        }
    } catch (error) {
        console.log("Register error" + error)
        return false;
    }
}
const deleteByPhoneNumber = async (phoneNumber) => {
    try {
        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
        console.log(user)
        {
            await UserModel.deleteOne(user)
        }
        return true;
    } catch (error) {
        console.log("Delete User  error" + error);
        return false;

    }
}

const updateUser = async (phoneNumber, password, name, email, address, gender, dob, avatar, role) => {
    try {
        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
        if (user) {
            user.name = name ? name : user.name;
            user.phoneNumber = phoneNumber ? phoneNumber : user.phoneNumber;
            user.password = password ? password : user.password;
            user.email = email ? email : user.email;
            user.address = address ? address : user.address;
            user.gender = gender ? gender : user.gender;
            user.dob = dob ? dob : user.dob;
            user.avatar = avatar ? avatar : user.avatar;
            user.role = role ? role : user.role;
            await user.save();
            console.log("USER:" + user);

            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error" + error)
        return false;
    }
}
const search = async (phoneNumber) => {
    try {
        console.log("phoneNumber",phoneNumber)
        return await UserModel.findOne(
            { phoneNumber: phoneNumber }
        )

    } catch (error) {
        return false;
    }
}
const getAllUser = async (page, size) => {
    try {
        // return data;
        return await UserModel.find();
        //  data.splice(index, 1);
    } catch (error) {
        console.log("List user Got an error: " + error);
        throw error;
    }
}

module.exports = {
    login, register, deleteByPhoneNumber,
    updateUser, getAllUser, search,
};
