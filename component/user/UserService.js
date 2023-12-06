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
        console.log('user: ', user)
        
    } catch (error) {
        console.log('Login error' + error)
        return false;
    }
}

//http://localhost:3000/api/user/login
const loginFB = async (email, name) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            console.log('user: ', user)
            return user;
        } else {
            const newUser = {email, name};
            const u = new UserModel(newUser);
            await u.save();
            return u;
        }
        
        
    } catch (error) {
        console.log('Login error' + error)
        return false;
    }
}

//http://localhost:3000/api/user/register
const register = async (phoneNumber, password, name, lastName, email, address, gender, dob, avatar, role, createAt) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            return false;
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = { phoneNumber, password: hash, lastName, name, email, address, gender, dob, avatar, role, createAt };
            const u = new UserModel(newUser);
            await u.save();
            return u;
        }
    } catch (error) {
        console.log("Register error" + error)
        return false;
    }
}
const deleteByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email })
        console.log(user)
        if (user) {
            await UserModel.deleteOne(user)
            return true;
        } else {
            return false; 
        }
    } catch (error) {
        console.log("Delete User  error" + error);
        return false;

    }
}

const deleteById = async (id) => {
    try {
        const user = await UserModel.findOne({ _id: id })
        console.log(user)
        if (user) {
            await UserModel.deleteOne(user)
            return true;
        } else {
            return false; 
        }
        return true;
    } catch (error) {
        console.log("Delete User  error" + error);
        return false;

    }
}

const updateUser = async (email, name, address, avatar, phoneNumber, dob, lastName) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            user.name = name ? name : user.name;
            user.phoneNumber = phoneNumber ? phoneNumber : user.phoneNumber;
            user.address = address ? address : user.address;
            user.dob = dob ? dob : user.dob;
            user.avatar = avatar ? avatar : user.avatar;
            user.lastName = lastName ? lastName : user.lastName;
            await user.save();
            console.log("USER:" + user);

            return user;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error" + error)
        return false;
    }
}

const updateIsBan = async (email, isBan) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            user.isBan = isBan ? isBan : user.isBan;
            await user.save();
            console.log("USER:" + user);
            return user;
        } else {
            return false;
        }
    } catch (error) {
        console.log("updateIsBan error" + error)
    }
}

const banUserById = async (id) => {
    try {
        const user = await UserModel.findOne({ _id: id })
        console.log(user)
        if (user) {
            user.isBan = true;
            await user.save();
            console.log("USER:" + user);
            return true;
        } else {
            return false; 
        }
        
    } catch (error) {
        console.log("Delete User  error" + error);
        return false;

    }
}

const updateRole = async (email, role) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            user.role = role ? role : user.role;
            await user.save();
            console.log("USER:" + user);
            return user;
        } else {
            return false;
        }
    } catch (error) {
        console.log("updateIsBan error" + error)
    }
}

const updatePasswordByEmail = async (password, email) => {
    try {
        const user = await UserModel.findOne({ email: email })
        const salt = bcrypt.genSaltSync(10);
        if (user) {
            const hash = bcrypt.hashSync(password, salt);
            user.password = hash ? hash : user.password;
            await user.save();
            console.log("USER:" + user);
            return user;
        } else {
            return false;
        }
        
    } catch (error) {
        console.log("Update User  error" + error)
        return false;
    }
}

const updatePasswordByPhone = async (password, phoneNumber) => {
    try {
        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
        const salt = bcrypt.genSaltSync(10);
        if (user) {
            const hash = bcrypt.hashSync(password, salt);
            user.password = hash ? hash : user.password;
            await user.save();
            console.log("USER:" + user);
            return user;
        } else {
            return false;
        }
        
    } catch (error) {
        console.log("Update User  error" + error)
        return false;
    }
}

const changePassword = async (currentPassword, newPassword, email) => {
    try {
        const user = await UserModel.findOne({ email: email })
        const salt = bcrypt.genSaltSync(10);
        const result = bcrypt.compareSync(currentPassword, user.password);
        if (user && result) {
            const hash = bcrypt.hashSync(newPassword, salt);
            user.password = hash ? hash : user.password;
            await user.save();
            console.log("USER:" + user);
            return user;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error" + error)
        return false;
    }
}

const verifyAccount = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            user.isVerify = true;
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

const findUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email: email })
    if (user) {
        return user;
    } else {
        return false;
    }
}

const searchAdmins = async (keyword) => {
    try {
        let query = {
            name: { $regex: `.*${keyword}.*`, $options: 'i'},
          }
        let users = await UserModel.find(query)
        console.log("users: ",users)
        const userArray = (await users).map((user) => user.toObject());
        const userWithRole1 = []
        userArray.forEach((user) => {
            if (user.role === 2) {
                userWithRole1.push(user)
            }
        });
        return userWithRole1
    } catch (error) {
      console.log('Search error: ', error);
      throw error;
    }
  };

  const searchUsers = async (keyword) => {
    try {
        let query = {
            name: { $regex: `.*${keyword}.*`, $options: 'i'},
          }
        let users = await UserModel.find(query)
        console.log("users: ",users)
        const userArray = (await users).map((user) => user.toObject());
        const userWithRole1 = []
        userArray.forEach((user) => {
            if (user.role === 1) {
                userWithRole1.push(user)
            }
        });
        return userWithRole1
    } catch (error) {
      console.log('Search error: ', error);
      throw error;
    }
  };

const getAllUser = async (page, size) => {
    try {
        // return data;
        const users = UserModel.find()
        const userArray = (await users).map((user) => user.toObject());
        const userWithRole1 = []
        userArray.forEach((user) => {
            if (user.role === 1) {
                userWithRole1.push(user)
            }
        });
        return userWithRole1
        //  data.splice(index, 1);
    } catch (error) {
        console.log("List user Got an error: " + error);
        throw error;
    }
}

const getAllEmailUser = async (page, size) => {
    try {
        // return data;
        const users = UserModel.find()
        const userArray = (await users).map((user) => user.toObject());
        const userWithRole1 = []
        const listIdUsers = []
        userArray.forEach((user) => {
            if (user.role === 1) {
                userWithRole1.push(user)
                listIdUsers.push(user.email)
            }
        });
        console.log("listIdUsers: "+listIdUsers)
        return listIdUsers
        //  data.splice(index, 1);
    } catch (error) {
        console.log("List user Got an error: " + error);
        throw error;
    }
}

const getAllAdmin = async (page, size) => {
    try {
        // return data;
        const users = UserModel.find()
        const userArray = (await users).map((user) => user.toObject());
        const userWithRole1 = []
        userArray.forEach((user) => {
            if (user.role === 2) {
                userWithRole1.push(user)
            }
        });
        return userWithRole1
        //  data.splice(index, 1);
    } catch (error) {
        console.log("List user Got an error: " + error);
        throw error;
    }
}

module.exports = {
    login, register, deleteByEmail,
    updateUser, getAllUser, updatePasswordByEmail, updatePasswordByPhone,
    findUserByEmail, verifyAccount, getAllAdmin, deleteById, searchUsers,
    searchAdmins, changePassword, updateIsBan, banUserById, updateRole, loginFB,
    getAllEmailUser
};
