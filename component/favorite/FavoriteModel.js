const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const favoriteSchema = new Schema({
  id: { type: ObjectId },
  timestamp: { type: String, required: true},
  user_id: { type: ObjectId, ref: "user" },
  tour_id: { type: ObjectId, ref: "tour" },
  hotel_id: {type: ObjectId, ref: 'hotel'}
});

module.exports = mongoose.models.favorite || mongoose.model("favorite", favoriteSchema);
//trong đây là số ít bên mông là số nhiều
