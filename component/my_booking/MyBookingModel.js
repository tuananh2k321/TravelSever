const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const myBookingSchema = new Schema({
  id: { type: ObjectId },
  timestamp: { type: String, required: true},
  user_id: { type: ObjectId, ref: "user" },
  tour_id: { type: ObjectId, ref: "tour" },
});

module.exports = mongoose.models.mybooking || mongoose.model("mybooking", myBookingSchema);
//trong đây là số ít bên mông là số nhiều
