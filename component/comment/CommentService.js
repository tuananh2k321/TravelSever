const commentModel = require('./CommentModel');
const userModel = require('../user/UserModel');
const addComment = async (content, image, user_id, tour_id) => {
    try {
            const comment = {content, image, user_id, tour_id };
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
      if (listComment) {
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

module.exports = {
    addComment, getAllCommentOfTour
};