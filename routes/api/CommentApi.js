var express = require("express");
var router = express.Router();
const commentController = require("../../component/comment/CommentController")

//http://localhost:3000/comment/api/add-comment
router.post("/add-comment", async (req, res, next) => {
    try {
      const timeStamp = new Date().toLocaleString();
      const {
        content, image, rating,  user_id, tour_id
      } = req.body;
  
      const comment = await commentController.addComment(
        content, image, rating, timeStamp, user_id, tour_id
      );
      if (comment) {
        return res
          .status(200)
          .json({ result: true, comment: comment, message: "Success" });
      }
      return res
        .status(200)
        .json({ result: false, comment: null, message: "Fail" });
    } catch (error) {
      return res.status(500).json({ result: false, user: null });
    }
  });

//http://localhost:3000/comment/api/listComment?tour_id=
router.get("/listComment", async (req, res, next) => {
    try {
    const {tour_id} = req.query
      const comments = await commentController.getAllCommentOfTour(tour_id);
      const numberOfComments = comments.length;
      const ratings = comments.map(comment => comment.rating);

      // Tính trung bình các giá trị rating (nếu cần)
      const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
      return res.status(200).json({ result: true, comments: comments, quantity: numberOfComments, averageRating: averageRating });
    } catch (error) {
      console.log("listComment:" + error);
    }
  });

//http://localhost:3000/comment/api/topListComment?tour_id=
router.get("/topListComment", async (req, res, next) => {
  try {
  const {tour_id} = req.query
    const comments = await commentController.getTopCommentOfTour(tour_id);
    const numberOfComments = comments.length;
    const ratings = comments.map(comment => comment.rating);

    // Tính trung bình các giá trị rating (nếu cần)
    const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
    return res.status(200).json({ result: true, comments: comments, quantity: numberOfComments, averageRating: averageRating });
  } catch (error) {
    console.log("listComment:" + error);
  }
});

module.exports = router;