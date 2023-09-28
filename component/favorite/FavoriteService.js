const favoriteModel = require("./FavoriteModel");

const getListFavorite = async () => {
  try {
    return await favoriteModel.find();
  } catch (error) {
    console.log("gert list err: ", error);
  }
  return [];
};

const addFavorite = async (timestamp, user_id, tour_id, hotel_id) => {
  try {
    const newFavorite = {
      timestamp,
      user_id,
      tour_id,
      hotel_id,
    };
    await favoriteModel.create(newFavorite);
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
