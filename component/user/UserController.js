const UserService = require('./UserService');

const login = async (email, password) => {
    try {
        return await UserService.login(email, password);
    } catch (error) {
        return false;
    }
}
const register = async ( name, address, avatar, phoneNumber, email, gender, dob,  role,createAt) => {
    try {
        return await UserService.register( name, address, avatar, phoneNumber, email, gender, dob, role,createAt);

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
const deleteById = async (id) => {
    try {
        return await UserService.deleteById(id);

    } catch (error) {
        return false;
    }
}
const updateUser = async (email, phoneNumber, name, address, gender, dob, avatar, role, isBan) => {
    try {
        return await UserService.updateUser(email, phoneNumber, name, address, gender, dob, avatar, role, isBan);

    } catch (error) {
        return false;
    }
}

const updateIsBan = async (email, isBan) => {
    try {
        return await UserService.updateIsBan(email, isBan);

    } catch (error) {
        return false;
    }
}

const banUserById = async (id) => {
    try {
        return await UserService.banUserById(id);

    } catch (error) {
        return false;
    }
}

const updateRole = async (email, role) => {
    try {
        return await UserService.updateRole(email, role);

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

const changePassword = async (currentPassword, newPassword, email) => {
    try{
        return await UserService.changePassword(currentPassword, newPassword, email);
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

const searchUsers = async (keyword) => {
    try{
        return await UserService.searchUsers(keyword);
    } catch (error) {
        return false
    }
}

const searchAdmins = async (keyword) => {
    try{
        return await UserService.searchAdmins(keyword);
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

const getAllAdmin = async (page, size) => {
    try {
        return await UserService.getAllAdmin(page, size);
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
    updateUser, getAllUser, updatePassword, findUserByEmail, verifyAccount,
    getAllAdmin, deleteById, searchUsers, searchAdmins, changePassword,
    updateIsBan, updateRole, banUserById
};