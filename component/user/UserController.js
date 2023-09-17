const UserService = require('./UserService');
const mailer = require('nodemailer')

const login = async (email, password) => {
    try {
        return await UserService.login(email, password);
    } catch (error) {
        return false;
    }
}
const register = async (phoneNumber, password, name, lastName, email, address, gender, dob, avatar, role,createAt) => {
    try {
        return await UserService.register(phoneNumber, password, lastName, name, email, address, gender, dob, avatar, role,createAt);

    } catch (error) {
        return false;
    }
}
const deleteByPhoneNumber = async (phoneNumber) => {
    try {
        return await UserService.deleteByPhoneNumber(phoneNumber);

    } catch (error) {
        return false;
    }
}
const updateUser = async (email, phoneNumber, name, address, gender, dob, avatar, role) => {
    try {
        return await UserService.updateUser(email, phoneNumber, name, address, gender, dob, avatar, role);

    } catch (error) {
        return false;
    }
}

const updatePassword = async (password, email) => {
    try{
        return await UserService.updatePassword(password, email);
    } catch (error) {
        return false
    }
}

const verifyAccount = async (email) => {
    try{
        return await UserService.verifyAccount(email);
    } catch (error) {
        return false
    }
}

const getAllUser = async (page, size) => {
    try {
        return await UserService.getAllUser(page, size);
    } catch (error) {
        throw error;
    }
}

const findUserByEmail = async (email) => {
    try{
        return await UserService.findUserByEmail(email);
    } catch (error) {
        return false
    }
}

module.exports = {
    login, register, deleteByPhoneNumber,
    updateUser, getAllUser, updatePassword, findUserByEmail, verifyAccount
};