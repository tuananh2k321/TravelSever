const cartService = require("./CartService");

const getListCart = async (userID) => {
  try {
    return await cartService.getListCart(userID);
  } catch (error) {
    throw error;
  }
};

const addCart = async (name, number, cvv, user_id) => {
  try {
    return await cartService.addCart(name, number, cvv, user_id);
  } catch (error) {
    return false;
  }
};

const deleteCartbyID = async (id) => {
  try {
    return await cartService.deleteCart(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getListCart,
  addCart,
  deleteCartbyID,
};
