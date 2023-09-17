const cartService = require("./CartService");

const getListCart = async () => {
  try {
    return await cartService.getListCart();
  } catch (error) {
    throw error;
  }
};

const addCart = async (name, user_id) => {
  try {
    return await cartService.addCart(name, user_id);
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
