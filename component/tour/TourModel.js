const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tourSchema = new Schema({
  id: { type: ObjectId },
  tourName: { type: String },
  adultPrice: { type: Number },
  childrenPrice: { type: Number},
  childrenAge: { type: String},
  adultAge: { type: String},
  tourImage: { type: Array },
  departmentPlace: { type: String },
  departmentDate: { type: String },
  limitedDay: { type: String },
  operatingDay: { type: String },
  limitedPerson: { type: Number},
  offer: { type: String },
  vehicle: { type: String },
  description: { type: String},
  rating: { type: String },
  isdomain: { type: String },
  isState:{type: Boolean},
  hotel_id: { type: ObjectId, ref: "hotel" },
  tourGuide_id: { type: ObjectId, ref: "tourguide" },
  destination_id: { type: Array, ref: "destination" },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.models.tour || mongoose.model("tour", tourSchema);
//trong đây là số ít bên mông là số nhiều
