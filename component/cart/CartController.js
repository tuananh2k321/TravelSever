const cartService = require("./CartService");

const getListCart = async () => {
  try {
    return await cartService.getListCart();
  } catch (error) {
    throw error;
  }
};

const addCart = async (name, number, cvv) => {
  try {
    return await cartService.addCart(name, number, cvv);
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
