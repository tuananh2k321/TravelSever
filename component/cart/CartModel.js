const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const card = new Schema({
  id: { type: ObjectId },
  name: { type: String, required: true },
  number: { type: Number, required: true },
  cvv: { type: Number, required: true },
});

module.exports = mongoose.models.card || mongoose.model("card", card);
