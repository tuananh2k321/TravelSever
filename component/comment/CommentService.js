const commentModel = require('./CommentModel');
const userModel = require('../user/UserModel');
const addComment = async (content, image, rating, user_id, tour_id) => {
    try {
            const comment = {content, image, rating, user_id, tour_id };
            const u = new commentModel(comment);
            await u.save();
            return u;
        
    } catch (error) {
        console.log("add fail" + error)
        return false;
    }
}

const getAllCommentOfTour = async (tour_id) => {
    try {
        const listComment = await commentModel.find({ tour_id: tour_id });
        console.log(listComment)
        const sortListComment = listComment.sort((a, b) => b.rating - a.rating);
        if (sortListComment) {
            const commentsWithUsers = await Promise.all(listComment.map(async (comment) => {
                // Lấy user_id từ mỗi bình luận
                const userId = comment.user_id;
  
                // Tìm người dùng tương ứng với user_id
                const user = await userModel.findOne({ _id: userId });
  
                // Nếu tìm thấy người dùng, thêm thông tin người dùng vào bình luận
                if (user) {
                    comment.user_id = user;
                }
  
                return comment;
            }));
  
            return commentsWithUsers;
        } else {
            console.log("Nothing to return");
        }
    } catch (error) {
        console.log("get list err: ", error);
    }
  }

  const getTopCommentOfTour = async (tour_id) => {
    try {
      const listComment = await commentModel.find({ tour_id: tour_id });
  
      if (listComment && listComment.length > 0) {
        // Sắp xếp danh sách bình luận theo rating giảm dần
        listComment.sort((a, b) => b.rating - a.rating);
  
        // Lấy user_id từ bình luận có rating cao nhất
        const userId = listComment[0].user_id;
  
        // Tìm người dùng tương ứng với user_id
        const user = await userModel.findOne({ _id: userId });
  
        // Nếu tìm thấy người dùng, thêm thông tin người dùng vào bình luận
        if (user) {
          listComment[0].user_id = user;
        }
  
        return [listComment[0]]; // Trả về chỉ bình luận có rating cao nhất
      } else {
        console.log("No comments available");
        return [];
      }
    } catch (error) {
      console.log("Error getting comments: ", error);
      return [];
    }
  };

module.exports = {
    addComment, getAllCommentOfTour, getTopCommentOfTour
};