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
  departmentDate: { type: String }, // 23/12/2023
  departmentHour: { type: String }, // 14:00
  limitedDay: { type: String }, // 3 ngay 2 dem
  expectedDate: { type: String }, // 23/12/2023 + 3 ngay 2 dem = 26/12/2023
  operatingDay: { type: String },
  limitedPerson: { type: Number},
  availablePerson: { type: Number}, //availablePerson = limitedPerson
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
