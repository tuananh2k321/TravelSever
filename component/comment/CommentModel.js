const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
  id: { type: ObjectId },
  content: { type: String },
  image: [{ type: String}],
  user_id: { type: ObjectId, ref: "user" },
  tour_id: { type: ObjectId, ref: "tour" },
});

module.exports = mongoose.models.comment || mongoose.model("comments", commentSchema);
//trong đây là số ít bên mông là số nhiều
