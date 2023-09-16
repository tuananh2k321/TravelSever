const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cart = new Schema({
  id: { type: ObjectId },
  name: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  user_id: { type: ObjectId, ref: "user" },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.models.cart || mongoose.model("cart", cart);
