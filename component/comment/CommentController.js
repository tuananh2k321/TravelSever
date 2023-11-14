const commentService = require('./CommentService')

const addComment = async ( content, image, user_id, tour_id) => {
    try {
        return await commentService.addComment(  content, image, user_id, tour_id);

    } catch (error) {
        return false;
    }
}

const getAllCommentOfTour = async ( tour_id) => {
    try {
        return await commentService.getAllCommentOfTour( tour_id);

    } catch (error) {
        return false;
    }
}

module.exports = {
    addComment, getAllCommentOfTour
};