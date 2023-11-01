const favoriteService = require('./FavoriteService');

const getListFavorite = async (id_user) => {
    try {
        return await favoriteService.getListFavorite(id_user);
    } catch (error) {
        throw error;
    }
}

const addFavorite = async (timestamp, user_id, tour_id) => {
    try {
        await favoriteService.addFavorite(timestamp, user_id, tour_id);
    } catch (error) {
        throw error;
    }
}

const deleteFavoritebyid = async (id) => {
    try {
        return await favoriteService.deleteFavorite(id);
    } catch (error) {
        throw error;
    }

}


module.exports = { getListFavorite, addFavorite, deleteFavoritebyid };
