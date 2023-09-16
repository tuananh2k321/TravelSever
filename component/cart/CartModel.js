const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cart = new Schema({
  id: { type: ObjectId },
  name: { type: String, required: true },
  user_id: { type: ObjectId, ref: "user" },
});

module.exports = mongoose.models.cart || mongoose.model("cart", cart);
