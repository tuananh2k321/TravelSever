const favoriteModel = require("./FavoriteModel");
const userModel = require("../user/UserModel");

const getListFavorite = async (id_user) => {
  try {
    const listFavorite = await favoriteModel.find({ user_id: id_user });
    if (listFavorite) {
      return listFavorite
    } else {
      console.log("Nothing to return");
    }
  } catch (error) {
    console.log("gert list err: ", error);
  }
  return [];
};

const addFavorite = async (timestamp, user_id, tour_id) => {
  try {
    const newFavorite = {
      timestamp,
      user_id,
      tour_id,
    };
    await favoriteModel.create(newFavorite);
    console.log("new favorite", newFavorite);
    return true;
  } catch (error) {
    console.log("add favorite err", error);
  }
  return false;
};

const deleteFavorite = async (id) => {
  try {
    await favoriteModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log("delete favorite by id err: ", error);
  }
  return false;
};

module.exports = { getListFavorite, addFavorite, deleteFavorite };
