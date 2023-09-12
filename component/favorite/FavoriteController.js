const favoriteService = require('./FavoriteService');

const getListFavorite = async () =>{
    try {
        return await favoriteService.getListFavorite();
    } catch (error) {
        throw error;
    }
}

const addFavorite = async (timestamp, user_id, tour_id, hotel_id) =>{
    try {
        await favoriteService.addFavorite(timestamp, user_id, tour_id, hotel_id);
    } catch (error) {
        throw error;
    }
}

const deleteFavoritebyid = async (id)=> {
    try {
        return await favoriteService.deleteFavorite(id);
    } catch (error) {
        throw error;
    }
    
}


module.exports = {getListFavorite, addFavorite, deleteFavoritebyid};
