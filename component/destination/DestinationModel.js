const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const destinationSchema = new Schema({
  id: { type: ObjectId },
  destinationName: { type: String, required: true },
  description: { type: String, required: true },
  mainImage: { type: Array, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.models.destination || mongoose.model("destination", destinationSchema);
//trong đây là số ít bên mông là số nhiều
