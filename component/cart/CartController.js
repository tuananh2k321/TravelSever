const cartService = require("./CartService");

const getListCart = async () => {
  try {
    return await cartService.listCart();
  } catch (error) {
    throw error;
  }
};

const addCart = async (name, totalPrice, content, user_id) => {
  try {
    return await cartService.addCart(name, totalPrice, content, user_id);
  } catch (error) {
    return false;
  }
};

const deleteCartbyID = async (id) => {
  try {
    return await cartService.deleteFavorite(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addCart,
  getListCart,
  deleteCartbyID,
};
