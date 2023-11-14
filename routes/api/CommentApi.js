var express = require("express");
var router = express.Router();
const commentController = require("../../component/comment/CommentController")

//http://localhost:3000/comment/api/add-comment
router.post("/add-comment", async (req, res, next) => {
    try {
      const {
        content, image, user_id, tour_id
      } = req.body;
  
      const comment = await commentController.addComment(
        content, image, user_id, tour_id
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
      return res.status(200).json({ result: true, comments: comments });
    } catch (error) {
      console.log("listComment:" + error);
    }
  });

module.exports = router;