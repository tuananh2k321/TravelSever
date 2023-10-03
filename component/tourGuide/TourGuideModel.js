const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
  id: { type: ObjectId },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: "" },
  workPlaces: { type: String, required: true },
});

module.exports = mongoose.models.tourguide || mongoose.model("tourguide", schema);
//trong đây là số ít bên mông là số nhiều
// tourGuide ---------> tourGuides
