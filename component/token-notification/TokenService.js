const tokenModel = require("./tokenModel");

const getToken = async () => {
  try {
    const listToken = await tokenModel.find({ });
    if (listToken) {
      return listToken;
    } else {
      console.log("Nothing to return");
    }
  } catch (error) {
    console.log("gert list err: ", error);
  }
  return [];
};

const getTokenByUserId = async (userId) => {
  try {
    const token = await tokenModel.find({ userId: userId });
    if (token) {
      return token;
    } else {
      console.log("Nothing to return");
    }
  } catch (error) {
    console.log("gert list err: ", error);
  }
  return [];
};


const addToken= async (token, userId) => {
  try {
    const checkToken = await tokenModel.findOne({ token: token })
    if (checkToken) {
        console.log("token exists")
    } else {
        const newToken = {token, userId};
        const u = new tokenModel(newToken);
        await u.save();
        return u;
    }
  } catch (error) {
    console.log("addToken err: ", error);
  }
  return false;
};


module.exports = { getToken, addToken, getTokenByUserId};
