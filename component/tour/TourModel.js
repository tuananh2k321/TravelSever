const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tourSchema = new Schema({
  id: { type: ObjectId },
  tourName: { type: String },
  adultPrice: { type: Number },
  childrenPrice: { type: Number},
  tourImage: { type: Array },
  departmentPlace: { type: String },
  departmentDate: { type: String },
  limitedDay: { type: String },
  operatingDay: { type: String },
  vehicle: { type: String },
  description: { type: String},
  rating: { type: Number },
  isState:{type: Boolean},
  // comment: [
  //   {
  //     content: { type: String },
  //     image:{ type: String },
  //     timestamp: { type: String },
  //     user_id: { type: ObjectId},
  //   },
  // ],
  hotel_id: { type: ObjectId, ref: "hotel" },
  destination_id: { type: Array, ref: "destination" },
 // tourGuide_id: { type: ObjectId, ref: "hotel" },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.models.tour || mongoose.model("tour", tourSchema);
//trong đây là số ít bên mông là số nhiều
