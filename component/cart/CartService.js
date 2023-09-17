const cartModel = require("./CartModel");

const getListCart = async () => {
  try {
    return await cartModel.find();
  } catch (error) {
    console.log("gert list err: ", error);
  }
  return [];
};

const addCart = async (name, user_id) => {
  try {
    const newCart = { name, user_id };
    await cartModel.create(newCart);
    return true;
  } catch (error) {
    console.log("addCart error" + error);
    return false;
  }
};

const deleteCart = async (id) => {
  try {
    await cartModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log("delete favorite by id err: ", error);
  }
  return false;
};

module.exports = { getListCart, addCart, deleteCart };
